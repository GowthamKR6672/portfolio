import { noiseGLSL } from '../../three/shaders.js'

export const earthVertex = /* glsl */ `
varying vec3 vObj;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vObj = normalize(position);
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`

// A procedural Earth: noise continents, drifting clouds, day/night terminator
// and a thin blue rim. No textures to download.
export const earthFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uLight;
varying vec3 vObj;
varying vec3 vNormal;
varying vec3 vView;
${noiseGLSL}
float fbm(vec3 p){
  float f = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ f += a * snoise(p); p *= 2.03; a *= 0.5; }
  return f;
}
void main(){
  vec3 p = vObj;
  float land = smoothstep(0.02, 0.1, fbm(p * 1.7 + 3.1));
  vec3 ocean = mix(vec3(0.004, 0.025, 0.07), vec3(0.01, 0.07, 0.16), fbm(p * 5.0) * 0.5 + 0.5);
  vec3 ground = mix(vec3(0.04, 0.07, 0.04), vec3(0.17, 0.14, 0.09), fbm(p * 7.0) * 0.5 + 0.5);
  vec3 col = mix(ocean, ground, land);
  float clouds = smoothstep(0.08, 0.62, fbm(p * 2.6 + vec3(uTime * 0.012, uTime * 0.004, 0.0)));
  col = mix(col, vec3(0.9, 0.93, 0.97), clouds * 0.82);
  vec3 n = normalize(vNormal);
  float diff = max(dot(n, normalize(uLight)), 0.0);
  float night = 1.0 - smoothstep(0.0, 0.25, diff);
  // city lights on the night side
  float cities = smoothstep(0.55, 0.75, snoise(p * 40.0)) * land * (1.0 - clouds);
  col = col * (0.035 + diff * 1.15) + vec3(1.0, 0.7, 0.35) * cities * night * 0.6;
  float fres = pow(1.0 - max(dot(n, normalize(vView)), 0.0), 2.6);
  col += vec3(0.3, 0.62, 1.0) * fres * (0.25 + diff * 1.4);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

export const haloVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`
export const haloFragment = /* glsl */ `
uniform vec3 uLight;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vec3 n = normalize(vNormal);
  float rim = pow(1.0 - abs(dot(n, normalize(vView))), 3.0);
  float lit = 0.35 + 0.65 * clamp(dot(n, normalize(uLight)) + 0.4, 0.0, 1.0);
  gl_FragColor = vec4(vec3(0.35, 0.65, 1.0) * rim * lit * 1.6, rim);
}
`
