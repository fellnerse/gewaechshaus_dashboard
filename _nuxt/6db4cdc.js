(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{157:function(t,e,n){"use strict";n.d(e,"a",(function(){return v}));var r=n(8);n(35),n(140),n(47);function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"day";return new Date(localStorage.getObject("".concat(t,"_").concat(e,"_date"))||0)}function c(t,e,n){localStorage.setObject("".concat(t,"_").concat(e,"_date"),n)}function l(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"esp0",e=localStorage.getObject(t)||{day:[],hour:[],week:[]},n=0,o=Object.entries(e);n<o.length;n++){var c=Object(r.a)(o[n],2),l=c[0],data=c[1];e[l]=data.map((function(a){return a.date=new Date(a.date),a}))}return e}function d(t,e){localStorage.setObject(e,t)}function f(t){localStorage.setItem("esp-select",t)}function h(){return localStorage.getItem("esp-select")}function m(){localStorage.clear()}function v(t,e){Storage.prototype.setObject=function(t,e){this.setItem(t,JSON.stringify(e))},Storage.prototype.getObject=function(t){var e=this.getItem(t);return e&&JSON.parse(e)},e("localStorage",{loadDate:o,loadESPData:l,setESPSelect:f,getESPSelect:h,setESPData:d,setDate:c,deleteLocalStorage:m})}},158:function(t,e,n){"use strict";n.d(e,"a",(function(){return y}));n(56),n(20),n(57),n(71);var r,o,c,l=n(118),d=n(8),f=(n(140),n(21),n(22),n(52),n(17),n(43),n(48),n(30),n(62));function h(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function v(a,b){return a>b?a:b}function y(t,e){e("utils",{getStartDates:function(e){return function(t,e){var n=e.$localStorage,r={},o=new Date(new Date-6048e5),c=n.loadDate(t,"week");r.week={start:o,load:v(o,c),second:1,minute:1,hour:24};var l=new Date(new Date-864e5),d=n.loadDate(t,"day");r.day={start:l,load:v(l,d),second:1,minute:4,hour:24};var f=new Date(new Date-36e5),h=n.loadDate(t,"hour");return r.hour={start:f,load:v(f,h),second:1,minute:60,hour:24},r}(e,t)},getHostnamesFromFirebase:function(){return t.app.apolloProvider.defaultClient.query({query:Object(f.a)(o||(o=Object(l.a)(["\n        query {\n          device {\n            text: name\n            value: hostname\n          }\n        }\n      "])))}).then((function(data){return data.data.device}))},getHostnameFromFirebase:function(e){return n=e,t.app.apolloProvider.defaultClient.query({query:Object(f.a)(c||(c=Object(l.a)(["\n        query device($hostname: String!) {\n          device(hostname: $hostname) {\n            text: name\n            value: hostname\n          }\n        }\n      "]))),variables:{hostname:n}}).then((function(data){return data.data.device[0]}));var n},getData:function(e){return function(t,e){for(var n=t.dates,o=t.hostname,c=t.datapoints,m=e.app,v=e.$localStorage,y=[],S=function(){var t=Object(d.a)(O[w],2),e=t[0],n=t[1],h=m.apolloProvider.defaultClient.query({query:Object(f.a)(r||(r=Object(l.a)(["\n          query datapoint(\n            $start: DateTime!\n            $hostname: String!\n            $second: Int!\n            $minute: Int!\n            $hour: Int!\n          ) {\n            datapoint(\n              filter: {\n                start: $start\n                hostname: $hostname\n                second: $second\n                minute: $minute\n                hour: $hour\n              }\n              orderBy: { uploadedAt: asc }\n            ) {\n              temperature\n              humidity\n              light\n              uploadedAt\n            }\n          }\n        "]))),variables:{start:n.load,second:n.second,minute:n.minute,hour:n.hour,hostname:o}}).then((function(t){t.data.datapoint.forEach((function(t){t.date=new Date(t.uploadedAt),c[e].push(t)}));var r=t.data.datapoint.length;if(console.log(o+" added "+e+": "+r),r)return c[e]=c[e].filter((function(t){return t.date>n.start})),{hostname:o,name:e,date:c[e].slice(-1)[0].date}}));y.push(h)},w=0,O=Object.entries(n);w<O.length;w++)S();return Promise.all(y).then((function(t){try{v.setESPData(c,o);var e,n=h(t);try{for(n.s();!(e=n.n()).done;){var r=e.value,l=r.hostname,d=r.name,f=r.date;v.setDate(l,d,f)}}catch(t){n.e(t)}finally{n.f()}}catch(t){console.log("No Space left")}}))}(e,t)}})}},198:function(t,e,n){var content=n(259);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("6570a8f6",content,!0,{sourceMap:!1})},218:function(t,e,n){"use strict";var r={data:function(){return{drawer:!1,group:null}}},o=n(74),c=n(99),l=n.n(c),d=n(303),f=n(304),h=n(305),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",{attrs:{dark:""}},[e("v-main",[e("v-container",[e("nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;l()(component,{VApp:d.a,VContainer:f.a,VMain:h.a})},232:function(t,e,n){n(233),t.exports=n(234)},258:function(t,e,n){"use strict";n(198)},259:function(t,e,n){var r=n(65)(!1);r.push([t.i,"h1[data-v-495dc2cf]{font-size:20px}",""]),t.exports=r},61:function(t,e,n){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(n(258),n(74)),c=n(99),l=n.n(c),d=n(303),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[404===t.error.statusCode?n("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):n("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),n("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"495dc2cf",null);e.a=component.exports;l()(component,{VApp:d.a})}},[[232,11,3,12]]]);