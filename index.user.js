// ==UserScript==
// @name コネコネ（仮）
// @description ニコニコ（Re:仮）の補助ツール。
// @version 0.1.1
// @homepage https://github.com/sevenc-nanashi/conecone-kakkokari
// @match https://www.nicovideo.jp/*
// @updateURL https://raw.githubusercontent.com/sevenc-nanashi/conecone-kakkokari/built/index.user.js
// @downloadURL https://raw.githubusercontent.com/sevenc-nanashi/conecone-kakkokari/built/index.user.js
// @sandbox MAIN_WORLD
// ==/UserScript==

"use strict";(()=>{var k={name:"conecone-kakkokari",module:"index.ts",version:"0.1.1",homepage:"https://github.com/sevenc-nanashi/conecone-kakkokari",scripts:{build:"bun run ./build.ts"},type:"module",devDependencies:{"@types/bun":"latest","@types/tampermonkey":"^5.0.3",esbuild:"^0.21.5",sass:"^1.77.5"},peerDependencies:{typescript:"^5.0.0"},dependencies:{"@mdi/js":"^7.4.47",clsx:"^2.1.1","esbuild-sass-plugin":"^3.3.1","vanjs-core":"^1.5.0"}};var v=Object.getPrototypeOf,u,B,n,S,D={isConnected:1},L1=1e3,h,y={},M1=v(D),E=v(v),x,W=(C,H,L,V)=>(C??(setTimeout(L,V),new Set)).add(H),N=(C,H,L)=>{let V=n;n=H;try{return C(L)}catch(M){return console.error(M),L}finally{n=V}},g=C=>C.filter(H=>H._dom?.isConnected),I=C=>h=W(h,C,()=>{for(let H of h)H._bindings=g(H._bindings),H._listeners=g(H._listeners);h=x},L1),f={get val(){return n?._getters?.add(this),this.rawVal},get oldVal(){return n?._getters?.add(this),this._oldVal},set val(C){n?._setters?.add(this),C!==this.rawVal&&(this.rawVal=C,this._bindings.length+this._listeners.length?(B?.add(this),u=W(u,this,e1)):this._oldVal=C)}},G=C=>({__proto__:f,rawVal:C,_oldVal:C,_bindings:[],_listeners:[]}),c=(C,H)=>{let L={_getters:new Set,_setters:new Set},V={f:C},M=S;S=[];let r=N(C,L,H);r=(r??document).nodeType?r:new Text(r);for(let e of L._getters)L._setters.has(e)||(I(e),e._bindings.push(V));for(let e of S)e._dom=r;return S=M,V._dom=r},P=(C,H=G(),L)=>{let V={_getters:new Set,_setters:new Set},M={f:C,s:H};M._dom=L??S?.push(M)??D,H.val=N(C,V,H.rawVal);for(let r of V._getters)V._setters.has(r)||(I(r),r._listeners.push(M));return H},Q=(C,...H)=>{for(let L of H.flat(1/0)){let V=v(L??0),M=V===f?c(()=>L.val):V===E?c(L):L;M!=x&&C.append(M)}return C},U=(C,H,...L)=>{let[V,...M]=v(L[0]??0)===M1?L:[{},...L],r=C?document.createElementNS(C,H):document.createElement(H);for(let[e,A]of Object.entries(V)){let i=p=>p?Object.getOwnPropertyDescriptor(p,e)??i(v(p)):x,o=H+","+e,a=y[o]??(y[o]=i(v(r))?.set??0),d=e.startsWith("on")?(p,s)=>{let O=e.slice(2);r.removeEventListener(O,s),r.addEventListener(O,p)}:a?a.bind(r):r.setAttribute.bind(r,e),l=v(A??0);e.startsWith("on")||l===E&&(A=P(A),l=f),l===f?c(()=>(d(A.val,A._oldVal),r)):d(A)}return Q(r,...M)},R=C=>({get:(H,L)=>U.bind(x,C,L)}),r1=new Proxy(C=>new Proxy(U,R(C)),R()),z=(C,H)=>H?H!==C&&C.replaceWith(H):C.remove(),e1=()=>{let C=0,H=[...u].filter(V=>V.rawVal!==V._oldVal);do{B=new Set;for(let V of new Set(H.flatMap(M=>M._listeners=g(M._listeners))))P(V.f,V.s,V._dom),V._dom=x}while(++C<100&&(H=[...B]).length);let L=[...u].filter(V=>V.rawVal!==V._oldVal);u=x;for(let V of new Set(L.flatMap(M=>M._bindings=g(M._bindings))))z(V._dom,c(V.f,V._dom)),V._dom=x;for(let V of L)V._oldVal=V.rawVal},A1=(C,H)=>z(C,c(H,C)),t={add:Q,tags:r1,state:G,derive:P,hydrate:A1};var{div:K,h2:t1,p:i1,textarea:o1,button:a1}=t.tags,d1=["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],q=()=>{if(!location.pathname.startsWith("/watch_tmp/"))return;console.log("Injecting: NG list");let C=window.fetch,H=async(...L)=>{let V=L[0],M=L[1],r=await C.apply(void 0,L);if(!(typeof V=="string"&&V.includes("/v1/tmp/comments")&&M&&(M.method?.toUpperCase()||"GET")==="GET"))return r;let e=await r.json(),A=e.data.comments,i=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],o=A.filter(a=>!i.some(d=>a.message.includes(d)));return new Response(JSON.stringify({...e,data:{comments:o}}),{status:r.status,statusText:r.statusText,headers:r.headers})};window.fetch=H,globalThis.fetch=H},w=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),w();return}for(;;){await new Promise(o=>requestAnimationFrame(o));let C=document.querySelector(".playerContainer");if(!C)continue;let H=C.querySelector(".innerPlayer");if(!H)throw new Error("Failed to find inner player");let L=t.state(!1),V=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):d1,M=o1({style:()=>`
      width: 100%;
      color: #000;
      height: 10rem;
      background-color: #fff;
      `,onkeydown:o=>{o.stopPropagation()},value:V.join(`
`)}),r=K({style:()=>`
        position: absolute;
        display: ${L.val?"flex":"none"};
        flex-direction: column;
        gap: 0.5rem;
        color: #fff;
        right: 1rem;
        bottom: 1rem;
        padding: 1rem;
        background-color: #252525;
        z-index: 1000;
        `,classList:"ngDashboard"},t1({style:()=>`
          font-size: 1.5rem;
          `},"NG\u30EA\u30B9\u30C8"),i1("1\u884C\u306B1\u3064\u306ENG\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"),M,a1({style:()=>`
          width: 100%;
          height: 2rem;
          background-color: #fff;
          color: #252525;
          cursor: pointer;
          `,onclick:()=>{let a=M.value.split(`
`).filter(d=>d);localStorage.setItem("ngList",JSON.stringify(a)),console.log("Saved NG list:",a),location.reload()}},"\u4FDD\u5B58"));t.add(H,r);let e=C.querySelector(".bg_\\#252525");if(!e)throw new Error("Failed to find action bar");let A=e.querySelector(".grow_1");if(!A)throw new Error("Failed to find grow");let i=K({className:"h_24px text_#fff cursor_pointer",style:`
        font-size: 14px
        `,onclick:()=>{console.log("Clicked"),L.val=!L.val}},"NG");e.insertBefore(i,A.nextSibling);break}}};function _(C){var H,L,V="";if(typeof C=="string"||typeof C=="number")V+=C;else if(typeof C=="object")if(Array.isArray(C)){var M=C.length;for(H=0;H<M;H++)C[H]&&(L=_(C[H]))&&(V&&(V+=" "),V+=L)}else for(L in C)C[L]&&(V&&(V+=" "),V+=L);return V}function p1(){for(var C,H,L=0,V="",M=arguments.length;L<M;L++)(C=arguments[L])&&(H=_(C))&&(V&&(V+=" "),V+=H);return V}var j=p1;var X="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z",J="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z";var{form:v1,input:Y,button:$}=t.tags,{path:C1,svg:x1}=t.tags("http://www.w3.org/2000/svg"),T=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(console.log("Injecting: Fullscreen"),!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),T();return}for(;;){await new Promise(m=>requestAnimationFrame(m));let C=document.querySelector(".w_var\\(--player-width\\)");if(!C)continue;let H=C.children[0],[L,V,M]=Array.from(H.children),r=()=>{i.val?document.exitFullscreen():H.requestFullscreen()},e=null,A=()=>{e&&window.clearTimeout(e),document.body.setAttribute("data-activated","true"),e=window.setTimeout(()=>{document.body.setAttribute("data-activated","false")},5e3)};document.addEventListener("mouseover",A),L.addEventListener("click",A),H.addEventListener("keydown",m=>{let Z=m;Z.target?.tagName!=="INPUT"&&Z.key==="f"&&r()});let i=t.state(!1);window.addEventListener("fullscreenchange",()=>{document.fullscreenElement===H?(i.val=!0,document.body.classList.add("fullScreen")):(i.val=!1,document.body.classList.remove("fullScreen"))});let o=$({classList:j(["w_24px","h_24px","fill_#fff","cursor_pointer","[&_svg]:w_24px","[&_svg]:h_24px","[&_svg]:fill_#fff","[&_svg]:cursor_pointer"]),onclick:r},x1({width:"24",height:"24",viewBox:"4 4 16 16"},()=>i.val?C1({d:J}):C1({d:X}))),a=C.querySelector('input[placeholder="\u30B3\u30DE\u30F3\u30C9"]');if(!a)throw new Error("Command input not found");let d=C.querySelector('input[placeholder="\u30B3\u30E1\u30F3\u30C8"]');if(!d)throw new Error("Comment input not found");let l=d.nextElementSibling;if(!l)throw new Error("Post button not found");let p=Y({type:"text",placeholder:"\u30B3\u30DE\u30F3\u30C9",style:()=>`
        background-color: #fff;
        color: #000;
        border-radius: 0;
        -webkit-appearance: none;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border: 2px solid #ccc;
        `,oninput:m=>{let Z=m;a.value=Z.target.value}}),s=Y({type:"text",placeholder:"\u30B3\u30E1\u30F3\u30C8",style:()=>`
        background-color: #fff;
        color: #000;
        border-radius: 0;
        -webkit-appearance: none;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
        `,oninput:m=>{let Z=m;d.value=Z.target.value}}),O=v1({classList:"fullScreenCommentBar",onsubmit:m=>{m.preventDefault(),p.value="",s.value="",l.click()}},p,s,$({style:()=>`
          background-color: #007cff;
          color: #fff;
          cursor: pointer;
          border-radius: 0;
          -webkit-appearance: none;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          `,type:"submit"},"\u6295\u7A3F"));t.add(M,o),t.add(M,O);break}}};var H1=`.fullScreenCommentBar {
  display: none;
}

[data-iphone=true] .fullScreenCommentBar {
  display: none !important;
}

.fullScreen .innerPlayer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.fullScreen .videoPlayer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fullScreen .seekBar {
  position: absolute;
  width: 100%;
  bottom: 48px;
}
.fullScreen .actionBar {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.fullScreen .fullScreenCommentBar {
  display: grid;
  position: absolute;
  left: 50%;
  bottom: 8px;
  grid-template-columns: 6rem 30vw 4rem;
  transform: translateX(-50%);
  height: 32px;
}
@media (max-width: 1150px) {
  .fullScreen .fullScreenCommentBar {
    bottom: 64px;
    grid-template-columns: 4rem 50vw 4rem;
  }
}
.fullScreen .fullScreenCommentBar > * {
  padding: 0 0.5rem;
}
.fullScreen[data-activated=true] .seekBar,
.fullScreen[data-activated=true] .actionBar {
  opacity: 1;
}
.fullScreen[data-activated=false] .seekBar,
.fullScreen[data-activated=false] .actionBar {
  opacity: 0;
  transition: opacity 0.5s;
}
.fullScreen .ngDashboard {
  bottom: calc(1rem + 48px) !important;
}

.playerContainer {
  container: player/inline-size;
}

@container (max-width: 40rem) {
  .volume {
    display: none;
  }
  .currentTime {
    display: none;
  }
}`;var{style:Z1}=t.tags,F=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(console.log("Injecting: Styles"),!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),F();return}for(;;){if(await new Promise(A=>requestAnimationFrame(A)),!document.querySelector("header"))continue;let H=document.querySelector(".w_var\\(--player-width\\)");if(!H)throw new Error("Player not found");let L=H.children[0],[V,M,r]=Array.from(L.children);H.classList.add("playerContainer"),L.classList.add("innerPlayer"),V.classList.add("videoPlayer"),M.classList.add("seekBar"),r.classList.add("actionBar");let e=document.querySelector(".w_80px.bg_\\#555.ssOnly\\:d_none");if(!e)throw new Error("Volume not found");e.classList.add("volume"),navigator.userAgent.includes("iPhone")&&document.body.setAttribute("data-iphone","true"),t.add(document.head,Z1(H1));break}for(;;){await new Promise(H=>requestAnimationFrame(H));let C=document.querySelector("div.fs_12.font_alnum");if(C){C.classList.add("currentTime");break}}}};var b=async()=>{if(location.pathname.startsWith("/watch_tmp/")&&!(navigator.maxTouchPoints<2)){if(!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),b();return}for(console.log("Injecting: Double Tap");;){await new Promise(H=>requestAnimationFrame(H));let C=document.querySelector(".videoPlayer");if(C){C.addEventListener("dblclick",H=>{let L=H,V=new KeyboardEvent("keydown",{keyCode:L.offsetX<C.clientWidth/2?37:39,bubbles:!0,cancelable:!0});document.body.dispatchEvent(V)}),C.addEventListener("click",H=>{let V=H.offsetX;if(!(C.clientWidth*.4<V&&V<C.clientWidth*.6))return;let M=new KeyboardEvent("keydown",{keyCode:32,bubbles:!0,cancelable:!0});document.body.dispatchEvent(M)});break}}}};console.log(`%c== \u30B3\u30CD\u30B3\u30CD\uFF08\u4EEE\uFF09 ========================================
  %c\u30CB\u30B3\u30CB\u30B3\uFF08Re:\u4EEE\uFF09\u306E\u88DC\u52A9\u30C4\u30FC\u30EB\u3002
  %cVersion: %cv${k.version}
  Developed by %cNanashi.
  %c${k.homepage}
----------------------------------------------------------
`,"color: #18b4e6","color: auto","color: #18b4e6","color: auto","color: #48b0d5","color: #18b4e6");for(let C of[q]){let H=document.createElement("script");H.textContent=`(${C.toString()})()`,document.body.appendChild(H)}F();w();T();b();})();
