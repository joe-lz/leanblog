(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{Qk2m:function(e,n,t){e.exports={container:"Layout_container__3k3Im",body:"Layout_body__1jffz",footer_content:"Layout_footer_content__2w_tK",logo:"Layout_logo__x1539",copyright:"Layout_copyright__1o4l6"}},dYpt:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/blog/manage",function(){return t("gsPH")}])},gsPH:function(e,n,t){"use strict";t.r(n);var o=t("q1tI"),a=t.n(o),r=(t("8Kt/"),t("xy40"),t("a6RD"),t("jhxP")),i=a.a.createElement;n.default=function(){return i(r.a,null,i("div",{className:"manage"},i("p",{className:"_admin_body_section_title"},"\u52a8\u6001\u7ba1\u7406"),i("div",{className:"_admin_body_section_block",style:{padding:30}})))}},jhxP:function(e,n,t){"use strict";var o=t("o0o1"),a=t.n(o),r=t("8Kt/"),i=t.n(r),c=(t("YFqc"),t("q1tI")),s=t.n(c),u=t("xy40"),l=t.n(u),d=t("a6RD"),f=t.n(d),m=t("je4i"),_=t.n(m),b=t("Qk2m"),p=t.n(b),y=t("Ruh/"),h=t("mhur"),g=s.a.createElement,w=f()((function(){return Promise.all([t.e(0),t.e(5),t.e(6),t.e(7),t.e(50)]).then(t.bind(null,"vwdz"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["vwdz"]},modules:["src/components/admin/Nav"]}}),N=f()((function(){return Promise.all([t.e(0),t.e(5),t.e(8),t.e(12),t.e(49)]).then(t.bind(null,"2Ts+"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["2Ts+"]},modules:["src/components/admin/Login"]}}),v=f()((function(){return Promise.all([t.e(12),t.e(16),t.e(51)]).then(t.bind(null,"zt1u"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["zt1u"]},modules:["src/components/admin/BodyContent"]}});function j(e){var n=Object(c.useState)(l.a.User.current()),t=n[0],o=(n[1],Object(c.useState)(null)),r=o[0],s=o[1],u=Object(c.useState)(null),d=u[0],f=u[1];return Object(c.useEffect)((function(){Object(y.b)().then((function(e){e?f(e):Object(y.a)().then((function(e){f(e)}))})),t&&function e(){var n,o;return a.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,a.a.awrap(Object(h.a)());case 2:(n=r.sent)?s(n):((o=new l.a.Object("CMS_UserInfo")).set("user",t),o.set("nickname",t.toJSON().username),o.set("priority",1),o.set("shortid",_.a.generate()),o.save().then((function(n){e()}),(function(e){})));case 4:case"end":return r.stop()}}),null,null,null,Promise)}()}),[]),Object(c.useEffect)((function(){e.onChange&&e.onChange({curUser:t,profile:d,userinfo:r})}),[t,d,r]),g("div",{className:p.a.container},g(i.a,null,g("title",null,"\u7ba1\u7406\u540e\u53f0")),g(w,{type:"login",curUser:t,userinfo:r,profile:d}),g("div",{className:p.a.body,style:e.bodyStyle},!t&&g(N,{profile:d}),t&&g(v,{priority:r?r.toJSON().priority:0,userinfo:r,hideSidebar:e.hideSidebar},e.children)),d&&g("footer",null,g("div",{className:p.a.footer_content},g("img",{src:d.toJSON().logo,alt:"",className:p.a.logo}),g("p",{className:p.a.copyright},d.toJSON().copyright))))}j.defaultProps={onChange:function(){},hideSidebar:!1,bodyStyle:{}},n.a=j}},[["dYpt",1,0,3,2,4]]]);