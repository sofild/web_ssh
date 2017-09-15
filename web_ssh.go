package main

import (
	"encoding/json"
	"fmt"
	log "github.com/Sirupsen/logrus"
	"golang.org/x/crypto/ssh"
	"io"
	"net/http"
	"text/template"
	//"time"
	"github.com/gorilla/websocket"
	//"bufio"
	"bytes"
	"strconv"
	"os"
	"path/filepath"
)

var (
	ssh_client *ssh.Client
	upgrader   = websocket.Upgrader{}
	mt         = &master{}
	accountFile = "account.conf"
)

type master struct {
	Host string `json:"host"`
	Port string `json:"port"`
	User string `json:"user"`
	Pass string `json:"pass"`
	Cols string `json:"-"`
	Rows string `json:"-"`
}

func main() {
	http.Handle("/favicon.ico", http.FileServer(http.Dir("static/dist")))
	http.Handle("/static/", http.FileServer(http.Dir("static/dist")))
	http.HandleFunc("/", handle)
	http.HandleFunc("/cmd", cmdHandle)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Error(err.Error())
	} else {
		log.Info("service start.")
	}
}

//处理请求
func handle(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	data := make(map[string]string)
	if _, ok := r.Form["action"]; ok {
		action := r.Form["action"][0]
		if action == "connect" {
			connect(w, r)
			return
		}
	}
	conf := getConf()
	data["Conf"] = conf
	html, err := template.ParseFiles("static/dist/index.html")
	if err != nil {
		log.Error(err.Error())
		return
	}
	html.Execute(w, data)
}

//连接
func connect(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	mt.Host = r.Form["host"][0]
	mt.Port = r.Form["port"][0]
	mt.User = r.Form["user"][0]
	mt.Pass = r.Form["pass"][0]
	mt.Cols = r.Form["cols"][0]
	mt.Rows = r.Form["rows"][0]
	isSave := r.Form["save"][0]
	if isSave == "1" {
		save()
	}
	config := &ssh.ClientConfig{
		User: mt.User,
		Auth: []ssh.AuthMethod{
			ssh.Password(mt.Pass),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}
	connstr := fmt.Sprintf("%s:%s", mt.Host, mt.Port)
	client, err := ssh.Dial("tcp", connstr, config)
	ret := make(map[string]string)
	if err != nil {
		log.Error(err.Error())
		ret["msg"] = "connect failed. error:" + err.Error()
		ret["err"] = "1"
		data, _ := json.Marshal(ret)
		io.WriteString(w, string(data))
		return
	}
	ssh_client = client
	ret["msg"] = "connect success."
	ret["err"] = "0"
	dats, _ := json.Marshal(ret)
	io.WriteString(w, string(dats))
	return
}

//命令行处理
func cmdHandle(w http.ResponseWriter, r *http.Request) {
	//处理终端
	ptyCols, errl := strconv.Atoi(mt.Cols)
	if errl != nil {
		log.Error("cols parse uint: " + errl.Error())
	}
	ptyRows, errw := strconv.Atoi(mt.Rows)
	if errw != nil {
		log.Error("rows parse uint: " + errw.Error())
	}
	session, err := ssh_client.NewSession()
	if err != nil {
		log.Error("new session: " + err.Error())
		return
	}
	defer session.Close()
	modes := ssh.TerminalModes{
		ssh.ECHO:          1,
		ssh.TTY_OP_ISPEED: 14400,
		ssh.TTY_OP_OSPEED: 14400,
	}
	err = session.RequestPty("xterm", ptyCols, ptyRows, modes)
	if err != nil {
		log.Error("request pty: " + err.Error())
	}
	//处理websocket
	ws, errs := upgrader.Upgrade(w, r, nil)
	if errs != nil {
		log.Error("upgrade: " + errs.Error())
		return
	}
	defer ws.Close()
	//处理输入
	msgType, reader, errn := ws.NextReader()
	if errn != nil {
		log.Error("next reader: " + errn.Error())
		return
	}
	bufs := make([]byte, 102400)
	n, _ := reader.Read(bufs)
	cmd := string(bufs[:n])
	fmt.Println("command:" + cmd)
	//执行命令
	var buf bytes.Buffer
	session.Stdout = &buf
	session.Stderr = &buf
	err = session.Run(cmd)
	if err != nil {
		log.Error("run command: " + err.Error())
		return
	}
	//处理输出
	err = ws.WriteMessage(msgType, buf.Bytes())
	if  err != nil {
		log.Error("ws write: " + err.Error())
	}
	/*
	wc, errc := ws.NextWriter(msgType)
	if errc != nil {
		log.Error("next writer: " + errc.Error())
		return
	}
	n, err = wc.Write(buf.Bytes())
	if  err != nil {
		log.Error("ws write: " + err.Error())
	}*/
	fmt.Println(buf.String())
	return
}

func save(){
	config := make(map[string]master)
	wd, _ := os.Getwd()
	configFile := filepath.Join(wd, accountFile)
	if _, err := os.Stat(configFile); err != nil {
		if os.IsNotExist(err) {
			fs, _ := os.OpenFile(configFile, os.O_CREATE|os.O_RDWR, 0755)
			defer fs.Close()
			config[mt.Host] = *mt
			jconfig, _ := json.Marshal(config)
			fmt.Println(string(jconfig))
			fs.Write(jconfig)
			return
		}
	}
	//读
	rfs, _ := os.OpenFile(configFile, os.O_RDONLY, 0755)
	configData := make([]byte, 1024000)
	n, _ := rfs.Read(configData)
	json.Unmarshal(configData[:n], &config)
	rfs.Close()
	//值处理
	config[mt.Host] = *mt
	jconfig, _ := json.Marshal(config)
	fmt.Println(string(jconfig))
	//写
	wfs, _ := os.OpenFile(configFile, os.O_WRONLY|os.O_TRUNC, 0755)
	defer wfs.Close()
	wfs.Write(jconfig)
	return
}

func getConf() string {
	wd, _ := os.Getwd()
	configFile := filepath.Join(wd, accountFile)
	fs, _ := os.OpenFile(configFile, os.O_RDONLY, 0755)
	defer fs.Close()
	configData := make([]byte, 1024000)
	n, _ := fs.Read(configData)
	conf := string(configData[:n])
	if conf == "" {
		return "{}"
	}
	return conf
}