import{j as z}from"./jsx-runtime.CYiYLu1p.js";import{r as p}from"./index.CZlPm10g.js";/* empty css                       */import{R as le,T as fe,P as ce,M as he}from"./Triangle.Bqjg7tLi.js";const $={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function q(e){e.length===4&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function me(e){return e=parseInt(e),[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function j(e){return e===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(e)?e[0]==="#"?q(e):$[e.toLowerCase()]?q($[e.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0]):me(e)}class D extends Array{constructor(t){return Array.isArray(t)?super(...t):super(...j(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(t){this[0]=t}set g(t){this[1]=t}set b(t){this[2]=t}set(t){return Array.isArray(t)?this.copy(t):this.copy(j(...arguments))}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this}}const g=20,de=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,pe=`#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: the edges facing toward/away from the light both
  // catch a streak. The angular window (size + fade) is measured with an
  // elliptical normal so it varies continuously along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`,we=({children:e="Get Started",size:t="lg",radius:P=18,tint:G="#ffffff",tintOpacity:W=0,blur:X=0,textColor:Y="#f5f5f5",lineColor:O="#ffffff",baseColor:U="#525252",intensity:V=1,shineSize:J=10,shineFade:K=40,thickness:Q=1,speed:Z=.35,followMouse:ee=!0,proximity:te=250,autoAnimate:ne=!1,disabled:ae=!1,onClick:se,className:L="",type:re="button"})=>{const B=p.useRef(null),E=p.useRef(null),v=p.useRef({});return v.current={radius:P,lineColor:O,baseColor:U,intensity:V,shineSize:J,shineFade:K,thickness:Q,speed:Z,followMouse:ee,proximity:te,autoAnimate:ne},p.useEffect(()=>{const u=B.current,l=E.current;if(!u||!l)return;const i=window.devicePixelRatio||1,b=new le({alpha:!0,premultipliedAlpha:!0,antialias:!0,dpr:i}),r=b.gl;r.clearColor(0,0,0,0),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA);const x=new fe(r);x.attributes.uv&&delete x.attributes.uv;const o=new ce(r,{vertex:de,fragment:pe,uniforms:{uCenter:{value:[0,0]},uHalfSize:{value:[1,1]},uRadius:{value:0},uAngle:{value:2.4},uPx:{value:i},uLineColor:{value:[1,1,1]},uBaseColor:{value:[.32,.32,.32]},uIntensity:{value:1},uShineSize:{value:.17},uShineFade:{value:.7},uThickness:{value:1},uBaseWidth:{value:i}}}),oe=new he(r,{geometry:x,program:o});l.appendChild(r.canvas);const f={w:1,h:1},F=()=>{const s=u.getBoundingClientRect(),n=s.width,a=s.height;f.w=n,f.h=a,b.setSize(n+g*2,a+g*2),o.uniforms.uCenter.value=[(g+n/2)*i,(g+a/2)*i],o.uniforms.uHalfSize.value=[n/2*i,a/2*i]},I=new ResizeObserver(F);I.observe(u),F();let c=null,w=0;const k=s=>{const n=u.getBoundingClientRect(),a=n.left+n.width/2,R=n.top+n.height/2,H=Math.max(n.left-s.clientX,0,s.clientX-n.right),A=Math.max(n.top-s.clientY,0,s.clientY-n.bottom),d=Math.hypot(H,A);if(d===0){const ie=(s.clientX-a)/(n.width/2),ue=(R-s.clientY)/(n.height/2);c=Math.atan2(2/n.height,-2/n.width)+ie*.3+ue*.15}else c=Math.atan2(R-s.clientY,s.clientX-a);const M=Math.max(0,1-d/Math.max(v.current.proximity,1));w=M*M*(3-2*M)};window.addEventListener("pointermove",k);let C=2.4,T=2.4,S=0,_=performance.now(),y=0;const h=new D,m=new D,N=s=>{y=requestAnimationFrame(N);const n=Math.min((s-_)/1e3,.05);_=s;const a=v.current;T+=a.speed*n;const A=((a.followMouse&&c!=null&&(!a.autoAnimate||w>0)?c:T)-C+Math.PI*3)%(Math.PI*2)-Math.PI;C+=A*(1-Math.exp(-n*7));const d=a.autoAnimate?1:w;S+=(d-S)*(1-Math.exp(-n*8)),h.set(a.lineColor),m.set(a.baseColor),o.uniforms.uAngle.value=C,o.uniforms.uRadius.value=Math.min(a.radius,Math.min(f.w,f.h)/2)*i,o.uniforms.uLineColor.value=[h.r,h.g,h.b],o.uniforms.uBaseColor.value=[m.r,m.g,m.b],o.uniforms.uIntensity.value=a.intensity*S,o.uniforms.uShineSize.value=a.shineSize*Math.PI/180,o.uniforms.uShineFade.value=a.shineFade*Math.PI/180,o.uniforms.uThickness.value=a.thickness*i,b.render({scene:oe})};return y=requestAnimationFrame(N),()=>{cancelAnimationFrame(y),I.disconnect(),window.removeEventListener("pointermove",k),r.canvas.parentNode===l&&l.removeChild(r.canvas),r.getExtension("WEBGL_lose_context")?.loseContext()}},[]),z.jsxs("button",{ref:B,type:re,disabled:ae,onClick:se,className:`specular-button specular-button--${t}${L?` ${L}`:""}`,style:{"--sb-radius":`${P}px`,"--sb-tint":G,"--sb-tint-opacity":W,"--sb-blur":`${X}px`,"--sb-text-color":Y},children:[z.jsx("span",{ref:E,className:"specular-button__fx","aria-hidden":"true"}),z.jsx("span",{className:"specular-button__label",children:e})]})};export{we as default};
