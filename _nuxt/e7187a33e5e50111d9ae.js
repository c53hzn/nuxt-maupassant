(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{183:function(t,n,e){"use strict";e(20),e(12),e(51),e(29);var o=e(3);n.a=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(n){var e,o,i,r,l,c,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(t){for(var n=0;n<t.length;n++)o[t[n]]?o[t[n]]++:o[t[n]]=1},t.next=3,n("blog").sortBy("date","desc").only(["date","categories","slug"]).fetch();case 3:for(e=t.sent,o={},i=0;i<e.length;i++)0==i?r(e[i].categories):e[i].slug!=e[i-1].slug&&(e[i].categories||console.log(e[i]),r(e[i].categories));for(l=Object.keys(o),c=[],d=0;d<l.length;d++)c[d]={name:l[d],len:o[l[d]]};return t.abrupt("return",{categories:c});case 10:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()},184:function(t,n,e){"use strict";e(29);var o=e(3);n.a=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(n){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("blog").sortBy("date","desc").limit(5).only(["title","slug"]).fetch();case 2:return e=t.sent,t.abrupt("return",{latestBlog:e});case 4:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()},198:function(t,n,e){var content=e(203);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(69).default)("72520070",content,!0,{sourceMap:!1})},201:function(t,n){t.exports=function(t){var n=document,e=n.createElement("style"),o=n.createElement("div");o.id="mask_layer",o.className="hidden",o.innerHTML='<div id="mask_child"></div>',e.innerHTML="\n.zoomable {\n\tcursor: zoom-in;\n}\n#mask_layer {\n\tposition: fixed;\n\ttop: 0px;\n\tleft: 0px;\n\tright: 0px;\n\tbottom: 0px;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: rgba(0, 0, 0, .5);\n}\n#mask_child {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n\tright: 0px;\n\tbottom: 0px;\n\tmargin: auto;\n\tbackground-size: contain;\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n\tcursor: zoom-out;\n}\n#mask_layer .arrow {\n  position: absolute;\n  top: 50%;\n  left: 0px;\n  right: 0px;\n  width: 48px;\n  font-size: 24px;\n  color: white;\n  text-align: center;\n  line-height: 50px;\n  vertical-align: top;\n  background: rgba(0,0,0,0.5);\n  transform: translateY(-25px);\n  user-select: none;\n  cursor: pointer;\n}\n#mask_layer .arrow:hover {\n  opacity: 0.7;\n}\n#mask_layer .arrow-left {\n  left: 0px;\n  right: auto;\n}\n#mask_layer .arrow-right {\n  left: auto;\n  right: 0px;\n}\n.hidden {\n\tdisplay: none;\n}\n.fade-in-anime {\n\tanimation: fade-in 0.5s;\n  \tz-index: 2;\n}\n.fade-out-anime {\n\tanimation: fade-out 0.5s;\n\tanimation-fill-mode: forwards;\n}\n@keyframes fade-in {\n  from {\n  \topacity: 0;\n  \tz-index: 2;\n  }\n  to {\n  \topacity: 1;\n  \tz-index: 2;\n  }\n}\n@keyframes fade-out {\n  0% {\n  \topacity: 1;\n  \tz-index: 2;\n  }\n  99% {\n  \topacity: 0;\n  \tz-index: 2;\n  }\n  100% {\n  \topacity: 0;\n  \tz-index: -1;\n  }\n}\n",n.querySelector("head").appendChild(e),n.querySelector("body").appendChild(o),n.querySelector("#mask_child").onclick=function(){n.querySelector("#mask_layer").className="fade-out-anime"};for(var r=0;r<t.length;r++)l(t[r][0],t[r][1],r);function l(t,e,o){for(var r=n.querySelectorAll(t),i=0;i<r.length;i++){var l=r[i].parentNode,c=l.parentNode;"A"!=l.nodeName&&"A"!=c.nodeName&&(r[i].className=r[i].className+" zoomable",r[i].setAttribute("data-zoom-group-index",o+"-"+i),r[i].onclick=function(){n.querySelector("#mask_child").style.backgroundImage=e?"url("+this.src+")":this.style.backgroundImage,n.querySelector("#mask_layer").className="fade-in-anime"})}}}},202:function(t,n,e){"use strict";e(198)},203:function(t,n,e){(n=e(68)(!1)).push([t.i,".nuxt-content{margin-bottom:50px;text-align:justify;word-break:break-all}.nuxt-content h2{margin:9px 0;padding:9px 0}.nuxt-content h3,.nuxt-content h4,.nuxt-content h5{margin:8px 0;padding:0}.nuxt-content h2,.nuxt-content h3{border-bottom:1px solid silver}.nuxt-content h2{font-size:30px}.nuxt-content h3{font-size:26px}.nuxt-content h4{font-size:24px}.nuxt-content h5{font-size:20px}.nuxt-content p{line-height:24px}.nuxt-content ol{padding-right:18px}.nuxt-content li{line-height:24px}.nuxt-content iframe{margin:0 20px}.nuxt-content iframe.youtube{margin:8px auto 8px 20px;width:480px;height:360px;display:block}.nuxt-content blockquote{margin:16px 0;padding:10px;color:#6a737d;background-color:#f8f8f8;border-left:.25em solid #dfe2e5}.nuxt-content a,.toc a,.toc a:active,.toc a:visited{color:#000;font-weight:700;text-decoration:underline;border:none}.nuxt-content a:hover,.toc a:hover{color:grey}li.toc3{list-style:circle;margin-left:15px}a#comment-link{top:0}.blog-desc{margin:10px 0;padding:10px;color:#666;background-color:rgba(0,0,0,.025)}#disqus_thread{margin-top:20px}.prev-next{margin:20px auto;display:flex;justify-content:space-between}.prev-next a{display:block}.next,.prev{max-width:42%;color:grey;cursor:pointer}.prev{text-align:left}.next{text-align:right}.next:hover,.prev:hover{color:#000}.prev-next-arrow{font-size:28px}#comment{margin:40px 0 0;text-align:center}.loadCommentBtn{margin-bottom:20px;cursor:pointer;display:inline-block}.loadCommentBtn:hover{color:grey}@media (max-width:768px){.nuxt-content h2,.nuxt-content h3,.nuxt-content h4,.nuxt-content h5{margin:9px 0}.nuxt-content blockquote{margin:16px 0}.nuxt-content iframe{margin:0}.nuxt-content iframe.youtube{margin:8px auto;width:100%}.nuxt-content ul{padding-left:20px}.nuxt-content pre{margin-left:0;margin-right:0}.next,.prev{margin:0}#comment{margin:40px 0 0}}@media (max-width:539px){.nuxt-content iframe.youtube{height:auto}}",""]),t.exports=n},225:function(t,n,e){"use strict";e.r(n);e(29);var o=e(3),r=e(201),l=e.n(r),c=e(183),d=e(184),x={layout:"post",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function n(){var e,o,r,l,x,m;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=t.params.slug,n.next=3,t.$content("blog").where({slug:e}).fetch();case 3:return o=n.sent,r=o[0],n.next=7,t.$content("blog").only(["title","slug","description"]).sortBy("date").surround(e).fetch();case 7:return l=n.sent,r.prev=l[0],r.next=l[1],n.next=12,Object(d.a)(t.$content);case 12:return x=n.sent,n.next=15,Object(c.a)(t.$content);case 15:return m=n.sent,n.abrupt("return",{blog:r,mySlug:e,keywords:r.keywords?r.keywords:[],myBase:t.app.router.options.base,latestBlog:x.latestBlog,categories:m.categories});case 17:case"end":return n.stop()}}),n)})))()},mounted:function(){var t=this;t.$nextTick((function(){t.loadCustomScripts()}))},methods:{loadCustomScripts:function(){for(var t=window,n=document.querySelectorAll(".nuxt-content img"),i=0;i<n.length;i++)n[i].naturalWidth/n[i].naturalHeight>2?n[i].style.maxWidth="100%":n[i].style.height="150px";l()([[".nuxt-content img",!0]]);for(var e=document.querySelectorAll(".nuxt-content a[href]"),o=0;o<e.length;o++){if(e[o].host!==t.location.host){e[o].target="_blank";var r=document.createElement("i");r.className="fa fa-external-link",e[o].appendChild(r)}}for(var c=document.querySelectorAll(".nuxt-content h4 a"),d=document.querySelectorAll(".nuxt-content h5 a"),s=0;s<c.length;s++)""==c[s].innerText&&(c[s].style.display="none");for(var x=0;x<d.length;x++)""==d[x].innerText&&(d[x].style.display="none")}},head:function(){return{title:this.blog.title,meta:[{hid:"date",name:"date",content:this.blog.date.substring(0,10)},{hid:"description",name:"description",content:this.blog.description},{hid:"keyword",name:"keyword",content:this.keywords.length?this.blog.categories.join(",")+","+this.blog.tags.join(",")+","+this.keywords.join(","):this.blog.categories.join(",")+","+this.blog.tags.join(",")}],link:[{rel:"stylesheet",href:this.myBase+"css/github-markdown.min.css"}]}}},m=(e(202),e(6)),component=Object(m.a)(x,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"blog-wrap"},[e("main",{staticClass:"blog-main"},[e("h1",{staticClass:"align-center article-title"},[t._v(t._s(t.blog.title))]),t._v(" "),e("p",{staticClass:"align-center"},[e("span",{staticClass:"blog-date"},[e("i",{staticClass:"fa fa-calendar "}),t._v("\n        "+t._s(t.blog.date.substring(0,10))+"\n      ")]),t._v(" "),e("nuxt-link",{attrs:{to:"/blog/language/"+t.blog.language}},[e("span",{staticClass:"blog-lang"},[e("i",{staticClass:"fa fa-language"}),t._v("\n          "+t._s(t.blog.language)+"\n        ")])])],1),t._v(" "),e("p",{staticClass:"align-center"},t._l(t.blog.categories,(function(n,o){return e("span",{key:o,staticClass:"blog-cat"},[e("nuxt-link",{attrs:{to:"/blog/category/"+n}},[e("i",{staticClass:"fa fa-folder-open"}),t._v("\n          "+t._s(n)+"\n        ")])],1)})),0),t._v(" "),e("p",{staticClass:"blog-tags align-center"},t._l(t.blog.tags,(function(n,o){return e("span",{key:o,staticClass:"blog-tag"},[e("nuxt-link",{attrs:{to:"/blog/tag/"+n}},[e("i",{staticClass:"fa fa-tag",staticStyle:{color:"inherit"}}),t._v("\n          "+t._s(n)+"\n        ")])],1)})),0),t._v(" "),e("p",{staticClass:"blog-desc",domProps:{innerHTML:t._s(t.blog.description)}}),t._v(" "),e("article",[e("ul",{staticClass:"toc"},t._l(t.blog.toc,(function(link){return e("li",{key:link.id,class:{toc2:2===link.depth,toc3:3===link.depth}},[e("nuxt-link",{attrs:{to:"#"+link.id}},[t._v(t._s(link.text))])],1)})),0),t._v(" "),e("nuxt-content",{staticClass:"markdown-body",attrs:{document:t.blog}})],1),t._v(" "),e("div",{staticClass:"prev-next"},[e("div",{staticClass:"prev"},[t.blog.prev?e("nuxt-link",{staticClass:"no-decor-link",attrs:{to:"/blog/"+t.blog.prev.slug,title:t.blog.prev.description}},[e("span",{staticClass:"prev-next-arrow"},[e("i",{staticClass:"fa fa-long-arrow-left"})]),t._v(" "),e("br"),t._v(" "),e("span",{staticClass:"title"},[t._v(t._s(t.blog.prev.title))])]):t._e()],1),t._v(" "),e("div",{staticClass:"next"},[t.blog.next?e("nuxt-link",{staticClass:"no-decor-link",attrs:{to:"/blog/"+t.blog.next.slug,title:t.blog.next.description}},[e("span",{staticClass:"prev-next-arrow"},[e("i",{staticClass:"fa fa-long-arrow-right"})]),t._v(" "),e("br"),t._v(" "),e("span",{staticClass:"title"},[t._v(t._s(t.blog.next.title))])]):t._e()],1)])]),t._v(" "),e("aside",{staticClass:"blog-side"},[e("div",{staticClass:"side-unit"},[t._m(0),t._v(" "),e("hr"),t._v(" "),e("p",t._l(t.categories,(function(n,o){return e("span",{key:o,staticClass:"blog-cat"},[e("nuxt-link",{attrs:{to:"/blog/category/"+n.name}},[e("i",{staticClass:"fa fa-folder-open"}),t._v("\n             "+t._s(n.name)+": "+t._s(n.len)+"\n           ")])],1)})),0)]),t._v(" "),e("div",{staticClass:"side-unit"},[t._m(1),t._v(" "),e("hr"),t._v(" "),t._l(t.latestBlog,(function(n,o){return e("p",{key:o},[e("nuxt-link",{staticClass:"blog-link",attrs:{to:"/blog/"+n.slug}},[t._v("\n         "+t._s(n.title)+"\n        ")])],1)}))],2)])])}),[function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("i",{staticClass:"fa fa-folder-open"}),this._v(" 分类")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("i",{staticClass:"fa fa-file-o"}),this._v(" 最新文章")])}],!1,null,null,null);n.default=component.exports}}]);