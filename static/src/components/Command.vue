<template>
  <div class="command">
    <div class="show_command" id="show_command">
      <p v-for="item in msg">
        <label v-if="item.type==='content'">{{ item.content }}</label>
        <label v-if="item.type==='command'" class="command_text">${{ item.content }}</label>
      </p>
    </div>
    <div class="input_command"><span>$</span><input type="text" v-model="command" @keyup.enter="sendCommand" /></div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'command',
    data () {
      return {
        msg: [{type: 'content', content: 'Connection success.'}],
        command: '',
        conn: null
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        $('.input_command input').focus()
      })
    },
    methods: {
      sendCommand: function () {
        if (this.command === '') {
          alert('请输入命令！')
          return
        }
        var _this = this
        var data = {}
        data.content = this.command
        data.type = 'command'
        this.msg.push(data)
        this.conn = new WebSocket('ws://' + document.location.host + '/cmd')
        this.conn.onopen = function () {
          _this.conn.send(_this.command)
          _this.command = ''
        }
        this.conn.onmessage = function (event) {
          data = {}
          data.content = event.data
          data.type = 'content'
          _this.msg.push(data)
          _this.scrollTop()
        }
        console.log(this.msg)
      },
      scrollTop: function () {
        this.$nextTick(() => {
          var container = this.$el.querySelector('#show_command')
          container.scrollTop = container.scrollHeight
        })
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
    overflow:auto;
    overflow-x:hidden;
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
    outline:none;
  }
  .command .show_command .command_text{
    color: #ccc;
  }
  p {
    margin:0px;
    display: block;
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }
</style>
