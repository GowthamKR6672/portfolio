import{At as e,Dt as t,g as n,i as r,r as i,wt as a}from"./index-D27oaUML.js";import{i as o,n as s,r as c}from"./NeonSite-B2ldDVQ9.js";import{G as l,R as u,_ as d,at as f,b as p,it as m,l as h,n as g,ot as _,s as v,t as y,u as b,v as x,y as S}from"./Lightformer-B4rBo3G5.js";import{a as C,i as w,n as T,r as E,t as D}from"./shaders-BLsZ7NNp.js";import{t as O}from"./Float-B--g73xi.js";import{t as k}from"./screens-5oz_lhmH.js";var A=e(t()),ee=(0,A.createContext)(null);function j({iterations:e=10,ms:t=250,threshold:n=.75,step:r=.1,factor:i=.5,flipflops:a=1/0,bounds:o=e=>e>100?[60,100]:[40,60],onIncline:s,onDecline:c,onChange:l,onFallback:u,children:d}){let[f,p]=(0,A.useState)(()=>({fps:0,index:0,factor:i,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:e=>{let t=Symbol();return f.subscriptions.set(t,e.current),()=>void f.subscriptions.delete(t)}})),m=0;return h(()=>{let{frames:i,averages:d}=f;if(!f.fallback&&d.length<e){i.push(performance.now());let p=i[i.length-1]-i[0];if(p>=t){if(f.fps=Math.round(i.length/p*1e3*1)/1,f.refreshrate=Math.max(f.refreshrate,f.fps),d[f.index++%e]=f.fps,d.length===e){let[t,i]=o(f.refreshrate),p=d.filter(e=>e>=i),h=d.filter(e=>e<t);p.length>e*n&&(f.factor=Math.min(1,f.factor+r),f.flipped++,s&&s(f),f.subscriptions.forEach(e=>e.onIncline&&e.onIncline(f))),h.length>e*n&&(f.factor=Math.max(0,f.factor-r),f.flipped++,c&&c(f),f.subscriptions.forEach(e=>e.onDecline&&e.onDecline(f))),m!==f.factor&&(m=f.factor,l&&l(f),f.subscriptions.forEach(e=>e.onChange&&e.onChange(f))),f.flipped>a&&!f.fallback&&(f.fallback=!0,u&&u(f),f.subscriptions.forEach(e=>e.onFallback&&e.onFallback(f))),f.averages=[]}f.frames=[]}}}),A.createElement(ee.Provider,{value:f},d)}var M=1337,N=()=>((M=M*16807%2147483647)-1)/2147483646,P=()=>{let e=0,t=0;for(;e===0;)e=N();for(;t===0;)t=N();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*t)};function F(e,t,n,r){let[i,a,o,s,c,l]=[Math.cos(t),Math.sin(t),Math.cos(n),Math.sin(n),Math.cos(r),Math.sin(r)];for(let t=0;t<e.length;t+=3){let n=e[t],r=e[t+1],u=e[t+2],d=r*i-u*a;u=r*a+u*i,r=d,d=n*o+u*s,u=-n*s+u*o,n=d,d=n*c-r*l,r=n*l+r*c,n=d,e[t]=n,e[t+1]=r,e[t+2]=u}return e}function I(e){let t=new Float32Array(e*3);for(let n=0;n<e;n++){let r,i,a;if(n<e*.32){let e=N()*2-1,t=N()*Math.PI*2,n=1.05+P()*.1,o=Math.sqrt(1-e*e);r=Math.cos(t)*o*n,i=e*n,a=Math.sin(t)*o*n}else{let e=n%3,t=N()*Math.PI*2,o=Math.cos(t)*3.3+P()*.05,s=Math.sin(t)*1.15+P()*.05,c=e*Math.PI/3;r=o*Math.cos(c)-s*Math.sin(c),i=o*Math.sin(c)+s*Math.cos(c),a=P()*.05}t.set([r,i,a],n*3)}return F(t,.45,0,.1)}function te(e){let t=new Float32Array(e*3),n=3.2,r=8.5;for(let i=0;i<e;i++){let a,o,s;if(i<e*.72){let e=N(),t=e*Math.PI*2*n+i%2*Math.PI,c=1.35+P()*.06;a=Math.cos(t)*c,s=Math.sin(t)*c,o=(e-.5)*r+P()*.04}else{let e=(Math.floor(N()*34)+.5)/34,t=e*Math.PI*2*n,i=N()*2-1;a=Math.cos(t)*1.35*i,s=Math.sin(t)*1.35*i,o=(e-.5)*r+P()*.02}t.set([a,o,s],i*3)}return F(t,0,0,-.42)}function ne(e){let t=new Float32Array(e*3);for(let n=0;n<e;n++){let r=n>e*.86,i=1-(r?N():n/(e*.86))*2,a=Math.sqrt(Math.max(0,1-i*i)),o=r?N()*Math.PI*2:n*Math.PI*(3-Math.sqrt(5)),s=r?.4+N()*.9:2.5+P()*.03;t.set([Math.cos(o)*a*s,i*s,Math.sin(o)*a*s],n*3)}return t}function re(e){let t=new Float32Array(e*3),n=Math.round(Math.sqrt(e*2.2)),r=Math.ceil(e/n);for(let i=0;i<e;i++){let e=i%n,a=Math.floor(i/n);t.set([(e/n-.5)*22,0,(a/r-.5)*10],i*3)}return t}function ie(e){let t=new Float32Array(e*3);for(let n=0;n<e;n++)if(n<e*.8){let e=N()*Math.PI*2,r=4.4+P()*.16+(n%7==0?P()*.5:0);t.set([Math.cos(e)*r,Math.sin(e)*r,P()*.2],n*3)}else t.set([P()*6,P()*4,-2-N()*6],n*3);return t}function ae(e){let t=new Float32Array(e*3);for(let n=0;n<e;n++){let e=N()**.7*6,r=n%3/3*Math.PI*2,i=e*.95,a=(.12+e*.09)*P(),o=r+i+a,s=P()*.18*(1-e/7);t.set([Math.cos(o)*e+P()*.08,s,Math.sin(o)*e+P()*.08],n*3)}return F(t,1.05,0,.25)}function oe(e){let t=new Float32Array(e*3),n=3.4,r=n/3;for(let i=0;i<e;i++){let e=i%3,a=[Math.floor(N()*4)*r-n/2,Math.floor(N()*4)*r-n/2,Math.floor(N()*4)*r-n/2];a[e]=N()*n-n/2,i%9==0&&(a[e]=Math.round((a[e]+n/2)/r)*r-n/2+P()*.04),t.set(a,i*3)}return F(t,.6,.75,0)}function se(e){let t=new Float32Array(e*3),n=Math.round(Math.sqrt(e*2.6)),r=Math.ceil(e/n);for(let i=0;i<e;i++){let e=i%n,a=Math.floor(i/n);t.set([(e/n-.5)*26,0,(a/r-.5)*12-1],i*3)}return t}var ce=[I,te,ne,re,ie,ae,oe,se];function le(e){return M=1337,ce.map(t=>t(e))}function L(e){return e?[[0,1.9,0,.62,.12],[0,1.2,0,.62,.25],[0,2,0,.7,.1],[0,-2.4,0,.75,0],[0,1.6,-1,.55,.05],[0,1.2,-1,.7,.05],[0,1.4,0,.7,.12],[0,-3,0,.8,0]]:[[3.6,.15,0,1,.12],[-4.4,-.3,0,.95,.25],[3.9,-.1,0,1,.1],[0,-3.3,0,1,0],[2.6,0,-1.2,1,.05],[2.4,-.4,-2,1,.05],[4.7,1.5,0,.82,.12],[0,-3.6,0,1,0]]}var R=[[`#22d3ee`,`#8b5cf6`],[`#8b5cf6`,`#f472b6`],[`#22d3ee`,`#a78bfa`],[`#6366f1`,`#22d3ee`],[`#f472b6`,`#8b5cf6`],[`#22d3ee`,`#f472b6`],[`#a3e635`,`#22d3ee`],[`#8b5cf6`,`#f472b6`]],z={neon:{bg:`#05060a`,palette:R,blending:`additive`,bloom:!0,size:1,dim:1,glow:[`rgba(139,92,246,0.9)`,`rgba(34,211,238,0.35)`],badge:{fill:`rgba(10,12,22,0.92)`,ring:[`#22d3ee`,`#8b5cf6`,`#f472b6`],text:`#eceef6`}}},B=8,V=Array.from({length:B},(e,t)=>`float w${t} = wt(p, ${t}.0);`).join(`
  `),H=(e,t)=>`place(${t}, ${e}) * w${e}`,U=[`position`,...Array.from({length:7},(e,t)=>`aS${t+1}`)],ue=`
uniform float uTime;
uniform float uProgress;
uniform float uSize;
uniform float uPixelRatio;
uniform float uDim;
uniform vec4 uTilt;   // cos/sin of mouse yaw, cos/sin of mouse pitch
uniform vec2 uShift;  // drift toward the mouse
uniform vec4 uLayout[${B}];   // xyz offset, w scale
uniform vec2 uRot[${B}];      // cos/sin of each shape's spin
uniform vec3 uColA[${B}];
uniform vec3 uColB[${B}];
${Array.from({length:7},(e,t)=>`attribute vec3 aS${t+1};`).join(`
`)}
attribute float aRandom;
varying vec3 vColor;
varying float vAlpha;

${D}

float wt(float p, float k){ return clamp(1.0 - abs(p - k), 0.0, 1.0); }

vec3 place(vec3 s, int k){
  vec4 l = uLayout[k];
  vec2 r = uRot[k];
  vec3 v = s * l.w;
  v = vec3(v.x * r.x + v.z * r.y, v.y, -v.x * r.y + v.z * r.x);
  // Turn to face the mouse, around the shape's own centre.
  v = vec3(v.x * uTilt.x + v.z * uTilt.y, v.y, -v.x * uTilt.y + v.z * uTilt.x);
  v = vec3(v.x, v.y * uTilt.z - v.z * uTilt.w, v.y * uTilt.w + v.z * uTilt.z);
  return v + l.xyz;
}

void main(){
  // Staggered morph: each particle starts its own transition at a random
  // delay, but every particle is exactly on a shape when uProgress is whole.
  float base = floor(uProgress);
  float local = clamp((uProgress - base - aRandom * 0.4) / 0.6, 0.0, 1.0);
  local = local * local * (3.0 - 2.0 * local);
  float p = min(base + local, 7.0);
  ${V}

  vec3 pos = ${U.map((e,t)=>H(t,e)).join(`
    + `)};

  // Turbulence peaks mid-transition, plus a constant gentle drift.
  float turb = sin(local * 3.14159);
  vec3 q = pos * 0.22 + vec3(uTime * 0.12);
  vec3 n = vec3(snoise(q), snoise(q + 17.3), snoise(q + 41.9));
  pos += n * (turb * 1.9 + 0.07);

  // Living surfaces: the terrain and the contact sea.
  pos.y += w3 * (sin(pos.x * 0.55 + uTime * 0.8) * 0.5 + cos(pos.z * 0.75 + uTime * 0.6) * 0.4);
  pos.y += w7 * (sin(pos.x * 0.38 + uTime * 0.9) * 0.6 + cos(pos.z * 0.55 + uTime * 0.7) * 0.45);

  pos.xy += uShift;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float tw = 0.7 + 0.3 * sin(uTime * (1.2 + aRandom * 3.0) + aRandom * 60.0);
  gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.95) * tw * (10.0 / -mv.z);

  vec3 ca = ${Array.from({length:B},(e,t)=>`uColA[${t}] * w${t}`).join(` + `)};
  vec3 cb = ${Array.from({length:B},(e,t)=>`uColB[${t}] * w${t}`).join(` + `)};
  vColor = mix(ca, cb, smoothstep(0.1, 0.9, aRandom));
  vAlpha = (0.45 + 0.55 * tw) * (1.0 - turb * 0.35) * uDim;
}
`,de=`
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor * (0.8 + a * 0.9), a * vAlpha);
  #include <colorspace_fragment>
}
`,W=a();function fe({count:e,theme:t=`neon`}){let n=z[t],r=(0,A.useRef)(),{size:i,gl:a}=b(),s=(0,A.useMemo)(()=>{let t=le(e),n=new x;n.setAttribute(`position`,new d(t[0],3)),t.slice(1).forEach((e,t)=>n.setAttribute(`aS${t+1}`,new d(e,3)));let r=new Float32Array(e);for(let t=0;t<e;t++)r[t]=Math.random();return n.setAttribute(`aRandom`,new d(r,1)),n},[e]),l=(0,A.useMemo)(()=>({uTime:{value:0},uProgress:{value:0},uSize:{value:5.5},uPixelRatio:{value:1},uDim:{value:1},uTilt:{value:new _(1,0,1,0)},uShift:{value:new m},uLayout:{value:Array.from({length:8},()=>new _)},uRot:{value:Array.from({length:8},()=>new m(1,0))},uColA:{value:R.map(([e])=>new p(e))},uColB:{value:R.map(([,e])=>new p(e))}}),[]),u=(0,A.useRef)(Array(8).fill(0)),f=(0,A.useRef)(L(c()));return(0,A.useEffect)(()=>{let e=r.current.uniforms,t=c();f.current=L(t).map((e,r)=>!t&&n.layout?.[r]||e),f.current.forEach(([t,n,r,i],a)=>e.uLayout.value[a].set(t,n,r,i)),e.uPixelRatio.value=a.getPixelRatio(),e.uSize.value=(c()?4.6:5.5)*n.size,e.uDim.value=(c()?.55:1)*n.dim,n.palette.forEach(([t,n],r)=>{e.uColA.value[r].set(t),e.uColB.value[r].set(n)})},[i,a,n]),h((e,t)=>{let n=r.current.uniforms;n.uTime.value+=t,n.uProgress.value=o.section;let i=o.mouse;n.uTilt.value.set(Math.cos(i.yaw),Math.sin(i.yaw),Math.cos(i.pitch),Math.sin(i.pitch)),n.uShift.value.set(i.x,i.y),f.current.forEach((e,r)=>{u.current[r]+=t*e[4],n.uRot.value[r].set(Math.cos(u.current[r]),Math.sin(u.current[r]))})}),(0,W.jsx)(`points`,{geometry:s,frustumCulled:!1,children:(0,W.jsx)(`shaderMaterial`,{ref:r,vertexShader:ue,fragmentShader:de,uniforms:l,transparent:!0,depthWrite:!1,blending:n.blending===`normal`?1:2})})}var G=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,K=`
uniform sampler2D uA;
uniform sampler2D uB;
uniform float uMix;
uniform float uTime;
uniform float uPower;
varying vec2 vUv;
float hash(float n){ return fract(sin(n) * 43758.5453); }
void main(){
  float g = sin(clamp(uMix, 0.0, 1.0) * 3.14159);
  vec2 uv = vUv;
  float band = hash(floor(uv.y * 36.0) + floor(uTime * 24.0));
  uv.x += (band - 0.5) * 0.06 * g * step(0.55, band);
  float k = smoothstep(0.35, 0.65, uMix);
  vec2 o = vec2(0.008 * g, 0.0);
  vec3 a = vec3(texture2D(uA, uv + o).r, texture2D(uA, uv).g, texture2D(uA, uv - o).b);
  vec3 b = vec3(texture2D(uB, uv + o).r, texture2D(uB, uv).g, texture2D(uB, uv - o).b);
  vec3 col = mix(a, b, k) + g * 0.06;
  col *= 0.95 + 0.05 * sin(vUv.y * 900.0);
  // power-on: a bright line that opens into the picture
  float open = smoothstep(0.0, 1.0, uPower);
  float lineMask = smoothstep(0.5 - open * 0.5 - 0.01, 0.5 - open * 0.5, vUv.y) * (1.0 - smoothstep(0.5 + open * 0.5, 0.5 + open * 0.5 + 0.01, vUv.y));
  col = col * lineMask * open + vec3(0.6, 0.9, 1.0) * lineMask * (1.0 - open) * step(0.01, uPower);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;function q(e){let t=new S(e);return t.colorSpace=l,t.anisotropy=8,t}function pe(){let e=document.createElement(`canvas`);e.width=1024,e.height=380;let t=e.getContext(`2d`);t.fillStyle=`#0d0f15`,t.beginPath(),t.roundRect(0,0,1024,380,24),t.fill(),[14,14,13,12,11].forEach((e,n)=>{let r=(984-(e-1)*8)/e;for(let i=0;i<e;i++){let e=20+i*(r+8),a=18+n*70;t.fillStyle=`#1b1e28`,t.beginPath(),t.roundRect(e,a,r,60,8),t.fill(),t.fillStyle=`rgba(139,92,246,0.18)`,t.fillRect(e+6,a+54,r-12,2)}});let n=new S(e);return n.colorSpace=l,n}function me(){let e=document.createElement(`canvas`);e.width=e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,256,256);n.addColorStop(0,`#22d3ee`),n.addColorStop(.55,`#8b5cf6`),n.addColorStop(1,`#f472b6`),t.strokeStyle=n,t.lineWidth=26,t.lineCap=`round`,t.lineJoin=`round`,t.beginPath(),t.arc(128,128,78,-.35,Math.PI*1.65),t.moveTo(128,128),t.lineTo(206,128),t.stroke();let r=new S(e);return r.colorSpace=l,r}function he([e,t]){let n=document.createElement(`canvas`);n.width=n.height=256;let r=n.getContext(`2d`),i=r.createRadialGradient(128,128,0,128,128,128);return i.addColorStop(0,e),i.addColorStop(.4,t),i.addColorStop(1,`rgba(0,0,0,0)`),r.fillStyle=i,r.fillRect(0,0,256,256),new S(n)}var J=e=>1-(1-e)**3,Y=e=>Math.min(1,Math.max(0,e));function ge({theme:e=`neon`}){let t=(0,A.useRef)(),n=(0,A.useRef)(),r=(0,A.useRef)(),i=(0,A.useRef)(),a=(0,A.useRef)(),s=(0,A.useMemo)(()=>k(),[]),l=(0,A.useMemo)(()=>({laptop:s.laptop.map(q),phone:s.phone.map(q)}),[s]),d=(0,A.useMemo)(pe,[]),f=(0,A.useMemo)(me,[]),p=(0,A.useMemo)(()=>he(z[e].glow),[e]),m=(0,A.useMemo)(()=>({uA:{value:l.laptop[0]},uB:{value:l.laptop[0]},uMix:{value:1},uTime:{value:0},uPower:{value:0}}),[l]),g=(0,A.useMemo)(()=>({uA:{value:l.phone[0]},uB:{value:l.phone[0]},uMix:{value:1},uTime:{value:0},uPower:{value:0}}),[l]),_=(0,A.useRef)({from:0,to:0,mix:1,acc:0});h(({clock:e},d)=>{let{enter:f,progress:p}=o.projects,m=t.current;if(m.visible=f>.002,!m.visible)return;let h=e.elapsedTime,g=J(f),v=c(),y=v?-.5:2.45,b=v?1.35:-.8,x=o.mouse;m.position.set(y+x.x*.6,b+x.y*.6-(1-g)*7,0),m.scale.setScalar((v?.64:1.22)*(.75+.25*g));let S=Math.min(3,Math.floor(p*4)),C=S%2?.1:-.1;m.rotation.y=u.damp(m.rotation.y,-.42+C-(1-g)*1.4+x.yaw*.55,3,d),m.rotation.x=u.damp(m.rotation.x,.22+x.pitch*.4,3,d);let w=Y((f-.3)/.7);n.current.rotation.x=u.lerp(Math.PI/2-.02,-.3,J(w));let T=Y((w-.55)/.45);r.current.material.opacity=.55*g,o.projects.active=S;let E=_.current;S!==E.to&&(E.from=E.mix<.5?E.from:E.to,E.to=S,E.mix=0),E.mix=Math.min(1,E.mix+d*1.8),E.acc+=d,E.acc>.05&&(E.acc=0,(E.mix<1?[E.from,E.to]:[E.to]).forEach(e=>{s.draw(e,h),l.laptop[e].needsUpdate=!0,l.phone[e].needsUpdate=!0}));let D=i.current.uniforms,O=a.current.uniforms;for(let e of[D,O])e.uTime.value=h,e.uMix.value=E.mix,e.uPower.value=T;D.uA.value=l.laptop[E.from],D.uB.value=l.laptop[E.to],O.uA.value=l.phone[E.from],O.uB.value=l.phone[E.to]});let v=(0,W.jsx)(`meshStandardMaterial`,{color:`#2a2e3b`,metalness:.85,roughness:.32,envMapIntensity:1.2});return(0,W.jsxs)(`group`,{ref:t,visible:!1,children:[(0,W.jsxs)(`mesh`,{ref:r,"rotation-x":-Math.PI/2,position:[0,-.02,.2],scale:[7,5,1],children:[(0,W.jsx)(`planeGeometry`,{}),(0,W.jsx)(`meshBasicMaterial`,{map:p,transparent:!0,depthWrite:!1,blending:2})]}),(0,W.jsx)(C,{args:[3.6,.1,2.4],radius:.045,smoothness:4,position:[0,.05,0],children:v}),(0,W.jsxs)(`mesh`,{"rotation-x":-Math.PI/2,position:[0,.101,-.36],children:[(0,W.jsx)(`planeGeometry`,{args:[3.15,1.17]}),(0,W.jsx)(`meshStandardMaterial`,{map:d,roughness:.7,metalness:.2})]}),(0,W.jsxs)(`mesh`,{"rotation-x":-Math.PI/2,position:[0,.101,.7],children:[(0,W.jsx)(`planeGeometry`,{args:[1.2,.72]}),(0,W.jsx)(`meshStandardMaterial`,{color:`#232733`,metalness:.75,roughness:.22})]}),(0,W.jsxs)(`group`,{ref:n,position:[0,.1,-1.2],"rotation-x":Math.PI/2,children:[(0,W.jsx)(C,{args:[3.6,2.34,.06],radius:.04,smoothness:4,position:[0,1.17,-.03],children:v}),(0,W.jsxs)(`mesh`,{position:[0,1.17,.001],children:[(0,W.jsx)(`planeGeometry`,{args:[3.5,2.26]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#030407`})]}),(0,W.jsxs)(`mesh`,{position:[0,1.2,.002],children:[(0,W.jsx)(`planeGeometry`,{args:[3.36,2.1]}),(0,W.jsx)(`shaderMaterial`,{ref:i,vertexShader:G,fragmentShader:K,uniforms:m,toneMapped:!1})]}),(0,W.jsxs)(`mesh`,{position:[0,1.17,-.062],"rotation-y":Math.PI,children:[(0,W.jsx)(`planeGeometry`,{args:[.42,.42]}),(0,W.jsx)(`meshBasicMaterial`,{map:f,transparent:!0,toneMapped:!1})]})]}),(0,W.jsx)(O,{speed:1.6,rotationIntensity:.25,floatIntensity:.5,children:(0,W.jsxs)(`group`,{position:[2.35,1.05,.95],rotation:[.06,-.5,.05],children:[(0,W.jsx)(C,{args:[.8,1.66,.085],radius:.11,smoothness:5,children:(0,W.jsx)(`meshStandardMaterial`,{color:`#181b24`,metalness:.8,roughness:.28,envMapIntensity:1.4})}),(0,W.jsxs)(`mesh`,{position:[0,0,.0435],children:[(0,W.jsx)(`planeGeometry`,{args:[.74,1.555]}),(0,W.jsx)(`shaderMaterial`,{ref:a,vertexShader:G,fragmentShader:K,uniforms:g,toneMapped:!1})]}),(0,W.jsxs)(`mesh`,{position:[.18,.62,-.05],children:[(0,W.jsx)(`boxGeometry`,{args:[.3,.3,.03]}),(0,W.jsx)(`meshStandardMaterial`,{color:`#101219`,metalness:.9,roughness:.2})]})]})})]})}var X=192,Z=240;function Q(e,t,n,r=z.neon.badge){let i=e.getContext(`2d`);i.clearRect(0,0,X,Z),i.beginPath(),i.arc(96,92,80,0,Math.PI*2),i.fillStyle=r.fill,i.fill();let a=i.createLinearGradient(16,12,176,172);a.addColorStop(0,r.ring[0]),a.addColorStop(.55,r.ring[1]),a.addColorStop(1,r.ring[2]),i.lineWidth=5,i.strokeStyle=a,i.stroke(),n?(i.save(),t.invert&&(i.filter=`invert(1) brightness(1.2)`),i.drawImage(n,50,46,92,92),i.restore()):(i.font=`600 52px "JetBrains Mono", monospace`,i.fillStyle=r.ring[0],i.textAlign=`center`,i.fillText(t.glyph||t.name.slice(0,2),96,110)),i.font=`600 28px "Space Grotesk", system-ui, sans-serif`,i.fillStyle=r.text,i.textAlign=`center`,i.fillText(t.name,96,228)}async function $(e){let t=(await(await fetch(e)).text()).replace(/<svg\b/,`<svg width="128" height="128"`),n=URL.createObjectURL(new Blob([t],{type:`image/svg+xml`})),r=new Image;return r.src=n,await r.decode(),r}function _e({theme:e=`neon`}){let t=(0,A.useRef)(),r=(0,A.useRef)(0),i=(0,A.useRef)([]),a=(0,A.useMemo)(()=>n.map(e=>{let t=document.createElement(`canvas`);t.width=X,t.height=Z,Q(t,e);let n=new S(t);return n.colorSpace=l,{skill:e,canvas:t,tex:n}}),[]),s=(0,A.useMemo)(()=>{let e=a.length;return a.map((t,n)=>{let r=1-(n+.5)/e*2,i=Math.sqrt(1-r*r),a=n*Math.PI*(3-Math.sqrt(5));return new f(Math.cos(a)*i,r,Math.sin(a)*i).multiplyScalar(3.25)})},[a]),d=(0,A.useRef)(z[e].badge),p=e=>{Q(e.canvas,e.skill,e.img,d.current),e.tex.needsUpdate=!0};return(0,A.useEffect)(()=>{let e=!0;return document.fonts?.ready.then(()=>e&&a.forEach(p)),a.forEach(t=>{t.skill.icon&&$(t.skill.icon).then(n=>{e&&(t.img=n,p(t))}).catch(()=>{})}),()=>{e=!1}},[a]),(0,A.useEffect)(()=>{d.current=z[e].badge,a.forEach(p)},[e,a]),h(({clock:e},n)=>{let s=Math.max(0,1-Math.abs(o.section-2)*1.4),l=t.current;if(l.visible=s>.01,!l.visible)return;let[d,f,p,m]=L(c())[2],h=o.mouse;l.position.set(d+h.x,f+h.y,p),l.scale.setScalar(m*(.7+.3*s)),r.current+=n*.16,l.rotation.y=r.current+h.yaw,l.rotation.x=Math.sin(e.elapsedTime*.2)*.18+h.pitch;let g=o.skillHover;i.current.forEach((e,t)=>{if(!e)return;let r=!g||a[t].skill.group===g,i=(g&&r?.86:r?.66:.5)*s,o=u.damp(e.scale.x/.8,i,6,n);e.scale.set(o*.8,o,1),e.material.opacity=u.damp(e.material.opacity,s*(r?1:.22),6,n)})}),(0,W.jsx)(`group`,{ref:t,visible:!1,children:a.map((e,t)=>(0,W.jsx)(`sprite`,{ref:e=>i.current[t]=e,position:s[t],scale:[.5,.62,1],children:(0,W.jsx)(`spriteMaterial`,{map:e.tex,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1})},e.skill.name))})}var ve=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function ye(){let e=(0,A.useRef)([]),t=b(e=>e.invalidate);return(0,A.useEffect)(()=>{let n=()=>{e.current=s.map(e=>{let t=document.getElementById(e);return t?{top:t.getBoundingClientRect().top+window.scrollY,h:t.offsetHeight}:null})};n();let r=new ResizeObserver(n);return r.observe(document.body),window.addEventListener(`resize`,n),window.addEventListener(`scroll`,t,{passive:!0}),()=>{r.disconnect(),window.removeEventListener(`resize`,n),window.removeEventListener(`scroll`,t)}},[t]),h((t,n)=>{let i=e.current;if(i.length!==s.length||i.some(e=>!e))return;let a=window.scrollY,c=window.innerHeight,l=0;for(let e=0;e<i.length-1;e++){let t=i[e+1].top-c*.45;l+=ve(t-c*.35,t+c*.35,a)}o.section=r()?l:u.damp(o.section,l,3.5,n);let d=i[s.indexOf(`projects`)];o.projects.progress=Math.min(1,Math.max(0,(a-d.top)/(d.h-c)));let f=(a-(d.top-c*.85))/(c*.85),p=(d.top+d.h-c*.15-a)/(c*.85);o.projects.enter=Math.min(1,Math.max(0,Math.min(f,p)))}),null}function be(){return h(({camera:e},t)=>{let n=i.active&&!r(),a=n?i.x:0,s=n?i.y:0,c=o.mouse;c.yaw=u.damp(c.yaw,a*.6,2.5,t),c.pitch=u.damp(c.pitch,-s*.38,2.5,t),c.x=u.damp(c.x,a*.55,2,t),c.y=u.damp(c.y,s*.32,2,t),e.position.x=u.damp(e.position.x,a*.2,2,t),e.position.y=u.damp(e.position.y,s*.12,2,t),e.lookAt(0,0,0)}),null}function xe(){let e=(0,A.useRef)(!1);return h(()=>{e.current||(e.current=!0,o.ready=!0)}),null}function Se(){let e=z.neon,t=c(),n=r(),[i,a]=(0,A.useState)(1.5);return(0,W.jsx)(`div`,{className:`world`,"aria-hidden":`true`,children:(0,W.jsxs)(v,{camera:{position:[0,0,11],fov:45},dpr:[1,i],frameloop:n?`demand`:`always`,gl:{antialias:t,powerPreference:`high-performance`,alpha:!1},children:[(0,W.jsx)(`color`,{attach:`background`,args:[e.bg]}),(0,W.jsx)(j,{onDecline:()=>a(1)}),(0,W.jsx)(ye,{}),(0,W.jsx)(be,{}),(0,W.jsx)(xe,{}),(0,W.jsx)(fe,{count:t?7e3:16e3}),(0,W.jsx)(_e,{}),(0,W.jsx)(ge,{}),(0,W.jsx)(`ambientLight`,{intensity:.25}),(0,W.jsxs)(g,{resolution:256,frames:1,children:[(0,W.jsx)(y,{form:`rect`,intensity:2.5,color:`#ffffff`,position:[0,5,3],"rotation-x":Math.PI/2,scale:[10,3,1]}),(0,W.jsx)(y,{form:`rect`,intensity:5,color:`#22d3ee`,position:[-6,1,2],"rotation-y":Math.PI/2,scale:[5,6,1]}),(0,W.jsx)(y,{form:`rect`,intensity:5,color:`#f472b6`,position:[6,0,2],"rotation-y":-Math.PI/2,scale:[5,6,1]}),(0,W.jsx)(y,{form:`ring`,intensity:3,color:`#8b5cf6`,position:[0,2,-8],scale:6})]}),!t&&e.bloom&&(0,W.jsxs)(E,{multisampling:4,children:[(0,W.jsx)(T,{mipmapBlur:!0,intensity:.85,luminanceThreshold:.18,luminanceSmoothing:.25,radius:.75}),(0,W.jsx)(w,{offset:.25,darkness:.75})]})]})})}export{Se as default};