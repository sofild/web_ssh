webpackJsonp([0],{"1FRr":function(t,n,s){"use strict";var o=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"login",attrs:{data:t.win}},[s("h3",[t._v("连接信息")]),t._v(" "),s("ul",[s("li",[s("label",[t._v("打开：")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.curHost,expression:"curHost"}],staticClass:"in login_open",on:{change:[function(n){var s=Array.prototype.filter.call(n.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.curHost=n.target.multiple?s:s[0]},t.selectHost]}},[s("option",{domProps:{value:0}},[t._v("新建")]),t._v(" "),t._l(t.conf,function(n,o){return s("option",{domProps:{value:n.host}},[t._v(t._s(n.host))])})],2)]),t._v(" "),s("li",[s("label",[t._v("主机：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.host,expression:"host"}],staticClass:"in",attrs:{type:"text"},domProps:{value:t.host},on:{input:function(n){n.target.composing||(t.host=n.target.value)}}})]),t._v(" "),s("li",[s("label",[t._v("端口：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.port,expression:"port"}],staticClass:"in",attrs:{type:"text"},domProps:{value:t.port},on:{input:function(n){n.target.composing||(t.port=n.target.value)}}})]),t._v(" "),s("li",[s("label",[t._v("用户：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user,expression:"user"}],staticClass:"in",attrs:{type:"text"},domProps:{value:t.user},on:{input:function(n){n.target.composing||(t.user=n.target.value)}}})]),t._v(" "),s("li",[s("label",[t._v("密码：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.pass,expression:"pass"}],staticClass:"in",attrs:{type:"password"},domProps:{value:t.pass},on:{input:function(n){n.target.composing||(t.pass=n.target.value)}}})]),t._v(" "),s("li",{staticClass:"login_save"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.save,expression:"save"}],attrs:{type:"checkbox",name:"save"},domProps:{value:1,checked:Array.isArray(t.save)?t._i(t.save,1)>-1:t.save},on:{__c:function(n){var s=t.save,o=n.target,e=!!o.checked;if(Array.isArray(s)){var i=t._i(s,1);o.checked?i<0&&(t.save=s.concat(1)):i>-1&&(t.save=s.slice(0,i).concat(s.slice(i+1)))}else t.save=e}}}),t._v(" 保存信息")]),t._v(" "),s("li",{staticClass:"login_btn"},[s("a",{attrs:{href:"javascript:void(0);"},on:{click:function(n){n.preventDefault(),t.connect(n)}}},[t._v("确认")])]),t._v(" "),s("li",{staticClass:"login_msg"},[t._v(t._s(t.msg))])])])},e=[],i={render:o,staticRenderFns:e};n.a=i},M93x:function(t,n,s){"use strict";function o(t){s("O4eK")}var e=s("xJD8"),i=s("piig"),a=s("VU/8"),r=o,c=a(e.a,i.a,r,null,null);n.a=c.exports},NHnr:function(t,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=s("7+uW"),e=s("M93x");o.a.config.productionTip=!1,new o.a({el:"#app",template:"<App/>",components:{App:e.a}})},O4eK:function(t,n){},SyvI:function(t,n,s){"use strict";function o(t){s("gP7a")}var e=s("aLck"),i=s("oN9B"),a=s("VU/8"),r=o,c=a(e.a,i.a,r,"data-v-2c718a60",null);n.a=c.exports},aLck:function(t,n,s){"use strict";var o=s("7t+N"),e=s.n(o);n.a={name:"command",data:function(){return{msg:[{type:"content",content:"Connection success."}],command:"",conn:null,historyCommand:[],history:0,win:2}},mounted:function(){this.$nextTick(function(){e()(".input_command input").focus()})},methods:{sendCommand:function(){var t={};if(""===this.command)return t.content="",t.type="command",this.msg.push(t),void n.scrollTop();if("exit"===this.command)return void(this.win=1);var n=this;t={},t.content=this.command,t.type="command",this.msg.push(t),this.historyCommand.push(this.command),this.history=this.historyCommand.length,this.conn=new WebSocket("ws://"+document.location.host+"/cmd"),this.conn.onopen=function(){n.conn.send(n.command),n.command=""},this.conn.onmessage=function(s){t={},t.content=s.data.split("\n"),console.log(t.content),t.type="content",n.msg.push(t),n.scrollTop()},n.scrollTop()},scrollTop:function(){this.$nextTick(function(){var t=document.body;t.scrollTop=t.scrollHeight})},historyUp:function(){this.history--,this.history<=0&&(this.history=this.historyCommand.length-1),this.command=this.historyCommand[this.history]},historyDown:function(){this.history++,this.history>=this.historyCommand.length-1&&(this.history=0),this.command=this.historyCommand[this.history]}}}},eVtS:function(t,n){},gP7a:function(t,n){},"nKb+":function(t,n,s){"use strict";var o=s("7t+N"),e=s.n(o);n.a={name:"login",data:function(){return{curHost:0,host:"",port:22,user:"",pass:"",msg:"",win:1,save:0,conf:window.Conf}},methods:{connect:function(){var t=this,n=Math.floor(e()("body").width()/15),s=Math.floor(e()("body").height()/15);e.a.ajax({type:"post",dataType:"json",data:{action:"connect",host:this.host,port:this.port,user:this.user,pass:this.pass,cols:n,rows:s,save:this.save?1:0},url:"http://"+document.location.host}).done(function(n){"1"===n.err?t.msg=n.msg:(t.msg=n.msg,t.win=2,t.$emit("login-return",t.win))}).fail(function(n){t.msg="获取信息失败：服务器错误"})},selectHost:function(){if(0===this.curHost)return this.host="",this.port=22,this.user="",void(this.pass="");var t=this.conf[this.curHost];this.host=t.host,this.port=t.port,this.user=t.user,this.pass=t.pass}}}},oN9B:function(t,n,s){"use strict";var o=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"command",attrs:{data:t.win}},[s("div",{staticClass:"show_command"},t._l(t.msg,function(n){return s("p",["content"===n.type?s("label",[n.content instanceof Array?t._l(n.content,function(o,e){return s("em",[t._v(t._s(o)),e<=n.content.length-1&&""!=o?s("br"):t._e()])}):[t._v("\n          "+t._s(n.content)),s("br")]],2):t._e(),t._v(" "),"command"===n.type?s("label",{staticClass:"command_text"},[t._v("$"+t._s(n.content))]):t._e()])})),t._v(" "),s("div",{staticClass:"input_command"},[s("span",[t._v("$")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.command,expression:"command"}],attrs:{type:"text"},domProps:{value:t.command},on:{keyup:[function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;t.sendCommand(n)},function(n){if(!("button"in n)&&t._k(n.keyCode,"up",38))return null;t.historyUp(n)},function(n){if(!("button"in n)&&t._k(n.keyCode,"down",40))return null;t.historyDown(n)}],input:function(n){n.target.composing||(t.command=n.target.value)}}})])])},e=[],i={render:o,staticRenderFns:e};n.a=i},piig:function(t,n,s){"use strict";var o=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"app",attrs:{id:"app"}},[1==t.win?s("login",{attrs:{data:t.win},on:{"login-return":t.getWin}}):t._e(),t._v(" "),2==t.win?s("command",{attrs:{data:t.win}}):t._e()],1)},e=[],i={render:o,staticRenderFns:e};n.a=i},xJD8:function(t,n,s){"use strict";var o=s("xJsL"),e=s("SyvI");n.a={name:"app",components:{Login:o.a,Command:e.a},data:function(){return{win:1}},methods:{getWin:function(t){this.win=t}}}},xJsL:function(t,n,s){"use strict";function o(t){s("eVtS")}var e=s("nKb+"),i=s("1FRr"),a=s("VU/8"),r=o,c=a(e.a,i.a,r,"data-v-13f09284",null);n.a=c.exports}},["NHnr"]);
//# sourceMappingURL=app.00efc39ed9e50c79e7ba.js.map