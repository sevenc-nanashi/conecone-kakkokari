// ==UserScript==
// @name コネコネ（仮）
// @description ニコニコ（Re:仮）の補助ツール。
// @version 0.2.3
// @homepage https://github.com/sevenc-nanashi/conecone-kakkokari
// @match https://www.nicovideo.jp/*
// @updateURL https://raw.githubusercontent.com/sevenc-nanashi/conecone-kakkokari/built/index.user.js
// @downloadURL https://raw.githubusercontent.com/sevenc-nanashi/conecone-kakkokari/built/index.user.js
// @sandbox MAIN_WORLD
// ==/UserScript==

"use strict";(()=>{var f={name:"conecone-kakkokari",module:"index.ts",version:"0.2.3",homepage:"https://github.com/sevenc-nanashi/conecone-kakkokari",scripts:{build:"bun run ./build.ts"},type:"module",devDependencies:{"@types/bun":"latest","@types/tampermonkey":"^5.0.3",esbuild:"^0.21.5",sass:"^1.77.5"},peerDependencies:{typescript:"^5.0.0"},dependencies:{"@mdi/js":"^7.4.47",clsx:"^2.1.1","esbuild-sass-plugin":"^3.3.1","vanjs-core":"^1.5.0"}};var v=Object.getPrototypeOf,u,k,n,S,D={isConnected:1},L1=1e3,s,y={},M1=v(D),E=v(v),x,W=(C,V,L,H)=>(C??(setTimeout(L,H),new Set)).add(V),N=(C,V,L)=>{let H=n;n=V;try{return C(L)}catch(M){return console.error(M),L}finally{n=H}},O=C=>C.filter(V=>V._dom?.isConnected),I=C=>s=W(s,C,()=>{for(let V of s)V._bindings=O(V._bindings),V._listeners=O(V._listeners);s=x},L1),h={get val(){return n?._getters?.add(this),this.rawVal},get oldVal(){return n?._getters?.add(this),this._oldVal},set val(C){n?._setters?.add(this),C!==this.rawVal&&(this.rawVal=C,this._bindings.length+this._listeners.length?(k?.add(this),u=W(u,this,e1)):this._oldVal=C)}},G=C=>({__proto__:h,rawVal:C,_oldVal:C,_bindings:[],_listeners:[]}),c=(C,V)=>{let L={_getters:new Set,_setters:new Set},H={f:C},M=S;S=[];let r=N(C,L,V);r=(r??document).nodeType?r:new Text(r);for(let e of L._getters)L._setters.has(e)||(I(e),e._bindings.push(H));for(let e of S)e._dom=r;return S=M,H._dom=r},B=(C,V=G(),L)=>{let H={_getters:new Set,_setters:new Set},M={f:C,s:V};M._dom=L??S?.push(M)??D,V.val=N(C,H,V.rawVal);for(let r of H._getters)H._setters.has(r)||(I(r),r._listeners.push(M));return V},Q=(C,...V)=>{for(let L of V.flat(1/0)){let H=v(L??0),M=H===h?c(()=>L.val):H===E?c(L):L;M!=x&&C.append(M)}return C},U=(C,V,...L)=>{let[H,...M]=v(L[0]??0)===M1?L:[{},...L],r=C?document.createElementNS(C,V):document.createElement(V);for(let[e,A]of Object.entries(H)){let m=p=>p?Object.getOwnPropertyDescriptor(p,e)??m(v(p)):x,t=V+","+e,i=y[t]??(y[t]=m(v(r))?.set??0),d=e.startsWith("on")?(p,g)=>{let a=e.slice(2);r.removeEventListener(a,g),r.addEventListener(a,p)}:i?i.bind(r):r.setAttribute.bind(r,e),l=v(A??0);e.startsWith("on")||l===E&&(A=B(A),l=h),l===h?c(()=>(d(A.val,A._oldVal),r)):d(A)}return Q(r,...M)},R=C=>({get:(V,L)=>U.bind(x,C,L)}),r1=new Proxy(C=>new Proxy(U,R(C)),R()),z=(C,V)=>V?V!==C&&C.replaceWith(V):C.remove(),e1=()=>{let C=0,V=[...u].filter(H=>H.rawVal!==H._oldVal);do{k=new Set;for(let H of new Set(V.flatMap(M=>M._listeners=O(M._listeners))))B(H.f,H.s,H._dom),H._dom=x}while(++C<100&&(V=[...k]).length);let L=[...u].filter(H=>H.rawVal!==H._oldVal);u=x;for(let H of new Set(L.flatMap(M=>M._bindings=O(M._bindings))))z(H._dom,c(H.f,H._dom)),H._dom=x;for(let H of L)H._oldVal=H.rawVal},A1=(C,V)=>z(C,c(V,C)),o={add:Q,tags:r1,state:G,derive:B,hydrate:A1};var{div:K,h2:t1,p:i1,textarea:o1,button:a1}=o.tags,d1=["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],q=()=>{if(!location.pathname.startsWith("/watch_tmp/"))return;console.log("Injecting: NG list");let C=window.fetch,V=async(...L)=>{let H=L[0],M=L[1],r=await C.apply(void 0,L);if(!(typeof H=="string"&&H.includes("/v1/tmp/comments")&&M&&(M.method?.toUpperCase()||"GET")==="GET"))return r;let e=await r.json(),A=e.data.comments,m=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],t=A.filter(i=>!m.some(d=>i.message.includes(d)));return new Response(JSON.stringify({...e,data:{comments:t}}),{status:r.status,statusText:r.statusText,headers:r.headers})};window.fetch=V,globalThis.fetch=V},P=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),P();return}for(;;){await new Promise(t=>requestAnimationFrame(t));let C=document.querySelector(".mainSection");if(!C)continue;let V=C.querySelector(".playerContainer");if(!V)continue;let L=o.state(!1),H=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):d1,M=o1({style:()=>`
      width: 100%;
      color: #000;
      height: 10rem;
      background-color: #fff;
      `,onkeydown:t=>{t.stopPropagation()},value:H.join(`
`)}),r=K({style:()=>`
        position: absolute;
        display: ${L.val?"flex":"none"};
        flex-direction: column;
        gap: 0.5rem;
        color: #fff;
        right: 1rem;
        bottom: calc(1rem + 48px);
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
          `,onclick:()=>{let i=M.value.split(`
`).filter(d=>d);localStorage.setItem("ngList",JSON.stringify(i)),console.log("Saved NG list:",i),location.reload()}},"\u4FDD\u5B58"));o.add(V,r);let e=C.querySelector(".actionBar");if(!e)throw new Error("Failed to find action bar");let A=e.querySelector(".grow_1");if(!A)throw new Error("Failed to find grow");let m=K({className:"h_24px text_#fff cursor_pointer",style:`
        font-size: 14px
        `,onclick:()=>{console.log("Clicked"),L.val=!L.val}},"NG");e.insertBefore(m,A.nextSibling);break}}};function _(C){var V,L,H="";if(typeof C=="string"||typeof C=="number")H+=C;else if(typeof C=="object")if(Array.isArray(C)){var M=C.length;for(V=0;V<M;V++)C[V]&&(L=_(C[V]))&&(H&&(H+=" "),H+=L)}else for(L in C)C[L]&&(H&&(H+=" "),H+=L);return H}function p1(){for(var C,V,L=0,H="",M=arguments.length;L<M;L++)(C=arguments[L])&&(V=_(C))&&(H&&(H+=" "),H+=V);return H}var j=p1;var X="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z",J="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z";var Y=`.fullScreenCommentBar {
  display: none;
}

[data-iphone=true] .fullScreenCommentBar {
  display: none !important;
}

.fullScreen .playerContainer {
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

.mainSection {
  container: player/inline-size;
}

@container (max-width: 40rem) {
  .volume {
    display: none;
  }
  .currentTime {
    display: none;
  }
}`;var{style:v1}=o.tags,w=!1,T=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(console.log("Injecting: Styles"),!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),T();return}for(;;){if(await new Promise(d=>requestAnimationFrame(d)),!document.querySelector("header"))continue;let V=document.querySelector("div.fs_12.font_alnum");if(!V)continue;V.classList.add("currentTime");let L=document.querySelector(".w_var\\(--player-width\\)");if(!L)throw new Error("Player not found");let H=L.firstElementChild;w=H.style.display==="grid"&&H.childElementCount===2,console.log("Comment panel installed:",w);let[M,r]=Array.from(w?L.firstElementChild.firstElementChild.children:L.children),[e,A,m,t]=Array.from(M.children);L.classList.add("mainSection"),M.classList.add("playerContainer"),r.classList.add("commentBar"),e.classList.add("videoPlayer"),m.classList.add("seekBar"),t.classList.add("actionBar");let i=document.querySelector(".w_80px.bg_\\#555");if(!i)throw new Error("Volume not found");i.classList.add("volume"),navigator.userAgent.includes("iPhone")&&document.body.setAttribute("data-iphone","true"),o.add(document.head,v1(Y));break}}};var{form:l1,input:$,button:C1}=o.tags,{path:H1,svg:Z1}=o.tags("http://www.w3.org/2000/svg"),F=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(console.log("Injecting: Fullscreen"),!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),F();return}for(;;){await new Promise(a=>requestAnimationFrame(a));let C=document.querySelector(".playerContainer"),V=document.querySelector(".videoPlayer"),L=document.querySelector(".actionBar"),H=document.querySelector(".commentBar");if(!C||!V||!L||!H)continue;let M=()=>{A.val?document.exitFullscreen():C.requestFullscreen()},r=null,e=()=>{r&&window.clearTimeout(r),document.body.setAttribute("data-activated","true"),r=window.setTimeout(()=>{document.body.setAttribute("data-activated","false")},5e3)};document.addEventListener("mouseover",e),V.addEventListener("click",e);let A=o.state(!1);window.addEventListener("fullscreenchange",()=>{document.fullscreenElement?(A.val=!0,document.body.classList.add("fullScreen")):(A.val=!1,document.body.classList.remove("fullScreen"))});let m=C1({classList:j(["w_24px","h_24px","fill_#fff","cursor_pointer","[&_svg]:w_24px","[&_svg]:h_24px","[&_svg]:fill_#fff","[&_svg]:cursor_pointer"]),onclick:M},Z1({width:"24",height:"24",viewBox:"4 4 16 16"},()=>A.val?H1({d:J}):H1({d:X}))),[t,i]=Array.from(H.querySelectorAll("input")),d=i.parentElement.nextElementSibling;if(!d)throw new Error("Post button not found");let l=$({type:"text",placeholder:"\u30B3\u30DE\u30F3\u30C9",style:()=>`
        background-color: #fff;
        color: #000;
        border-radius: 0;
        -webkit-appearance: none;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border: 2px solid #ccc;
        `,oninput:a=>{let Z=a;t.value=Z.target.value}}),p=$({type:"text",placeholder:"\u30B3\u30E1\u30F3\u30C8",style:()=>`
        background-color: #fff;
        color: #000;
        border-radius: 0;
        -webkit-appearance: none;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
        `,oninput:a=>{let Z=a;i.value=Z.target.value}}),g=l1({classList:"fullScreenCommentBar",onsubmit:a=>{a.preventDefault(),l.value="",p.value="",d.click()}},l,p,C1({style:()=>`
          background-color: #007cff;
          color: #fff;
          cursor: pointer;
          border-radius: 0;
          -webkit-appearance: none;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          `,type:"submit"},"\u6295\u7A3F"));o.add(L,m),o.add(L,g),C.addEventListener("keydown",a=>{let Z=a;Z.target?.tagName!=="INPUT"&&Z.key==="f"&&M()});break}}};var b=async()=>{if(location.pathname.startsWith("/watch_tmp/")&&!(navigator.maxTouchPoints<2)){if(!document.body){await new Promise(C=>window.addEventListener("DOMContentLoaded",C)),b();return}for(console.log("Injecting: Double Tap");;){await new Promise(V=>requestAnimationFrame(V));let C=document.querySelector(".videoPlayer");if(C){C.addEventListener("dblclick",V=>{let L=V,H=new KeyboardEvent("keydown",{keyCode:L.offsetX<C.clientWidth/2?37:39,bubbles:!0,cancelable:!0});document.body.dispatchEvent(H)}),C.addEventListener("click",V=>{let H=V.offsetX;if(!(C.clientWidth*.4<H&&H<C.clientWidth*.6))return;let M=new KeyboardEvent("keydown",{keyCode:32,bubbles:!0,cancelable:!0});document.body.dispatchEvent(M)});break}}}};console.log(`%c== \u30B3\u30CD\u30B3\u30CD\uFF08\u4EEE\uFF09 ========================================
  %c\u30CB\u30B3\u30CB\u30B3\uFF08Re:\u4EEE\uFF09\u306E\u88DC\u52A9\u30C4\u30FC\u30EB\u3002
  %cVersion: %cv${f.version}
  Developed by %cNanashi.
  %c${f.homepage}
----------------------------------------------------------
`,"color: #18b4e6","color: auto","color: #18b4e6","color: auto","color: #48b0d5","color: #18b4e6");T();for(let C of[q]){let V=document.createElement("script");V.textContent=`(${C.toString()})()`,document.body.appendChild(V)}P();F();b();})();
