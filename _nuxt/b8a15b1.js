(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{307:function(t,e,n){var content=n(447);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("934f86b4",content,!0,{sourceMap:!1})},309:function(t,e,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("c3b562f4",content,!0,{sourceMap:!1})},446:function(t,e,n){"use strict";n(307)},447:function(t,e,n){var r=n(65)(!1);r.push([t.i,"canvas{height:27vmax!important}",""]),t.exports=r},448:function(t,e,n){var content=n(458);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("4fa3e716",content,!0,{sourceMap:!1})},449:function(t,e,n){"use strict";n.r(e);var r=n(464),o=r.b.reactiveProp,l={extends:r.a,mixins:[o],props:{title:{type:String,default:""},timeunit:{type:String,default:""},color:{type:String,default:"white"},options:{type:Object,default:function(){return{parsing:!1,normalized:!0,animation:{onComplete:function(){document.dispatchEvent(new Event("graphLoaded"))}},pointHitRadius:20,responsive:!0,maintainAspectRatio:!1,aspectRatio:10,height:2e4,width:20,lineTension:0,legend:{position:"bottom",display:!0,color:this.color,labels:{fontColor:this.color}},title:{display:this.title.length>0,text:this.title,fontColor:this.color,fontSize:20},scales:{xAxes:[{type:"time",time:{unit:this.timeunit,tooltipFormat:"HH:mm DD.MM",displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH[h]"}},gridLines:{display:!1,color:this.color},ticks:{fontColor:this.color,source:"auto"}}],yAxes:[{scaleLabel:{display:!0},ticks:{precision:0,beginAtZero:!1,fontColor:this.color},gridLines:{display:!0,color:this.color+80}}]},elements:{line:{tension:0}}}}}},mounted:function(){this.renderChart(this.chartData,this.options)}},c=(n(446),n(74)),component=Object(c.a)(l,undefined,undefined,!1,null,null,null);e.default=component.exports},450:function(t,e,n){"use strict";n(309)},451:function(t,e,n){var r=n(65)(!1);r.push([t.i,".center-absolute{position:absolute;left:50%;top:50%;margin-left:-35px;margin-top:-35px}",""]),t.exports=r},453:function(t,e,n){"use strict";n.r(e);n(47);var r={name:"LineGraphCard",props:{initialLoading:{type:Boolean},lines:{type:Array,default:function(){return[]}},updating:{type:Boolean},title:{type:String,default:""},timeunit:{type:String,default:""},greyscale:{type:Boolean,default:!1}},data:function(){return{chartData:{}}},watch:{lines:function(){this.chartData={labels:this.lines.map((function(line){return line.date})),datasets:[{data:this.lines.map((function(line){return line.humidity})),label:"Luftfeuchte in %",borderColor:this.greyscale?"black":"#348899",fill:!1,pointRadius:1},{data:this.lines.map((function(line){return line.temperature})),label:"Temperatur in °C",borderColor:this.greyscale?"black":"#962D3E",borderDash:[10,5],fill:!1,pointRadius:1},{data:this.lines.map((function(line){return line.light})),label:"Light in 💡",borderColor:this.greyscale?"black":"#F2EBC7",borderDash:[5,5],fill:!1,pointRadius:1}]}}}},o=(n(450),n(74)),l=n(99),c=n.n(l),d=n(563),h=n(498),j=n(564),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"mb-3"},[t.initialLoading?n("v-skeleton-loader",{attrs:{type:"card"}}):n("LineGraph",{staticStyle:{height:"100%"},attrs:{"chart-data":t.chartData,title:t.title,color:t.$vuetify.theme.currentTheme.secondary,timeunit:t.timeunit}}),t._v(" "),t.updating&&!t.initialLoading?n("v-progress-circular",{staticClass:"center-absolute",attrs:{indeterminate:"",color:"purple",size:70,width:7}}):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{LineGraph:n(449).default}),c()(component,{VCard:d.a,VProgressCircular:h.a,VSkeletonLoader:j.a})},457:function(t,e,n){"use strict";n(448)},458:function(t,e,n){var r=n(65)(!1);r.push([t.i,".kindle[data-v-1e7804f2]{height:200px}",""]),t.exports=r},460:function(t,e,n){var map={"./af":310,"./af.js":310,"./ar":311,"./ar-dz":312,"./ar-dz.js":312,"./ar-kw":313,"./ar-kw.js":313,"./ar-ly":314,"./ar-ly.js":314,"./ar-ma":315,"./ar-ma.js":315,"./ar-sa":316,"./ar-sa.js":316,"./ar-tn":317,"./ar-tn.js":317,"./ar.js":311,"./az":318,"./az.js":318,"./be":319,"./be.js":319,"./bg":320,"./bg.js":320,"./bm":321,"./bm.js":321,"./bn":322,"./bn-bd":323,"./bn-bd.js":323,"./bn.js":322,"./bo":324,"./bo.js":324,"./br":325,"./br.js":325,"./bs":326,"./bs.js":326,"./ca":327,"./ca.js":327,"./cs":328,"./cs.js":328,"./cv":329,"./cv.js":329,"./cy":330,"./cy.js":330,"./da":331,"./da.js":331,"./de":332,"./de-at":333,"./de-at.js":333,"./de-ch":334,"./de-ch.js":334,"./de.js":332,"./dv":335,"./dv.js":335,"./el":336,"./el.js":336,"./en-au":337,"./en-au.js":337,"./en-ca":338,"./en-ca.js":338,"./en-gb":339,"./en-gb.js":339,"./en-ie":340,"./en-ie.js":340,"./en-il":341,"./en-il.js":341,"./en-in":342,"./en-in.js":342,"./en-nz":343,"./en-nz.js":343,"./en-sg":344,"./en-sg.js":344,"./eo":345,"./eo.js":345,"./es":346,"./es-do":347,"./es-do.js":347,"./es-mx":348,"./es-mx.js":348,"./es-us":349,"./es-us.js":349,"./es.js":346,"./et":350,"./et.js":350,"./eu":351,"./eu.js":351,"./fa":352,"./fa.js":352,"./fi":353,"./fi.js":353,"./fil":354,"./fil.js":354,"./fo":355,"./fo.js":355,"./fr":356,"./fr-ca":357,"./fr-ca.js":357,"./fr-ch":358,"./fr-ch.js":358,"./fr.js":356,"./fy":359,"./fy.js":359,"./ga":360,"./ga.js":360,"./gd":361,"./gd.js":361,"./gl":362,"./gl.js":362,"./gom-deva":363,"./gom-deva.js":363,"./gom-latn":364,"./gom-latn.js":364,"./gu":365,"./gu.js":365,"./he":366,"./he.js":366,"./hi":367,"./hi.js":367,"./hr":368,"./hr.js":368,"./hu":369,"./hu.js":369,"./hy-am":370,"./hy-am.js":370,"./id":371,"./id.js":371,"./is":372,"./is.js":372,"./it":373,"./it-ch":374,"./it-ch.js":374,"./it.js":373,"./ja":375,"./ja.js":375,"./jv":376,"./jv.js":376,"./ka":377,"./ka.js":377,"./kk":378,"./kk.js":378,"./km":379,"./km.js":379,"./kn":380,"./kn.js":380,"./ko":381,"./ko.js":381,"./ku":382,"./ku.js":382,"./ky":383,"./ky.js":383,"./lb":384,"./lb.js":384,"./lo":385,"./lo.js":385,"./lt":386,"./lt.js":386,"./lv":387,"./lv.js":387,"./me":388,"./me.js":388,"./mi":389,"./mi.js":389,"./mk":390,"./mk.js":390,"./ml":391,"./ml.js":391,"./mn":392,"./mn.js":392,"./mr":393,"./mr.js":393,"./ms":394,"./ms-my":395,"./ms-my.js":395,"./ms.js":394,"./mt":396,"./mt.js":396,"./my":397,"./my.js":397,"./nb":398,"./nb.js":398,"./ne":399,"./ne.js":399,"./nl":400,"./nl-be":401,"./nl-be.js":401,"./nl.js":400,"./nn":402,"./nn.js":402,"./oc-lnc":403,"./oc-lnc.js":403,"./pa-in":404,"./pa-in.js":404,"./pl":405,"./pl.js":405,"./pt":406,"./pt-br":407,"./pt-br.js":407,"./pt.js":406,"./ro":408,"./ro.js":408,"./ru":409,"./ru.js":409,"./sd":410,"./sd.js":410,"./se":411,"./se.js":411,"./si":412,"./si.js":412,"./sk":413,"./sk.js":413,"./sl":414,"./sl.js":414,"./sq":415,"./sq.js":415,"./sr":416,"./sr-cyrl":417,"./sr-cyrl.js":417,"./sr.js":416,"./ss":418,"./ss.js":418,"./sv":419,"./sv.js":419,"./sw":420,"./sw.js":420,"./ta":421,"./ta.js":421,"./te":422,"./te.js":422,"./tet":423,"./tet.js":423,"./tg":424,"./tg.js":424,"./th":425,"./th.js":425,"./tk":426,"./tk.js":426,"./tl-ph":427,"./tl-ph.js":427,"./tlh":428,"./tlh.js":428,"./tr":429,"./tr.js":429,"./tzl":430,"./tzl.js":430,"./tzm":431,"./tzm-latn":432,"./tzm-latn.js":432,"./tzm.js":431,"./ug-cn":433,"./ug-cn.js":433,"./uk":434,"./uk.js":434,"./ur":435,"./ur.js":435,"./uz":436,"./uz-latn":437,"./uz-latn.js":437,"./uz.js":436,"./vi":438,"./vi.js":438,"./x-pseudo":439,"./x-pseudo.js":439,"./yo":440,"./yo.js":440,"./zh-cn":441,"./zh-cn.js":441,"./zh-hk":442,"./zh-hk.js":442,"./zh-mo":443,"./zh-mo.js":443,"./zh-tw":444,"./zh-tw.js":444};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=460},469:function(t,e,n){"use strict";n.r(e);var r={name:"Graphs",props:{datapoints:{type:Object,default:function(){}},liveData:{type:Array,default:function(){return[]}},initialLoading:{type:Boolean,default:!0},updating:{type:Boolean,default:!0},small:{type:Boolean,default:!1}}},o=(n(457),n(74)),l=n(99),c=n.n(l),d=n(499),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.datapoints?n("div",[n("LineGraphCard",{class:{kindle:t.small},attrs:{"initial-loading":t.initialLoading,lines:t.datapoints.hour,updating:t.updating,timeunit:"minute",title:"Letze Stunde",greyscale:t.small}}),t._v(" "),n("v-spacer"),t._v(" "),n("LineGraphCard",{class:{kindle:t.small},attrs:{"initial-loading":t.initialLoading,lines:t.datapoints.day,updating:t.updating,timeunit:"hour",title:"Letzter Tag",greyscale:t.small}}),t._v(" "),n("v-spacer"),t._v(" "),n("LineGraphCard",{class:{kindle:t.small},attrs:{"initial-loading":t.initialLoading,lines:t.datapoints.week,updating:t.updating,timeunit:"day",title:"Letze Woche",greyscale:t.small}})],1):t._e()])}),[],!1,null,"1e7804f2",null);e.default=component.exports;c()(component,{LineGraphCard:n(453).default}),c()(component,{VSpacer:d.a})},570:function(t,e,n){"use strict";n.r(e);var r,o=n(118),l=n(13),c=(n(79),n(47),n(52),n(17),n(30),n(56),n(43),n(20),n(57),n(71),n(48),n(62));function d(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){c=!0,o=t},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw o}}}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var j={data:function(){return{initialLoading:!0,datapoints:{},updateInterval:3e5,updating:!1,espHostname:"",devices:[],hostNames:[],liveData:[]}},mounted:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$utils.getHostnamesFromFirebase();case 2:t.devices=e.sent,t.hostNames=t.devices.map((function(t){return t.value})),n=d(t.hostNames);try{for(n.s();!(r=n.n()).done;)o=r.value,t.datapoints[o]=t.$localStorage.loadESPData(o)}catch(t){n.e(t)}finally{n.f()}t.espHostname=t.$localStorage.getESPSelect()||t.hostNames[0]||"",t.$localStorage.setESPSelect(t.espHostname),t.getDataWrapper(),t.subscribe(t.espHostname);case 10:case"end":return e.stop()}}),e)})))()},methods:{switchEsp:function(){this.$localStorage.setESPSelect(this.espHostname),this.getDataWrapper(),this.liveData=[],this.subscribe(this.espHostname)},getDataWrapper:function(){var t=this;this.updating||(this.updating=!0,this.$utils.getData({dates:this.$utils.getStartDates(this.espHostname),hostname:this.espHostname,datapoints:this.datapoints[this.espHostname]}).then((function(){t.initialLoading=!1,t.updating=!1})))},deleteLocalStorage:function(){this.$localStorage.deleteLocalStorage()},subscribe:function(t){var e=this;this.$apollo.subscribe({query:Object(c.a)(r||(r=Object(o.a)(["\n          subscription datapoint($hostname: String!) {\n            datapoint(hostname: $hostname) {\n              humidity\n              temperature\n              light\n              uploadedAt\n            }\n          }\n        "]))),variables:{hostname:t}}).subscribe({next:function(t){var data=t.data;data.datapoint.date=new Date(data.datapoint.uploadedAt),e.liveData.push(data.datapoint)}})}}},m=n(74),f=n(99),v=n.n(f),y=n(565),k=n(566),S=n(304),L=n(501),w=n(567),x=n(568),z=n(499),component=Object(m.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{justify:"center"}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{staticClass:"pt-0",attrs:{cols:"auto"}},[n("v-select",{staticStyle:{"max-width":"200px"},attrs:{items:t.devices},on:{change:t.switchEsp},model:{value:t.espHostname,callback:function(e){t.espHostname=e},expression:"espHostname"}})],1),t._v(" "),n("v-col",{staticClass:"pt-0",attrs:{cols:"auto"}},[n("v-btn",{attrs:{icon:"",color:"green",disabled:t.updating},on:{click:t.getDataWrapper}},[n("v-icon",[t._v("mdi-reload")])],1)],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-col",{staticClass:"pt-0",attrs:{cols:"auto"}},[n("v-btn",{attrs:{icon:"",color:"red"},on:{click:t.deleteLocalStorage}},[n("v-icon",[t._v("mdi-delete")])],1)],1)],1),t._v(" "),n("LineGraphCard",{attrs:{updating:t.liveData.length<=1,lines:t.liveData,timeunit:"second",title:"Live"}}),t._v(" "),n("Graphs",{attrs:{datapoints:t.datapoints[t.espHostname],"initial-loading":t.initialLoading,updating:t.updating}})],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{LineGraphCard:n(453).default,Graphs:n(469).default}),v()(component,{VBtn:y.a,VCol:k.a,VContainer:S.a,VIcon:L.a,VRow:w.a,VSelect:x.a,VSpacer:z.a})}}]);