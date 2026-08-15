import{j as I}from"./jsx-runtime.CYiYLu1p.js";import{r}from"./index.CZlPm10g.js";/* empty css                       */import{R as A,T as B,P as U,M as _}from"./Triangle.Bqjg7tLi.js";const v=l=>{const s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(l);return s?[parseInt(s[1],16)/255,parseInt(s[2],16)/255,parseInt(s[3],16)/255]:[0,0,0]},k=({horizonColor:l="#050B14",waveColor:s="#0055ff",crestColor:w="#00ffff",speed:p=.3,brightness:x=.8,opacity:R=.6,mouseInteraction:c=!0,className:M=""})=>{const t=r.useRef(null),m=r.useRef(null),y=r.useRef(null),E=r.useRef({x:.5,y:.5}),f=r.useRef({x:.5,y:.5}),d=r.useRef(null),b=r.useRef(null),a=r.useRef(null),[L,S]=r.useState(!1),h=r.useRef(null);return r.useEffect(()=>{if(t.current)return h.current=new IntersectionObserver(n=>{const e=n[0];S(e.isIntersecting)},{threshold:.05}),h.current.observe(t.current),()=>{h.current&&(h.current.disconnect(),h.current=null)}},[]),r.useEffect(()=>!L||!t.current?void 0:(a.current&&(a.current(),a.current=null),(async()=>{if(!t.current||(await new Promise(o=>setTimeout(o,10)),!t.current))return;const e=new A({dpr:Math.min(window.devicePixelRatio,2),alpha:!0});y.current=e;const i=e.gl;for(i.canvas.style.width="100%",i.canvas.style.height="100%";t.current.firstChild;)t.current.removeChild(t.current.firstChild);t.current.appendChild(i.canvas);const C=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,P=`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec3  horizonColor;
uniform vec3  waveColor;
uniform vec3  crestColor;
uniform float speed;
uniform float brightness;
uniform float opacity;
uniform vec2  mousePos;
uniform float mouseInteraction;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float t = iTime * speed;

  // Mouse interaction
  float mouseEffect = 0.0;
  if (mouseInteraction > 0.5) {
    float dist = length(uv - mousePos);
    mouseEffect = smoothstep(0.5, 0.0, dist) * 0.15;
  }

  // Draw elegant gradient waves with different frequencies/amplitudes
  float wave1 = sin(uv.x * 3.5 + t + mouseEffect * 6.0) * 0.18;
  float wave2 = cos(uv.x * 2.0 - t * 1.3 + uv.y * 1.5) * 0.12;
  float wave3 = sin(uv.y * 2.5 + t * 0.7 + uv.x * 1.2) * 0.08;

  float waveHeight = wave1 + wave2 + wave3;
  float curve = uv.y - (0.45 + waveHeight);

  // Deep ocean gradient base
  vec3 col = horizonColor;

  // Add the primary wave body color
  float waveEdge = smoothstep(0.2, -0.2, curve);
  col = mix(col, waveColor, waveEdge * 0.75);

  // Bright glowing crest highlight at the edge of the curve
  float crestThickness = 0.04 + mouseEffect * 0.04;
  float crest = smoothstep(crestThickness, 0.0, abs(curve));
  col = mix(col, crestColor, crest * brightness);

  // Secondary lower wave layer for beautiful layered depth
  float wave4 = sin(uv.x * 5.5 - t * 1.8 + mouseEffect * 3.0) * 0.08;
  float curve2 = uv.y - (0.25 + wave4);
  float waveEdge2 = smoothstep(0.15, -0.15, curve2);
  col = mix(col, waveColor * 0.5, waveEdge2 * 0.4);

  gl_FragColor = vec4(col, opacity);
}`,g={iTime:{value:0},iResolution:{value:[1,1]},horizonColor:{value:v(l)},waveColor:{value:v(s)},crestColor:{value:v(w)},speed:{value:p},brightness:{value:x},opacity:{value:R},mousePos:{value:[.5,.5]},mouseInteraction:{value:c?1:0}};m.current=g;const z=new B(i),F=new U(i,{vertex:C,fragment:P,uniforms:g}),W=new _(i,{geometry:z,program:F});b.current=W;const T=()=>{if(!t.current||!e)return;e.dpr=Math.min(window.devicePixelRatio,2);const{clientWidth:o,clientHeight:u}=t.current;e.setSize(o,u),g.iResolution.value=[o*e.dpr,u*e.dpr]},G=o=>{if(!(!y.current||!m.current||!b.current)){g.iTime.value=o*.001,c&&(f.current.x=f.current.x*.92+E.current.x*(1-.92),f.current.y=f.current.y*.92+E.current.y*(1-.92),g.mousePos.value=[f.current.x,f.current.y]);try{e.render({scene:W}),d.current=requestAnimationFrame(G)}catch(u){console.warn("WebGL rendering error inside GradientWaves:",u);return}}};window.addEventListener("resize",T),T(),d.current=requestAnimationFrame(G),a.current=()=>{if(d.current&&(cancelAnimationFrame(d.current),d.current=null),window.removeEventListener("resize",T),e)try{const o=e.gl.canvas,u=e.gl.getExtension("WEBGL_lose_context");u&&u.loseContext(),o&&o.parentNode&&o.parentNode.removeChild(o)}catch(o){console.warn("Error during WebGL cleanup for GradientWaves:",o)}y.current=null,m.current=null,b.current=null}})(),()=>{a.current&&(a.current(),a.current=null)}),[L,l,s,w,p,x,R,c]),r.useEffect(()=>{if(!m.current)return;const n=m.current;n.horizonColor.value=v(l),n.waveColor.value=v(s),n.crestColor.value=v(w),n.speed.value=p,n.brightness.value=x,n.opacity.value=R,n.mouseInteraction.value=c?1:0},[l,s,w,p,x,R,c]),r.useEffect(()=>{const n=e=>{if(!t.current)return;const i=t.current.getBoundingClientRect(),C=(e.clientX-i.left)/i.width,P=1-(e.clientY-i.top)/i.height;E.current={x:C,y:P}};if(c)return window.addEventListener("mousemove",n),()=>window.removeEventListener("mousemove",n)},[c]),I.jsx("div",{ref:t,className:`gradient-waves-container ${M}`.trim()})};export{k as default};
