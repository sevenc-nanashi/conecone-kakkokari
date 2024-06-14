// ==UserScript==
// @name コネコネ（仮）
// @description ニコニコ（Re:仮）の補助ツール。
// @version v0.0.3
// @homepage https://github.com/sevenc-nanashi/conecone-kakkokari
// @match https://www.nicovideo.jp/*
// @updateURL https://sevenc7c.com/conecone-kakkokari/index.user.js
// @downloadURL https://sevenc7c.com/conecone-kakkokari/index.user.js
// @sandbox MAIN_WORLD
// ==/UserScript==

"use strict";(()=>{var x={name:"conecone-kakkokari",module:"index.ts",version:"0.0.3",homepage:"https://github.com/sevenc-nanashi/conecone-kakkokari",scripts:{build:"bun run ./build.ts"},type:"module",devDependencies:{"@types/bun":"latest","@types/tampermonkey":"^5.0.3",esbuild:"^0.21.5"},peerDependencies:{typescript:"^5.0.0"},dependencies:{"vanjs-core":"^1.5.0"}};var a=Object.getPrototypeOf,_,V,f,h,E={isConnected:1},B=1e3,b,O={},z=a(E),j=a(a),p,P=(e,t,o,n)=>(e??(setTimeout(o,n),new Set)).add(t),T=(e,t,o)=>{let n=f;f=t;try{return e(o)}catch(s){return console.error(s),o}finally{f=n}},y=e=>e.filter(t=>t._dom?.isConnected),G=e=>b=P(b,e,()=>{for(let t of b)t._bindings=y(t._bindings),t._listeners=y(t._listeners);b=p},B),v={get val(){return f?._getters?.add(this),this.rawVal},get oldVal(){return f?._getters?.add(this),this._oldVal},set val(e){f?._setters?.add(this),e!==this.rawVal&&(this.rawVal=e,this._bindings.length+this._listeners.length?(V?.add(this),_=P(_,this,K)):this._oldVal=e)}},I=e=>({__proto__:v,rawVal:e,_oldVal:e,_bindings:[],_listeners:[]}),w=(e,t)=>{let o={_getters:new Set,_setters:new Set},n={f:e},s=h;h=[];let r=T(e,o,t);r=(r??document).nodeType?r:new Text(r);for(let i of o._getters)o._setters.has(i)||(G(i),i._bindings.push(n));for(let i of h)i._dom=r;return h=s,n._dom=r},C=(e,t=I(),o)=>{let n={_getters:new Set,_setters:new Set},s={f:e,s:t};s._dom=o??h?.push(s)??E,t.val=T(e,n,t.rawVal);for(let r of n._getters)n._setters.has(r)||(G(r),r._listeners.push(s));return t},A=(e,...t)=>{for(let o of t.flat(1/0)){let n=a(o??0),s=n===v?w(()=>o.val):n===j?w(o):o;s!=p&&e.append(s)}return e},F=(e,t,...o)=>{let[n,...s]=a(o[0]??0)===z?o:[{},...o],r=e?document.createElementNS(e,t):document.createElement(t);for(let[i,l]of Object.entries(n)){let g=u=>u?Object.getOwnPropertyDescriptor(u,i)??g(a(u)):p,c=t+","+i,d=O[c]??(O[c]=g(a(r))?.set??0),m=i.startsWith("on")?(u,W)=>{let N=i.slice(2);r.removeEventListener(N,W),r.addEventListener(N,u)}:d?d.bind(r):r.setAttribute.bind(r,i),k=a(l??0);i.startsWith("on")||k===j&&(l=C(l),k=v),k===v?w(()=>(m(l.val,l._oldVal),r)):m(l)}return A(r,...s)},D=e=>({get:(t,o)=>F.bind(p,e,o)}),R=new Proxy(e=>new Proxy(F,D(e)),D()),q=(e,t)=>t?t!==e&&e.replaceWith(t):e.remove(),K=()=>{let e=0,t=[..._].filter(n=>n.rawVal!==n._oldVal);do{V=new Set;for(let n of new Set(t.flatMap(s=>s._listeners=y(s._listeners))))C(n.f,n.s,n._dom),n._dom=p}while(++e<100&&(t=[...V]).length);let o=[..._].filter(n=>n.rawVal!==n._oldVal);_=p;for(let n of new Set(o.flatMap(s=>s._bindings=y(s._bindings))))q(n._dom,w(n.f,n._dom)),n._dom=p;for(let n of o)n._oldVal=n.rawVal},U=(e,t)=>q(e,w(t,e)),S={add:A,tags:R,state:I,derive:C,hydrate:U};var{div:J,h2:H,p:Q,textarea:X,button:Y}=S.tags,Z=["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],M=()=>{if(!location.pathname.startsWith("/watch_tmp/"))return;console.log("Injecting: NG list");let e=window.fetch,t=async(...o)=>{let n=o[0],s=o[1],r=await e.apply(void 0,o);if(!(typeof n=="string"&&n.includes("/v1/tmp/comments")&&s&&(s.method?.toUpperCase()||"GET")==="GET"))return r;let i=await r.json(),l=i.data.comments,g=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):["\u3093\u3093\uFF5E\u307E\u304B","\u{1F90F}\u{1F60E}","\u306B\u3087\u3001\u306B\u3087\u307E\u308C","\u270B\u{1F42E}\u270B\u{1F4A6}"],c=l.filter(d=>!g.some(m=>d.message.includes(m)));return new Response(JSON.stringify({...i,data:{comments:c}}),{status:r.status,statusText:r.statusText,headers:r.headers})};window.fetch=t,globalThis.fetch=t},L=async()=>{if(location.pathname.startsWith("/watch_tmp/")){if(!document.body){await new Promise(e=>window.addEventListener("DOMContentLoaded",e)),L();return}for(;;){await new Promise(c=>requestAnimationFrame(c));let e=document.querySelector(".w_var\\(--player-width\\)");if(!e)continue;let t=e.querySelector(".aspect_16_\\/_9");if(!t)throw new Error("Failed to find inner player");let o=S.state(!1),n=localStorage.getItem("ngList")?JSON.parse(localStorage.getItem("ngList")):Z,s=X({style:()=>`
      width: 100%;
      color: #000;
      height: 10rem;
      background-color: #fff;
      `,value:n.join(`
`)}),r=J({style:()=>`
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
        `},H({style:()=>`
          font-size: 1.5rem;
          `},"NG\u30EA\u30B9\u30C8"),Q("1\u884C\u306B1\u3064\u306ENG\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"),s,Y({style:()=>`
          width: 100%;
          height: 2rem;
          background-color: #fff;
          color: #252525;
          cursor: pointer;
          `,onclick:()=>{let d=s.value.split(`
`).filter(m=>m);localStorage.setItem("ngList",JSON.stringify(d)),console.log("Saved NG list:",d),location.reload()}},"\u4FDD\u5B58"));S.add(t,r);let i=e.querySelector(".bg_\\#252525");if(!i)throw new Error("Failed to find action bar");let l=i.querySelector(".grow_1");if(!l)throw new Error("Failed to find grow");let g=J({className:"h_24px text_#fff cursor_pointer",onclick:()=>{console.log("Clicked"),o.val=!o.val}},"NG");i.insertBefore(g,l.nextSibling);break}}};console.log(`%c== \u30B3\u30CD\u30B3\u30CD\uFF08\u4EEE\uFF09 ========================================
  %c\u30CB\u30B3\u30CB\u30B3\uFF08Re:\u4EEE\uFF09\u306E\u88DC\u52A9\u30C4\u30FC\u30EB\u3002
  %cVersion: %cv${x.version}
  Developed by %cNanashi.
  %c${x.homepage}
----------------------------------------------------------
`,"color: #18b4e6","color: auto","color: #18b4e6","color: auto","color: #48b0d5","color: #18b4e6");for(let e of[M]){let t=document.createElement("script");t.textContent=`(${e.toString()})()`,document.body.appendChild(t)}L();})();
