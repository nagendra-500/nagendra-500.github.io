webpackJsonp([0],{592:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(594),c=e(602),o=e(49),n=o(a.a,c.a,!1,null,null,null);t.default=n.exports},594:function(s,t,e){"use strict";var a=e(448),c=e(449),o=e(598),n=e(450);t.a={data:function(){return{UIPrefs:window._Botup.UIPrefs.prefs,receiverMessage:{}}},components:{Header:a.a,Footer:c.a,Messages:o.a,InputEditor:n.a},mounted:function(){},created:function(){},methods:{}}},595:function(s,t,e){"use strict";var a=e(599);t.a={components:{Message:a.a},data:function(){return{UIPrefs:window._Botup.UIPrefs.prefs}},mounted:function(){this.scrollToEnd()},computed:{conversations:function(){return this.scrollToEnd(),window._Botup.State.getters.getCurrentMessages}},methods:{scrollToEnd:function(){setTimeout(function(){var s=document.getElementById("botupchat");s&&(s.scrollTop=s.scrollHeight)},0)}}}},596:function(s,t,e){"use strict";t.a={props:["conversations"],data:function(){return{UIPrefs:window._Botup.UIPrefs.prefs}},mounted:function(){},methods:{emit_MCQ_visitor_response:function(s,t){var e=this;this.conversations.cases.filter(function(s,a){a!==t&&e.$refs["MCQ-".concat(Object.values(s)[0],"-").concat(a)][0].remove()});var a=0==t?this.conversations.cases.length-1:this.conversations.cases;this.conversations.cases.splice(this.conversations.cases.findIndex(function(s,e){return e!==t}),a),window._Botup.Bot.saveInState("setActiveMessage",s)}}}},598:function(s,t,e){"use strict";var a=e(595),c=e(601),o=e(49),n=o(a.a,c.a,!1,null,null,null);t.a=n.exports},599:function(s,t,e){"use strict";var a=e(596),c=e(600),o=e(49),n=o(a.a,c.a,!1,null,null,null);t.a=n.exports},600:function(s,t,e){"use strict";var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"botupchat"},[e("div",{staticClass:"botupchat-comment-section-chat"},[s.conversations.to?e("div",{staticClass:"botupchat-comment-section-replay",style:s.UIPrefs.comment_reply_section.css},[e("div",{staticClass:"botupchat-bg-reply",style:s.UIPrefs.chat_bg_reply.css},[e("p",{staticClass:"margin-zero",style:s.UIPrefs.reply_para.css,domProps:{innerHTML:s._s(s.conversations.to)}})]),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_reply.css},[s._v(s._s(s.conversations.time))])]):s._e(),s._v(" "),s.conversations.from?e("div",{staticClass:"botupchat-message-box"},[e("div",{staticClass:"d-flex align-items-center"},[e("div",[e("b-img",{staticClass:"rounded-circle mr-3",attrs:{src:s.UIPrefs.chat_header.attr.gravatar,width:"30"}})],1),s._v(" "),e("div",{staticClass:"botupchat-bg-chat",style:s.UIPrefs.chat_bg_color.css},[e("p",{style:s.UIPrefs.marginzero.css},[s._v(s._s(s.conversations.from))])])]),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_two.css},[s._v(s._s(s.conversations.time))])]):s._e(),s._v(" "),s.conversations.image?e("div",{staticClass:"botupchat-message-box"},[e("div",[e("img",{staticClass:"rounded-circle",attrs:{src:s.conversations.image}})]),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_two.css},[s._v(s._s(s.conversations.time))])]):s._e(),s._v(" "),s.conversations.video?e("div",{staticClass:"botupchat-message-box"},[e("div",{style:s.UIPrefs.mcq_video.css},[e("b-link",{style:s.UIPrefs.mcq_video_link.css,attrs:{href:s.conversations.video,target:"_blank"}},[s._v("\n          "+s._s(s.conversations.video)+"\n        ")])],1),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_two.css},[s._v(s._s(s.conversations.time))])]):s._e(),s._v(" "),s.conversations.redirect?e("div",{staticClass:"botupchat-message-box"},[e("div",{staticClass:"botupchat-bg-chat",style:s.UIPrefs.chat_bg_color.css},[e("b-link",{staticClass:"small",attrs:{href:s.conversations.redirect,target:"_blank"}},[s._v("\n          "+s._s(s.conversations.redirect)+"\n        ")])],1),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_two.css},[s._v(s._s(s.conversations.time))])]):s._e(),s._v(" "),s.conversations.cases?e("div",{staticClass:"botupchat-comment-section-chat"},[e("div",{staticClass:"botupchat-mcq",style:s.UIPrefs.chat_mcq.css},[e("h6",{staticClass:"margin-zero",style:s.UIPrefs.chat_mcq_info.css},[s._v(s._s(s.conversations.information))]),s._v(" "),s.conversations.imageMCQ?e("img",{style:s.UIPrefs.chat_mcq_img.css,attrs:{src:s.conversations.imageMCQ}}):s._e(),s._v(" "),s._l(s.conversations.cases,function(t,a){return e("div",{key:a},[e("b-button",{ref:"MCQ-"+Object.values(t)[0]+"-"+a,refInFor:!0,staticClass:"botupchat-btn-light",style:s.UIPrefs.button_bg.css,attrs:{pill:""},on:{click:function(e){return s.emit_MCQ_visitor_response(t,a)}}},[s._v(" "+s._s(Object.keys(t)[0])+" ")])],1)})],2),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_reply.css},[s._v(s._s(s.conversations.time))])]):s._e()])])},c=[],o={render:a,staticRenderFns:c};t.a=o},601:function(s,t,e){"use strict";var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("body",[e("div",{staticClass:"body-scroll",style:s.UIPrefs.bodyscroll.css,attrs:{id:"botupchat"}},[e("div",{staticClass:"botupchat-chat-section botupchat-bg-img",style:s.UIPrefs.chat_section_padding.css},[e("div",{staticClass:"botupchat-comment-section-chat"},[e("div",{staticClass:"botupchat-message-box"},[e("div",{staticClass:"botupchat-bg-chat",staticStyle:{background:"#ededed"},style:s.UIPrefs.chat_bg_color.css},[e("p",{style:s.UIPrefs.marginzero.css},[s._v("\n              "+s._s(s.UIPrefs.chat_header.attr.bot_welcome_msg)+"\n              "),e("b-img",{attrs:{src:s.UIPrefs.chat_header.attr.welcome_img,width:"20",height:"20"}})],1)]),s._v(" "),e("p",{staticClass:"botupchat-small-2",style:s.UIPrefs.small_two.css})])]),s._v(" "),s._l(s.conversations,function(s,t){return e("Message",{key:t,attrs:{conversations:s}})})],2)])])},c=[],o={render:a,staticRenderFns:c};t.a=o},602:function(s,t,e){"use strict";var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"botupchat",style:s.UIPrefs.chat.css},[e("Header"),s._v(" "),e("div",{style:s.UIPrefs.min_height.css},[e("Messages")],1),s._v(" "),e("div",{staticStyle:{positin:"fixed"}},[e("InputEditor"),s._v(" "),e("Footer")],1)],1)])},c=[],o={render:a,staticRenderFns:c};t.a=o}});
//# sourceMappingURL=0.chunk.[botupchat].js.map