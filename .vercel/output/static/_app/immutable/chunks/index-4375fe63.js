function p(){}function G(t,n){for(const e in n)t[e]=n[e];return t}function L(t){return t()}function M(){return Object.create(null)}function g(t){t.forEach(L)}function T(t){return typeof t=="function"}function at(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function J(t){return Object.keys(t).length===0}function K(t,...n){if(t==null)return p;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ft(t,n,e){t.$$.on_destroy.push(K(n,e))}function dt(t,n,e,i){if(t){const r=z(t,n,e,i);return t[0](r)}}function z(t,n,e,i){return t[1]&&i?G(e.ctx.slice(),t[1](i(n))):e.ctx}function _t(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],c=Math.max(n.dirty.length,r.length);for(let o=0;o<c;o+=1)l[o]=n.dirty[o]|r[o];return l}return n.dirty|r}return n.dirty}function ht(t,n,e,i,r,l){if(r){const c=z(n,e,i,l);t.p(c,r)}}function mt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}const B=typeof window<"u";let pt=B?()=>window.performance.now():()=>Date.now(),O=B?t=>requestAnimationFrame(t):p;const _=new Set;function q(t){_.forEach(n=>{n.c(t)||(_.delete(n),n.f())}),_.size!==0&&O(q)}function yt(t){let n;return _.size===0&&O(q),{promise:new Promise(e=>{_.add(n={c:t,f:e})}),abort(){_.delete(n)}}}let v=!1;function Q(){v=!0}function R(){v=!1}function U(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<n.length;u++){const f=n[u];f.claim_order!==void 0&&s.push(f)}n=s}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let s=0;s<n.length;s++){const u=n[s].claim_order,f=(r>0&&n[e[r]].claim_order<=u?r+1:U(1,r,x=>n[e[x]].claim_order,u))-1;i[s]=e[f]+1;const a=f+1;e[a]=s,r=Math.max(a,r)}const l=[],c=[];let o=n.length-1;for(let s=e[r]+1;s!=0;s=i[s-1]){for(l.push(n[s-1]);o>=s;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);l.reverse(),c.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<c.length;s++){for(;u<l.length&&c[s].claim_order>=l[u].claim_order;)u++;const f=u<l.length?l[u]:null;t.insertBefore(c[s],f)}}function X(t,n){if(v){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function gt(t,n,e){v&&!e?X(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function Y(t){t.parentNode&&t.parentNode.removeChild(t)}function xt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function Z(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function bt(){return C(" ")}function $t(){return C("")}function wt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function vt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function Et(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function tt(t){return Array.from(t.childNodes)}function nt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function F(t,n,e,i,r=!1){nt(t);const l=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const s=e(o);return s===void 0?t.splice(c,1):t[c]=s,r||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const s=e(o);return s===void 0?t.splice(c,1):t[c]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function et(t,n,e,i){return F(t,r=>r.nodeName===n,r=>{const l=[];for(let c=0;c<r.attributes.length;c++){const o=r.attributes[c];e[o.name]||l.push(o.name)}l.forEach(c=>r.removeAttribute(c))},()=>i(n))}function Nt(t,n,e){return et(t,n,e,Z)}function it(t,n){return F(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>C(n),!0)}function At(t){return it(t," ")}function St(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function jt(t,n){t.value=n??""}function Ct(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function kt(t,n,e){t.classList[e?"add":"remove"](n)}function rt(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}function Dt(t,n){return new t(n)}let y;function m(t){y=t}function E(){if(!y)throw new Error("Function called outside component initialization");return y}function Mt(t){E().$$.on_mount.push(t)}function Pt(t){E().$$.after_update.push(t)}function Lt(t){E().$$.on_destroy.push(t)}function Tt(){const t=E();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const l=rt(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,l)}),!l.defaultPrevented}return!0}}const h=[],P=[],$=[],A=[],H=Promise.resolve();let S=!1;function I(){S||(S=!0,H.then(W))}function zt(){return I(),H}function j(t){$.push(t)}function Bt(t){A.push(t)}const N=new Set;let b=0;function W(){const t=y;do{for(;b<h.length;){const n=h[b];b++,m(n),ct(n.$$)}for(m(null),h.length=0,b=0;P.length;)P.pop()();for(let n=0;n<$.length;n+=1){const e=$[n];N.has(e)||(N.add(e),e())}$.length=0}while(h.length);for(;A.length;)A.pop()();S=!1,N.clear(),m(t)}function ct(t){if(t.fragment!==null){t.update(),g(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(j)}}const w=new Set;let d;function Ot(){d={r:0,c:[],p:d}}function qt(){d.r||g(d.c),d=d.p}function st(t,n){t&&t.i&&(w.delete(t),t.i(n))}function Ft(t,n,e,i){if(t&&t.o){if(w.has(t))return;w.add(t),d.c.push(()=>{w.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Ht(t,n,e,i){const r=t.$$.props[n];r!==void 0&&(t.$$.bound[r]=e,i===void 0&&e(t.$$.ctx[r]))}function It(t){t&&t.c()}function Wt(t,n){t&&t.l(n)}function ut(t,n,e,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(n,e),i||j(()=>{const c=t.$$.on_mount.map(L).filter(T);t.$$.on_destroy?t.$$.on_destroy.push(...c):g(c),t.$$.on_mount=[]}),l.forEach(j)}function ot(t,n){const e=t.$$;e.fragment!==null&&(g(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(h.push(t),I(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Gt(t,n,e,i,r,l,c,o=[-1]){const s=y;m(t);const u=t.$$={fragment:null,ctx:[],props:l,update:p,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(s?s.$$.context:[])),callbacks:M(),dirty:o,skip_bound:!1,root:n.target||s.$$.root};c&&c(u.root);let f=!1;if(u.ctx=e?e(t,n.props||{},(a,x,...k)=>{const D=k.length?k[0]:x;return u.ctx&&r(u.ctx[a],u.ctx[a]=D)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](D),f&&lt(t,a)),x}):[],u.update(),f=!0,g(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){Q();const a=tt(n.target);u.fragment&&u.fragment.l(a),a.forEach(Y)}else u.fragment&&u.fragment.c();n.intro&&st(t.$$.fragment),ut(t,n.target,n.anchor,n.customElement),R(),W()}m(s)}class Jt{$destroy(){ot(this,1),this.$destroy=p}$on(n,e){if(!T(e))return p;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!J(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{zt as A,p as B,dt as C,ht as D,mt as E,_t as F,X as G,ft as H,pt as I,yt as J,kt as K,wt as L,T as M,vt as N,g as O,xt as P,Tt as Q,K as R,Jt as S,P as T,Ht as U,jt as V,Bt as W,Lt as X,bt as a,gt as b,At as c,qt as d,$t as e,st as f,Ot as g,Y as h,Gt as i,Pt as j,Z as k,Nt as l,tt as m,Et as n,Mt as o,Ct as p,C as q,it as r,at as s,Ft as t,St as u,Dt as v,It as w,Wt as x,ut as y,ot as z};
