<template>
  <div class="app">
    <login :data="win" v-if="win==1" v-on:login-return="getWin"></login>
    <command :data="win" v-if="win==2"></command>
  </div>
</template>

<script>
  import Login from './components/Login'
  import Command from './components/Command'
  export default {
    name: 'app',
    components: {
      Login,
      Command
    },
    data () {
      return {
        win: 1
      }
    },
    methods: {
      getWin: function (data) {
        this.win = data
      }
    }
  }
</script>

<style>
  .body{
    text-align: center;
  }
  .app{
    float: left;
    width: 30%;
    margin-left: 30%;
  }
</style>
