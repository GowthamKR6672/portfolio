import { noiseGLSL } from './shaders.js'

const SHAPES = 8

const weights = Array.from({ length: SHAPES }, (_, k) => `float w${k} = wt(p, ${k}.0);`).join('\n  ')
const place = (k, attr) => `place(${attr}, ${k}) * w${k}`
const attrs = ['position', ...Array.from({ length: SHAPES - 1 }, (_, k) => `aS${k + 1}`)]

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uSize;
uniform float uPixelRatio;
uniform float uDim;
uniform vec4 uTilt;   // cos/sin of mouse yaw, cos/sin of mouse pitch
uniform vec2 uShift;  // drift toward the mouse
uniform vec4 uLayout[${SHAPES}];   // xyz offset, w scale
uniform vec2 uRot[${SHAPES}];      // cos/sin of each shape's spin
uniform vec3 uColA[${SHAPES}];
uniform vec3 uColB[${SHAPES}];
${Array.from({ length: SHAPES - 1 }, (_, k) => `attribute vec3 aS${k + 1};`).join('\n')}
attribute float aRandom;
varying vec3 vColor;
varying float vAlpha;

${noiseGLSL}

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
  float p = min(base + local, ${SHAPES - 1}.0);
  ${weights}

  vec3 pos = ${attrs.map((a, k) => place(k, a)).join('\n    + ')};

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

  vec3 ca = ${Array.from({ length: SHAPES }, (_, k) => `uColA[${k}] * w${k}`).join(' + ')};
  vec3 cb = ${Array.from({ length: SHAPES }, (_, k) => `uColB[${k}] * w${k}`).join(' + ')};
  vColor = mix(ca, cb, smoothstep(0.1, 0.9, aRandom));
  vAlpha = (0.45 + 0.55 * tw) * (1.0 - turb * 0.35) * uDim;
}
`

export const particleFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor * (0.8 + a * 0.9), a * vAlpha);
  #include <colorspace_fragment>
}
`
