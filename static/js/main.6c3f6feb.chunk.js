(this["webpackJsonpcorona-mask-market"]=this["webpackJsonpcorona-mask-market"]||[]).push([[0],{14:function(e,a,t){},16:function(e,a){},17:function(e,a){},21:function(e,a,t){e.exports=t(34)},34:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),m=t(15),i=t.n(m),r=(t(14),t(5));var l=function(){return c.a.createElement(c.a.Fragment,null,[{id:"seoul",idKR:"\uc11c\uc6b8",num:100},{id:"gyeonggi",idKR:"\uacbd\uae30",num:120},{id:"incheon",idKR:"\uc778\ucc9c",num:9},{id:"gangwon",idKR:"\uac15\uc6d0",num:25},{id:"chungnam",idKR:"\ucda9\ub0a8",num:90},{id:"chungbuk",idKR:"\ucda9\ubd81",num:15},{id:"sejong",idKR:"\uc138\uc885",num:1},{id:"daejeon",idKR:"\ub300\uc804",num:18},{id:"jeonbuk",idKR:"\uc804\ubd81",num:7},{id:"jeonnam",idKR:"\uc804\ub0a8",num:5},{id:"gwangju",idKR:"\uad11\uc8fc",num:13},{id:"kyeongbuk",idKR:"\uacbd\ubd81",num:984},{id:"kyeongnam",idKR:"\uacbd\ub0a8",num:77},{id:"daegu",idKR:"\ub300\uad6c",num:4693},{id:"ulsan",idKR:"\uc6b8\uc0b0",num:23},{id:"busan",idKR:"\ubd80\uc0b0",num:95},{id:"jeju",idKR:"\uc81c\uc8fc",num:4}].map((function(e){return c.a.createElement("div",{className:"city-common ".concat(e.id),key:e.id},e.idKR,c.a.createElement("div",{className:"num"},e.num))})))};var o=function(){var e=Object(n.useState)(0),a=Object(r.a)(e,2),t=a[0],m=a[1],i=Object(n.useState)(0),o=Object(r.a)(i,2),s=o[0],u=o[1],d=Object(n.useState)(0),f=Object(r.a)(d,2),E=f[0],v=f[1];return Object(n.useEffect)((function(){var e=setInterval((function(){t<6593&&m((function(e){return e+65.93}))}),10);return function(){return clearInterval(e)}}),[t]),Object(n.useEffect)((function(){var e=setInterval((function(){s<43&&u((function(e){return e+1}))}),10);return function(){return clearInterval(e)}}),[s]),Object(n.useEffect)((function(){var e=setInterval((function(){E<108&&v((function(e){return e+1}))}),10);return function(){return clearInterval(e)}}),[E]),c.a.createElement("div",null,c.a.createElement("section",null,c.a.createElement("div",{className:"home-img-section"},c.a.createElement("h1",null,"#\ucf54\ub85c\ub098 \ub9c8\uc2a4\ud06c \ub9c8\ucf13"))),c.a.createElement("section",{className:"infection-wrap"},c.a.createElement("div",{className:"infection-data"},c.a.createElement("div",{className:"infection-true"},"\ud655\uc9c4",c.a.createElement("div",{className:"infection-true-num"},Math.round(t))),c.a.createElement("div",{className:"infection-dead"},"\uc0ac\ub9dd",c.a.createElement("div",{className:"infection-dead-num"},s)),c.a.createElement("div",{className:"infection-false"},"\uaca9\ub9ac\ud574\uc81c",c.a.createElement("div",{className:"infection-false-num"},E))),c.a.createElement("div",{className:"map"},c.a.createElement(l,null))))},s=t(20);var u=function(){var e=14900,a="\ub9c8\ub9c8\uc2a4\ud06c \ubbf8\ub9c8 \ubbf8\uc138\uba3c\uc9c0 \ud669\uc0ac \ubcf4\uac74\uc6a9\ub9c8\uc2a4\ud06c 10\uac1c\uc785(KF94)",t=9,m="2020-03-07:13:58:00+0900",i=Object(n.useState)(new Date),l=Object(r.a)(i,2),o=l[0],u=l[1],d=Object(n.useState)(""),f=Object(r.a)(d,2),E=f[0],v=f[1];return Object(n.useEffect)((function(){var e=setInterval((function(){"00h 00m 00s"===E||"-"===E[1]?clearInterval(e):(!function(){var e=new Date(m);u(new Date);var a=e-o,t=Math.floor(a%864e5/36e5),n=Math.floor(a%36e5/6e4),c=Math.floor(a%6e4/1e3);v("".concat(t<10?"0".concat(t):t,"h ").concat(n<10?"0".concat(n):n,"m ").concat(c<10?"0".concat(c):c,"s"))}(),console.log(E[1]))}),1e3);return function(){return clearInterval(e)}}),[o,E]),c.a.createElement("div",null,c.a.createElement("section",null,c.a.createElement("div",{className:"timesale-section"},c.a.createElement("h1",null,"#\ud0c0\uc784\uc138\uc77c"),c.a.createElement("h3",{className:"timesale-section-text"},"\ud2b9\uc815 \uc2dc\uac04\uc5d0 \ub9de\ucdb0 \ub9c8\uc2a4\ud06c\ub97c \uad6c\ub9e4\ud574\ubcf4\uc138\uc694!"))),c.a.createElement("section",{className:"mask-section"},c.a.createElement("div",{className:"mask-wrap"},c.a.createElement("div",{className:"mask-img",title:"mask"}),c.a.createElement("div",{className:"item-details"},c.a.createElement("h3",{className:"item-price"},e,"\uc6d0"),c.a.createElement("h3",{className:"item-name"},a),c.a.createElement("h4",{className:"item-time"},"\ud310\ub9e4 \uc608\uc815 \uc2dc\uac04 : ",t<12?"\uc624\uc804 ".concat(t,"\uc2dc"):"\uc624\ud6c4 ".concat(t,"\uc2dc")))),"00h 00m 00s"!==E?c.a.createElement("h2",{className:"item-timer"},c.a.createElement(s.a,null)," ",E):c.a.createElement("h2",{className:"item-selling"},"\ud310\ub9e4\uc2dc\uc791")))},d=t(16),f=t.n(d);var E=function(){var e=Object(n.useState)(window.kakao),a=Object(r.a)(e,1)[0],t=document.getElementById("map"),m={center:new a.maps.LatLng(37.56667,126.98023),level:3,mapTypeId:a.maps.MapTypeId.ROADMAP},i=new a.maps.Map(t,m),l=new a.maps.ZoomControl;i.addControl(l,a.maps.ControlPosition.RIGHT),a.maps.event.addListener(i,"bounds_changed",(function(){var e="\uc9c0\ub3c4\uc758 \ub0a8\uc11c\ucabd, \ubd81\ub3d9\ucabd \uc601\uc5ed\uc88c\ud45c\ub294 "+i.getBounds().toString()+"\uc785\ub2c8\ub2e4.";console.log(e)}));var o=new a.maps.Marker({position:new a.maps.LatLng(37.56667,126.98023),map:i}),s=new a.maps.InfoWindow({content:'<div style="padding:5px;">\uc778\ud3ec\uc708\ub3c4\uc6b0 :D</div>'});return a.maps.event.addListener(o,"mouseover",function(e,a,t){return function(){t.open(e,a)}}(i,o,s)),a.maps.event.addListener(o,"mouseout",function(e){return function(){e.close()}}(s)),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{id:"map",style:{width:"100%",height:"350px"}}))},v=t(17),p=t.n(v),g=t(7),h=t(6);var N=function(){return c.a.createElement(g.a,null,c.a.createElement("div",{id:"fixed-bar"},c.a.createElement("div",{id:"fixed-bar-wrap"},c.a.createElement("div",{id:"logo-wrap"},c.a.createElement(g.b,{to:"/",id:"home-link"},c.a.createElement("img",{className:"logo-img",alt:"\ucf54\ub85c\ub098\ub9c8\uc2a4\ud06c\ub9c8\ucf13",src:"https://image.flaticon.com/icons/png/128/1033/1033165.png"}),c.a.createElement("div",{className:"logo-text"},"Corona Mask Market"))),c.a.createElement("div",{id:"category-wrap"},c.a.createElement("div",{className:"category"},c.a.createElement(g.b,{to:"/TimeSale",className:"glow"}," Time ")),c.a.createElement("div",{className:"category"},c.a.createElement(g.b,{to:"/RandomSale",className:"glow"}," Random ")),c.a.createElement("div",{className:"category"},c.a.createElement(g.b,{to:"/OfficialSale",className:"glow"}," Official ")),c.a.createElement("div",{className:"category"},c.a.createElement(g.b,{to:"/CheerKR",className:"glow"}," Support "))))),c.a.createElement(h.a,{path:"/",exact:!0,component:o}),c.a.createElement(h.a,{path:"/TimeSale",component:u}),c.a.createElement(h.a,{path:"/RandomSale",component:f.a}),c.a.createElement(h.a,{path:"/OfficialSale",component:E}),c.a.createElement(h.a,{path:"/CheerKR",component:p.a}),c.a.createElement("footer",{className:"footer"},"subin"))};i.a.render(c.a.createElement(N,null),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.6c3f6feb.chunk.js.map