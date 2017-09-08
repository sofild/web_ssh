package main

import(
    "net/http"
    log "github.com/Sirupsen/logrus"
    "text/template"
    "fmt"
    "golang.org/x/crypto/ssh"
    "io"
    "encoding/json"
    //"time"
    "github.com/gorilla/websocket"
    "bufio"
)

var(
    ssh_client *ssh.Client 
    upgrader = websocket.Upgrader{}
)

func main(){
    http.Handle("/favicon.ico", http.FileServer(http.Dir("static/dist")))
    http.Handle("/static/", http.FileServer(http.Dir("static/dist")))
    http.HandleFunc("/", handle)
    http.HandleFunc("/cmd", cmdHandle)
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Error(err.Error())
    }else{
        log.Info("service start.")
    }
}

//处理请求
func handle(w http.ResponseWriter, r *http.Request){
    r.ParseForm()
    if _, ok := r.Form["action"];ok {
        action := r.Form["action"][0]
        if action == "connect"{
            connect(w, r)
            return
        }
    }
    html, err := template.ParseFiles("static/dist/index.html")
    if err != nil {
        log.Error(err.Error())
        return
    }
    html.Execute(w, nil)
}

//连接
func connect(w http.ResponseWriter, r *http.Request){
    r.ParseForm()
    host := r.Form["host"][0]
    port := r.Form["port"][0]
    user := r.Form["user"][0]
    pass := r.Form["pass"][0]
    config := &ssh.ClientConfig{
        User: user,
        Auth: []ssh.AuthMethod{
            ssh.Password(pass),
        },
        HostKeyCallback: ssh.InsecureIgnoreHostKey(),
    }
    connstr := fmt.Sprintf("%s:%s", host, port)
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
    dats,_ := json.Marshal(ret)
    io.WriteString(w, string(dats))
    return
}

//命令行处理
func cmdHandle(w http.ResponseWriter, r *http.Request){
    ws, errs := upgrader.Upgrade(w, r, nil)
    if errs != nil {
        log.Error(errs.Error())
        return
    }
    defer ws.Close()

    session, err := ssh_client.NewSession()
    if err != nil {
        log.Error(err.Error())
        return
    }
    defer session.Close()
    
    _, message, _ := ws.ReadMessage()
    session.Stdout.Write(message)
    session.Stderr.Write(message)
    s := bufio.NewScanner(session.Stdin)
    for s.Scan(){
        ws.WriteMessage(websocket.TextMessage, s.Bytes())   
    }
    err = session.Shell()
    if err != nil {
        log.Error(err.Error())
        return
    }
    err = session.Wait()
    if err != nil {
        log.Error(err.Error())
        return
    }
}
