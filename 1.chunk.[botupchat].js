webpackJsonp([1],{593:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e(597),o=e(603),i=e(49),r=i(a.a,o.a,!1,null,null,null);s.default=r.exports},597:function(t,s,e){"use strict";var a=e(0),o=e.n(a),i=e(448),r=e(449);s.a={components:{Header:i.a,Footer:r.a},data:function(){return{conversationList:[],UIPrefs:window._Botup.UIPrefs.prefs}},created:function(){},mounted:function(){this.conversationList=window._Botup.State.getters.getAllConversations},methods:{dateFormat:function(t){return o.a.utc(t.replace(/(\d+)(st|nd|rd|th)/,"$1")).local().format("MMM DD,YYYY")},conversations:function(t){window._Botup.State.commit("removeActiveConversation",[]),window._Botup.Chat.conversation.setActiveConversationID(Object.keys(t)[0]);var s=window._Botup.State.getters.getActiveConversationID;this.conversationList.filter(function(t){return Object.keys(t)[0]==s})[0][s].forEach(function(t){window._Botup.State.commit("setMessages",t)}),this.$router.push({name:"chat",params:{active:!0}})}}}},603:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"botupchat",style:t.UIPrefs.chat.css},[e("Header",{attrs:{conversationHeader:!0}}),t._v(" "),e("div",{style:t.UIPrefs.min_heightconv.css},[t.conversationList.length?e("div",[t.conversationList.length?e("b-row",{staticClass:"ml-0 mr-0 pb-1"},[e("b-card",{staticClass:"w-100 border-0 p-0",attrs:{"no-body":""}},[e("b-card-body",{staticClass:"my-n3 o-cardbody"},[e("b-list-group",{staticClass:"list-group-flush"},t._l(t.conversationList,function(s,a){return e("b-list-group-item",{key:a,staticClass:"m-0 pb-2 pl-0 pr-0 pt-2 mt-1 border-bottom"},[e("b-row",{staticClass:"align-items-top"},[e("b-col",{staticClass:"pr-2",attrs:{cols:"auto"}},[e("div",{staticClass:"avatar text-uppercase avatar-sm"},[e("b-img",{staticClass:"botupchat-profile",style:t.UIPrefs.chat_header.css.img,attrs:{src:t.UIPrefs.chat_header.attr.gravatar}})],1)]),t._v(" "),e("b-col",{staticClass:"pl-0 pr-0"},[e("h4",{staticClass:"mb-0 ellipsis heading-text text-capitalize",staticStyle:{cursor:"pointer","font-size":"14px"},on:{click:function(e){return t.conversations(s)}}},[t._v("\n                        "+t._s(t.$t("botupChat.default_bot_name"))+"\n                      ")]),t._v(" "),e("p",{staticClass:"card-text datetime small lineheight text-muted",staticStyle:{"font-size":"9px"}},[e("time",[t._v("\n                          "+t._s(t.dateFormat((new Date).toLocaleDateString()))+"\n                        ")])])])],1)],1)}),1)],1)],1)],1):t._e()],1):e("div",[e("div",{staticClass:"bg-white mx-auto pb-3 text-center"},[e("img",{staticClass:"img-fluid mt-5 mx-auto pt-4",attrs:{src:"",width:"190px"}}),t._v(" "),e("p",{staticClass:"d-block text-black-50 mt-4 small"},[t._v("\n            "+t._s(t.$t("botupChat.empty_state"))+"\n          ")])])])]),t._v(" "),e("Footer",{attrs:{conversationFooter:!0}})],1)])},o=[],i={render:a,staticRenderFns:o};s.a=i}});
//# sourceMappingURL=1.chunk.[botupchat].js.map