webpackJsonp([0],{"1FRr":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login",attrs:{data:t.win}},[e("h4",[t._v("连接信息")]),t._v(" "),e("ul",[e("li",[t._v("主机："),e("input",{directives:[{name:"model",rawName:"v-model",value:t.host,expression:"host"}],attrs:{type:"text"},domProps:{value:t.host},on:{input:function(n){n.target.composing||(t.host=n.target.value)}}})]),t._v(" "),e("li",[t._v("端口："),e("input",{directives:[{name:"model",rawName:"v-model",value:t.port,expression:"port"}],attrs:{type:"text"},domProps:{value:t.port},on:{input:function(n){n.target.composing||(t.port=n.target.value)}}})]),t._v(" "),e("li",[t._v("用户："),e("input",{directives:[{name:"model",rawName:"v-model",value:t.user,expression:"user"}],attrs:{type:"text"},domProps:{value:t.user},on:{input:function(n){n.target.composing||(t.user=n.target.value)}}})]),t._v(" "),e("li",[t._v("密码："),e("input",{directives:[{name:"model",rawName:"v-model",value:t.pass,expression:"pass"}],attrs:{type:"password"},domProps:{value:t.pass},on:{input:function(n){n.target.composing||(t.pass=n.target.value)}}})]),t._v(" "),e("li",{staticClass:"login_btn"},[e("a",{attrs:{href:"javascript:void(0);"},on:{click:function(n){n.preventDefault(),t.connect(n)}}},[t._v("确认")])]),t._v(" "),e("li",{staticClass:"login_msg"},[t._v(t._s(t.msg))])])])},s=[],o={render:a,staticRenderFns:s};n.a=o},M93x:function(t,n,e){"use strict";function a(t){e("O4eK")}var s=e("xJD8"),o=e("piig"),i=e("VU/8"),r=a,c=i(s.a,o.a,r,null,null);n.a=c.exports},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("7+uW"),s=e("M93x");a.a.config.productionTip=!1,new a.a({el:"#app",template:"<App/>",components:{App:s.a}})},O4eK:function(t,n){},SyvI:function(t,n,e){"use strict";function a(t){e("gP7a")}var s=e("aLck"),o=e("oN9B"),i=e("VU/8"),r=a,c=i(s.a,o.a,r,"data-v-2c718a60",null);n.a=c.exports},aLck:function(t,n,e){"use strict";n.a={name:"command",data:function(){return{msg:"Connection established.\n",command:""}},methods:{sendCommand:function(){var t=this;if(window.WebSocket){if(""===this.command)return void alert("请输入命令！");this.msg+="$"+this.command+"\n",new WebSocket("ws://"+document.location.host+"/cmd").onclose(function(n){t.msg+="\nConnection is closed."}).onmessage(function(n){t.msg+=n.data})}else alert("您的浏览器版本过低，请升级！")}}}},eVtS:function(t,n){},gP7a:function(t,n){},"nKb+":function(t,n,e){"use strict";var a=e("7t+N"),s=e.n(a);n.a={name:"login",data:function(){return{host:"192.168.33.138",port:22,user:"vagrant",pass:"vagrant",msg:"",win:1}},methods:{connect:function(){var t=this;s.a.ajax({type:"post",dataType:"json",data:{action:"connect",host:this.host,port:this.port,user:this.user,pass:this.pass},url:"http://"+document.location.host}).done(function(n){"1"===n.err?t.msg=n.msg:(t.msg=n.msg,t.win=2,t.$emit("login-return",t.win))}).fail(function(n){t.msg="获取信息失败：服务器错误"})}}}},oN9B:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"command"},[e("div",{staticClass:"show_command"},[t._v(t._s(t.msg))]),t._v(" "),e("div",{staticClass:"input_command"},[e("span",[t._v("$")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.command,expression:"command"}],attrs:{type:"text"},domProps:{value:t.command},on:{keyup:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;t.sendCommand(n)},input:function(n){n.target.composing||(t.command=n.target.value)}}})])])},s=[],o={render:a,staticRenderFns:s};n.a=o},piig:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"app"},[1==t.win?e("login",{attrs:{data:t.win},on:{"login-return":t.getWin}}):t._e(),t._v(" "),2==t.win?e("command",{attrs:{data:t.win}}):t._e()],1)},s=[],o={render:a,staticRenderFns:s};n.a=o},xJD8:function(t,n,e){"use strict";var a=e("xJsL"),s=e("SyvI");n.a={name:"app",components:{Login:a.a,Command:s.a},data:function(){return{win:1}},methods:{getWin:function(t){this.win=t}}}},xJsL:function(t,n,e){"use strict";function a(t){e("eVtS")}var s=e("nKb+"),o=e("1FRr"),i=e("VU/8"),r=a,c=i(s.a,o.a,r,"data-v-13f09284",null);n.a=c.exports}},["NHnr"]);
//# sourceMappingURL=app.792bc45577fef03718a1.js.map