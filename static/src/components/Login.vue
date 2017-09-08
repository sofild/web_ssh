<template>
  <div class="login" v-bind:data="win">
    <h4>连接信息</h4>
    <ul>
      <li>主机：<input type="text" v-model="host" /></li>
      <li>端口：<input type="text" v-model="port" /></li>
      <li>用户：<input type="text" v-model="user" /></li>
      <li>密码：<input type="password" v-model="pass" /></li>
      <li class="login_btn"><a href="javascript:void(0);" @click.prevent="connect">确认</a></li>
      <li class="login_msg">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'login',
  data () {
    return {
      host: '192.168.33.138',
      port: 22,
      user: 'vagrant',
      pass: 'vagrant',
      msg: '',
      win: 1
    }
  },
  methods: {
    connect: function () {
      $.ajax({
        type: 'post',
        dataType: 'json',
        data: {action: 'connect', host: this.host, port: this.port, user: this.user, pass: this.pass},
        url: 'http://' + document.location.host
      }).done((resp) => {
        if (resp.err === '1') {
          this.msg = resp.msg
        } else {
          this.msg = resp.msg
          this.win = 2
          this.$emit('login-return', this.win)
        }
      }).fail((resp) => {
        this.msg = '获取信息失败：服务器错误'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  marign:0 auto;
}

.login h4{
  text-align: center;
}

.login ul li{
  display: block;
}

.login ul li input{

}

.login .login_btn{
  text-align: center;
}

.login .login_msg{
  color: #F00;
  text-align: center;
  line-height: 30px;
  vertical-align: middle;
}
</style>
