<template>
  <div class="command">
    <div class="show_command">{{ msg }}</div>
    <div class="input_command"><span>$</span><input type="text" v-model="command" @keyup.enter="sendCommand" /></div>
  </div>
</template>
<script>
  export default {
    name: 'command',
    data () {
      return {
        msg: 'Connection established.\n',
        command: ''
      }
    },
    methods: {
      sendCommand: function () {
        if (window['WebSocket']) {
          if (this.command === '') {
            alert('请输入命令！')
            return
          }
          this.msg += '$' + this.command + '\n'
          new WebSocket('ws://' + document.location.host + '/cmd').onclose((evt) => {
            this.msg += '\nConnection is closed.'
          }).onmessage((evt) => {
            this.msg += evt.data
          })
        } else {
          alert('您的浏览器版本过低，请升级！')
        }
      }
    }
  }
</script>
<style scoped>
  .command{
    marign: 0 auto;
    padding: 2px;
  }
  .command .show_command{
    width: 100%;
    height: 400px;
    background: #000;
    color: #fff;
  }
  .command .input_command{
    width: 100%;
    background: #000;
    color: #fff;
    padding-left: 2px;
    padding-right: 0px;
    padding-bottom: 10px;
  }
  .command .input_command input{
    width: 80%;
    border: none;
    background: #000;
    color:#fff;
    padding-left: 5px;
  }
</style>
