(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{180:function(t,e,n){"use strict";n(20),n(12),n(51),n(29);var r=n(3);e.a=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e){var n,r,i,o,c,l,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=function(t){for(var e=0;e<t.length;e++)r[t[e]]?r[t[e]]++:r[t[e]]=1},t.next=3,e("blog").sortBy("date","desc").only(["date","categories","slug"]).fetch();case 3:for(n=t.sent,r={},i=0;i<n.length;i++)0==i?o(n[i].categories):n[i].slug!=n[i-1].slug&&(n[i].categories||console.log(n[i]),o(n[i].categories));for(c=Object.keys(r),l=[],f=0;f<c.length;f++)l[f]={name:c[f],len:r[c[f]]};return t.abrupt("return",{categories:l});case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},181:function(t,e,n){"use strict";n(29);var r=n(3);e.a=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e("blog").sortBy("date","desc").limit(5).only(["title","slug"]).fetch();case 2:return n=t.sent,t.abrupt("return",{latestBlog:n});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},219:function(t,e,n){"use strict";n.r(e);n(20),n(12),n(51),n(29);var r=n(3),o=n(180),c=n(181),l={layout:"page",asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,i,l,f,v,_,h,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=function(t){for(var e=0;e<t.length;e++)r[t[e]]?r[t[e]]++:r[t[e]]=1},e.next=3,t.$content("blog").sortBy("date","desc").only(["date","tags","slug"]).fetch();case 3:for(n=e.sent,r={},i=0;i<n.length;i++)0==i?l(n[i].tags):n[i].slug!=n[i-1].slug&&(n[i].tags||console.log(n[i]),l(n[i].tags));for(f=Object.keys(r),v=[],_=0;_<f.length;_++)v[_]={name:f[_],len:r[f[_]]};return e.next=11,Object(c.a)(t.$content);case 11:return h=e.sent,e.next=14,Object(o.a)(t.$content);case 14:return d=e.sent,e.abrupt("return",{tags:v,latestBlog:h.latestBlog,categories:d.categories});case 16:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"标签列表",meta:[{hid:"description",name:"description",content:"文章标签"}]}}},f=n(7),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"blog-wrap"},[n("main",{staticClass:"blog-main"},[n("h1",[t._v("\n      标签列表\n    ")]),t._v(" "),n("p",[n("span",{staticClass:"blog-tag"},[n("nuxt-link",{attrs:{to:"/blog"}},[n("i",{staticClass:"fa fa-list",staticStyle:{color:"inherit"}}),t._v("\n          所有文章\n        ")])],1)]),t._v(" "),n("p",t._l(t.tags,(function(e,r){return n("span",{key:r,staticClass:"blog-tag"},[n("nuxt-link",{attrs:{to:"/blog/tag/"+e.name}},[n("i",{staticClass:"fa fa-tag",staticStyle:{color:"inherit"}}),t._v(t._s(e.name)+": "+t._s(e.len))])],1)})),0)]),t._v(" "),n("aside",{staticClass:"blog-side"},[n("div",{staticClass:"side-unit"},[t._m(0),t._v(" "),n("hr"),t._v(" "),n("p",t._l(t.categories,(function(e,r){return n("span",{key:r,staticClass:"blog-cat"},[n("nuxt-link",{attrs:{to:"/blog/category/"+e.name}},[n("i",{staticClass:"fa fa-folder-open"}),t._v("\n             "+t._s(e.name)+": "+t._s(e.len)+"\n           ")])],1)})),0)]),t._v(" "),n("div",{staticClass:"side-unit"},[t._m(1),t._v(" "),n("hr"),t._v(" "),t._l(t.latestBlog,(function(e,r){return n("p",{key:r},[n("nuxt-link",{staticClass:"blog-link",attrs:{to:"/blog/"+e.slug}},[t._v("\n         "+t._s(e.title)+"\n        ")])],1)}))],2)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("i",{staticClass:"fa fa-folder-open"}),this._v(" 分类")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("i",{staticClass:"fa fa-file-o"}),this._v(" 最新文章")])}],!1,null,null,null);e.default=component.exports}}]);