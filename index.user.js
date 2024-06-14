// ==UserScript==
// @name コネコネ（仮）
// @description ニコニコ（Re:仮）の補助ツール。
// @version v0.0.1
// @homepage https://github.com/sevenc-nanashi/conecone-kakkokari
// @match https://www.nicovideo.jp/*
// @updateURL https://sevenc7c.com/conecone-kakkokari/index.user.js
// @downloadURL https://sevenc7c.com/conecone-kakkokari/index.user.js
// @sandbox MAIN_WORLD
// ==/UserScript==

"use strict";(()=>{var x={name:"conecone-kakkokari",module:"index.ts",version:"0.0.1",homepage:"https://github.com/sevenc-nanashi/conecone-kakkokari",scripts:{build:"bun run ./build.ts"},type:"module",devDependencies:{"@types/bun":"latest","@types/tampermonkey":"^5.0.3",esbuild:"^0.21.5"},peerDependencies:{typescript:"^5.0.0"},dependencies:{"vanjs-core":"^1.5.0"}};var a=Object.getPrototypeOf,h,V,m,u,j={isConnected:1},B=1e3,b,O={},z=a(j),P=a(a),p,E=(e,t,o,n)=>(e??(setTimeout(o,n),new Set)).add(t),T=(e,t,o)=>{let n=m;m=t;try{return e(o)}catch(r){return console.error(r),o}finally{m=n}},y=e=>e.filter(t=>t._dom?.isConnected),I=e=>b=E(b,e,()=>{for(let t of b)t._bindings=y(t._bindings),t._listeners=y(t._listeners);b=p},B),v={get val(){return m?._getters?.add(this),this.rawVal},get oldVal(){return m?._getters?.add(this),this._oldVal},set val(e){m?._setters?.add(this),e!==this.rawVal&&(this.rawVal=e,this._bindings.length+this._listeners.length?(V?.add(this),h=E(h,this,K)):this._oldVal=e)}},A=e=>({__proto__:v,rawVal:e,_oldVal:e,_bindings:[],_listeners:[]}),_=(e,t)=>{let o={_getters:new Set,_setters:new Set},n={f:e},r=u;u=[];let s=T(e,o,t);s=(s??document).nodeType?s:new Text(s);for(let l of o._getters)o._setters.has(l)||(I(l),l._bindings.push(n));for(let l of u)l._dom=s;return u=r,n._dom=s},L=(e,t=A(),o)=>{let n={_getters:new Set,_setters:new Set},r={f:e,s:t};r._dom=o??u?.push(r)??j,t.val=T(e,n,t.rawVal);for(let s of n._getters)n._setters.has(s)||(I(s),s._listeners.push(r));return t},F=(e,...t)=>{for(let o of t.flat(1/0)){let n=a(o??0),r=n===v?_(()=>o.val):n===P?_(o):o;r!=p&&e.append(r)}return e},G=(e,t,...o)=>{let[n,...r]=a(o[0]??0)===z?o:[{},...o],s=e?document.createElementNS(e,t):document.createElement(t);for(let[l,i]of Object.entries(n)){let g=f=>f?Object.getOwnPropertyDescriptor(f,l)??g(a(f)):p,c=t+","+l,d=O[c]??(O[c]=g(a(s))?.set??0),w=l.startsWith("on")?(f,W)=>{let N=l.slice(2);s.removeEventListener(N,W),s.addEventListener(N,f)}:d?d.bind(s):s.setAttribute.bind(s,l),k=a(i??0);l.startsWith("on")||k===P&&(i=L(i),k=v),k===v?_(()=>(w(i.val,i._oldVal),s)):w(i)}return F(s,...r)},D=e=>({get:(t,o)=>G.bind(p,e,o)}),R=new Proxy(e=>new Proxy(G,D(e)),D()),q=(e,t)=>t?t!==e&&e.replaceWith(t):e.remove(),K=()=>{let e=0,t=[...h].filter(n=>n.rawVal!==n._oldVal);do{V=new Set;for(let n of new Set(t.flatMap(r=>r._listeners=y(r._listeners))))L(n.f,n.s,n._dom),n._dom=p}while(++e<100&&(t=[...V]).length);let o=[...h].filter(n=>n.rawVal!==n._oldVal);h=p;for(let n of new Set(o.flatMap(r=>r._bindings=y(r._bindings))))q(n._dom,_(n.f,n._dom)),n._dom=p;for(let n of o)n._oldVal=n.rawVal},H=(e,t)=>q(e,_(t,e)),S={add:F,tags:R,state:A,derive:L,hydrate:H};var{div:J,h2:Q,p:U,textarea:X,button:Y}=S.tags,Z=["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],M=()=>{if(!location.pathname.startsWith("/watch_tmp/"))return;console.log("Injecting: NG list");let e=window.fetch,t=async(...o)=>{let n=o[0],r=await e.apply(void 0,o);if(!n.toString().includes("/v1/tmp/comments"))return r;let s=await r.json(),l=s.data.comments,i=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],g=l.filter(c=>!i.some(d=>c.message.includes(d)));return new Response(JSON.stringify({...s,data:{comments:g}}),{status:r.status,statusText:r.statusText,headers:r.headers})};window.fetch=t,globalThis.fetch=t},C=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(!document.body){await new Promise(e=>window.addEventListener("DOMContentLoaded",e)),C();return}for(;;){await new Promise(c=>requestAnimationFrame(c));let e=document.querySelector(".w_var\\(--player-width\\)");if(!e)continue;let t=e.querySelector(".aspect_16_\\/_9");if(!t)throw new Error("Failed to find inner player");let o=S.state(!1),n=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):Z,r=X({style:()=>`
      width: 100%;
      color: #000;
      height: 10rem;
      background-color: #fff;
      `,value:n.join(`
`)}),s=J({style:()=>`
        position: absolute;
        display: ${o.val?"flex":"none"};
        flex-direction: column;
        gap: 0.5rem;
        color: #fff;
        right: 1rem;
        bottom: 1rem;
        padding: 1rem;
        background-color: #252525;
        z-index: 1000;
        `},Q({style:()=>`
          font-size: 1.5rem;
          `},"NG\u30EA\u30B9\u30C8"),U("1\u884C\u306B1\u3064\u306ENG\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"),r,Y({style:()=>`
          width: 100%;
          height: 2rem;
          background-color: #fff;
          color: #252525;
          cursor: pointer;
          `,onclick:()=>{let d=r.value.split(`
`).filter(w=>w);localStorage.setItem("ngList",JSON.stringify(d)),console.log("Saved NG list:",d),location.reload()}},"\u4FDD\u5B58"));S.add(t,s);let l=e.querySelector(".bg_\\#252525");if(!l)throw new Error("Failed to find action bar");let i=l.querySelector(".grow_1");if(!i)throw new Error("Failed to find grow");let g=J({className:"h_24px text_#fff cursor_pointer",onclick:()=>{console.log("Clicked"),o.val=!o.val}},"NG");l.insertBefore(g,i.nextSibling);break}}};console.log(`%c== \u30B3\u30CD\u30B3\u30CD\uFF08\u4EEE\uFF09 ========================================
  %c\u30CB\u30B3\u30CB\u30B3\uFF08Re:\u4EEE\uFF09\u306E\u88DC\u52A9\u30C4\u30FC\u30EB\u3002
  %cVersion: %cv${x.version}
  Developed by %cNanashi.
  %c${x.homepage}
----------------------------------------------------------
`,"color: #18b4e6","color: auto","color: #18b4e6","color: auto","color: #48b0d5","color: #18b4e6");for(let e of[M]){let t=document.createElement("script");t.textContent=`(${e.toString()})()`,document.body.appendChild(t)}C();})();
