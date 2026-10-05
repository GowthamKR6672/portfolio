import{At as e,Dt as t,Tt as n,i as r,r as i,wt as a}from"./index-D27oaUML.js";import{$ as o,A as s,B as c,E as l,G as u,M as d,N as f,O as p,R as m,U as h,W as g,X as _,Z as v,a as ee,at as y,b,ct as te,g as x,it as ne,j as re,l as S,m as C,n as ie,o as ae,ot as w,q as oe,s as se,t as ce,tt as T,u as le,v as E,y as D,z as ue}from"./Lightformer-B4rBo3G5.js";import{a as O,i as k,n as de,r as A,t as j}from"./shaders-BLsZ7NNp.js";import{t as fe}from"./screens-5oz_lhmH.js";import{n as M}from"./OrbitSite-CvhZxyrm.js";var N=e(t()),pe=e(n()),P=new y,me=new y,F=new y,he=new ne;function ge(e,t,n){let r=P.setFromMatrixPosition(e.matrixWorld);r.project(t);let i=n.width/2,a=n.height/2;return[r.x*i+i,-(r.y*a)+a]}function _e(e,t){let n=P.setFromMatrixPosition(e.matrixWorld),r=me.setFromMatrixPosition(t.matrixWorld),i=n.sub(r),a=t.getWorldDirection(F);return i.angleTo(a)>Math.PI/2}function ve(e,t,n,r){let i=P.setFromMatrixPosition(e.matrixWorld),a=i.clone();a.project(t),he.set(a.x,a.y),n.setFromCamera(he,t);let o=n.intersectObjects(r,!0);if(o.length){let e=o[0].distance;return i.distanceTo(n.ray.origin)<e}return!0}function ye(e,t){if(t instanceof h)return t.zoom;if(t instanceof g){let n=P.setFromMatrixPosition(e.matrixWorld),r=me.setFromMatrixPosition(t.matrixWorld),i=t.fov*Math.PI/180,a=n.distanceTo(r);return 1/(2*Math.tan(i/2)*a)}return 1}function be(e,t,n){if(t instanceof g||t instanceof h){let r=P.setFromMatrixPosition(e.matrixWorld),i=me.setFromMatrixPosition(t.matrixWorld),a=r.distanceTo(i),o=(n[1]-n[0])/(t.far-t.near),s=n[1]-o*t.far;return Math.round(o*a+s)}}var xe=e=>Math.abs(e)<1e-10?0:e;function Se(e,t,n=``){let r=`matrix3d(`;for(let n=0;n!==16;n++)r+=xe(t[n]*e.elements[n])+(n===15?`)`:`,`);return n+r}var Ce=(e=>t=>Se(t,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),we=(e=>(t,n)=>Se(t,e(n),`translate(-50%,-50%)`))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]);function Te(e){return e&&typeof e==`object`&&`current`in e}var I=N.forwardRef(({children:e,eps:t=.001,style:n,className:r,prepend:i,center:a,fullscreen:o,portal:s,distanceFactor:c,sprite:l=!1,transform:u=!1,occlude:d,onOcclude:f,castShadow:p,receiveShadow:m,material:h,geometry:g,zIndexRange:_=[16777271,0],calculatePosition:v=ge,as:ee=`div`,wrapperClass:b,pointerEvents:te=`auto`,...x},ne)=>{let{gl:re,camera:C,scene:ie,size:w,raycaster:oe,events:se,viewport:ce}=le(),[T]=N.useState(()=>document.createElement(ee)),E=N.useRef(null),D=N.useRef(null),ue=N.useRef(0),O=N.useRef([0,0]),k=N.useRef(null),de=N.useRef(null),A=s?.current||se.connected||re.domElement.parentNode,j=N.useRef(null),fe=N.useRef(!1),M=N.useMemo(()=>d&&d!==`blending`||Array.isArray(d)&&d.length&&Te(d[0]),[d]);N.useLayoutEffect(()=>{let e=re.domElement;d&&d===`blending`?(e.style.zIndex=`${Math.floor(_[0]/2)}`,e.style.position=`absolute`,e.style.pointerEvents=`none`):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[d]),N.useLayoutEffect(()=>{if(D.current){let e=E.current=pe.createRoot(T);if(ie.updateMatrixWorld(),u)T.style.cssText=`position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;else{let e=v(D.current,C,w);T.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return A&&(i?A.prepend(T):A.appendChild(T)),()=>{A&&A.removeChild(T),e.unmount()}}},[A,u]),N.useLayoutEffect(()=>{b&&(T.className=b)},[b]);let P=N.useMemo(()=>u?{position:`absolute`,top:0,left:0,width:w.width,height:w.height,transformStyle:`preserve-3d`,pointerEvents:`none`}:{position:`absolute`,transform:a?`translate3d(-50%,-50%,0)`:`none`,...o&&{top:-w.height/2,left:-w.width/2,width:w.width,height:w.height},...n},[n,a,o,w,u]),me=N.useMemo(()=>({position:`absolute`,pointerEvents:te}),[te]);N.useLayoutEffect(()=>{if(fe.current=!1,u){var t;(t=E.current)==null||t.render(N.createElement(`div`,{ref:k,style:P},N.createElement(`div`,{ref:de,style:me},N.createElement(`div`,{ref:ne,className:r,style:n,children:e}))))}else{var i;(i=E.current)==null||i.render(N.createElement(`div`,{ref:ne,style:P,className:r,children:e}))}});let F=N.useRef(!0);S(e=>{if(D.current){C.updateMatrixWorld(),D.current.updateWorldMatrix(!0,!1);let e=u?O.current:v(D.current,C,w);if(u||Math.abs(ue.current-C.zoom)>t||Math.abs(O.current[0]-e[0])>t||Math.abs(O.current[1]-e[1])>t){let t=_e(D.current,C),n=!1;M&&(Array.isArray(d)?n=d.map(e=>e.current):d!==`blending`&&(n=[ie]));let r=F.current;if(n){let e=ve(D.current,C,oe,n);F.current=e&&!t}else F.current=!t;r!==F.current&&(f?f(!F.current):T.style.display=F.current?`block`:`none`);let i=Math.floor(_[0]/2),a=d?M?[_[0],i]:[i-1,0]:_;if(T.style.zIndex=`${be(D.current,C,a)}`,u){let[e,t]=[w.width/2,w.height/2],n=C.projectionMatrix.elements[5]*t,{isOrthographicCamera:r,top:i,left:a,bottom:o,right:s}=C,u=Ce(C.matrixWorldInverse),d=r?`scale(${n})translate(${xe(-(s+a)/2)}px,${xe((i+o)/2)}px)`:`translateZ(${n}px)`,f=D.current.matrixWorld;l&&(f=C.matrixWorldInverse.clone().transpose().copyPosition(f).scale(D.current.scale),f.elements[3]=f.elements[7]=f.elements[11]=0,f.elements[15]=1),T.style.width=w.width+`px`,T.style.height=w.height+`px`,T.style.perspective=r?``:`${n}px`,k.current&&de.current&&(k.current.style.transform=`${d}${u}translate(${e}px,${t}px)`,de.current.style.transform=we(f,1/((c||10)/400)))}else{let t=c===void 0?1:ye(D.current,C)*c;T.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}O.current=e,ue.current=C.zoom}}if(!M&&j.current&&!fe.current){if(u){if(k.current){let e=k.current.children[0];if(e!=null&&e.clientWidth&&e!=null&&e.clientHeight){let{isOrthographicCamera:t}=C;if(t||g)x.scale&&(Array.isArray(x.scale)?x.scale instanceof y?j.current.scale.copy(x.scale.clone().divideScalar(1)):j.current.scale.set(1/x.scale[0],1/x.scale[1],1/x.scale[2]):j.current.scale.setScalar(1/x.scale));else{let t=(c||10)/400,n=e.clientWidth*t,r=e.clientHeight*t;j.current.scale.set(n,r,1)}fe.current=!0}}}else{let t=T.children[0];if(t!=null&&t.clientWidth&&t!=null&&t.clientHeight){let e=1/ce.factor,n=t.clientWidth*e,r=t.clientHeight*e;j.current.scale.set(n,r,1),fe.current=!0}j.current.lookAt(e.camera.position)}}});let he=N.useMemo(()=>({vertexShader:u?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[u]);return N.createElement(`group`,ae({},x,{ref:D}),d&&!M&&N.createElement(`mesh`,{castShadow:p,receiveShadow:m,ref:j},g||N.createElement(`planeGeometry`,null),h||N.createElement(`shaderMaterial`,{side:2,vertexShader:he.vertexShader,fragmentShader:he.fragmentShader})))}),Ee=ee>=125?`uv1`:`uv2`,De=new x,Oe=new y,ke=class extends s{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new l([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new l([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new re(t,6,1);return this.setAttribute(`instanceStart`,new d(n,3,0)),this.setAttribute(`instanceEnd`,new d(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new re(n,t*2,1);return this.setAttribute(`instanceColorStart`,new d(r,t,0)),this.setAttribute(`instanceColorEnd`,new d(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new te(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new x);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),De.setFromBufferAttribute(t),this.boundingBox.union(De))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)Oe.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(Oe)),Oe.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(Oe));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}},Ae=class extends ke{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(t===3)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},je=class extends oe{constructor(e){super({type:`LineMaterial`,uniforms:T.clone(T.merge([C.common,C.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ne(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${ee>=154?`colorspace_fragment`:`encodings_fragment`}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA=`1`:delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return`WORLD_UNITS`in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return`USE_DASH`in this.defines},set(e){!!e!=`USE_DASH`in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return`USE_ALPHA_TO_COVERAGE`in this.defines},set:function(e){!!e!=`USE_ALPHA_TO_COVERAGE`in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}},Me=new w,Ne=new y,Pe=new y,L=new w,R=new w,z=new w,Fe=new y,Ie=new ue,B=new f,Le=new y,Re=new x,ze=new _,V=new w,H,U;function Be(e,t,n){return V.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),V.multiplyScalar(1/V.w),V.x=U/n.width,V.y=U/n.height,V.applyMatrix4(e.projectionMatrixInverse),V.multiplyScalar(1/V.w),Math.abs(Math.max(V.x,V.y))}function Ve(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){B.start.fromBufferAttribute(i,r),B.end.fromBufferAttribute(a,r),B.applyMatrix4(n);let o=new y,s=new y;H.distanceSqToSegment(B.start,B.end,s,o),s.distanceTo(o)<U*.5&&t.push({point:s,pointOnLine:o,distance:H.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,[Ee]:null})}}function He(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;H.at(1,z),z.w=1,z.applyMatrix4(t.matrixWorldInverse),z.applyMatrix4(r),z.multiplyScalar(1/z.w),z.x*=i.x/2,z.y*=i.y/2,z.z=0,Fe.copy(z),Ie.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(L.fromBufferAttribute(s,t),R.fromBufferAttribute(c,t),L.w=1,R.w=1,L.applyMatrix4(Ie),R.applyMatrix4(Ie),L.z>u&&R.z>u)continue;if(L.z>u){let e=L.z-R.z,t=(L.z-u)/e;L.lerp(R,t)}else if(R.z>u){let e=R.z-L.z,t=(R.z-u)/e;R.lerp(L,t)}L.applyMatrix4(r),R.applyMatrix4(r),L.multiplyScalar(1/L.w),R.multiplyScalar(1/R.w),L.x*=i.x/2,L.y*=i.y/2,R.x*=i.x/2,R.y*=i.y/2,B.start.copy(L),B.start.z=0,B.end.copy(R),B.end.z=0;let o=B.closestPointToPointParameter(Fe,!0);B.at(o,Le);let l=m.lerp(L.z,R.z,o),d=l>=-1&&l<=1,f=Fe.distanceTo(Le)<U*.5;if(d&&f){B.start.fromBufferAttribute(s,t),B.end.fromBufferAttribute(c,t),B.start.applyMatrix4(a),B.end.applyMatrix4(a);let r=new y,i=new y;H.distanceSqToSegment(B.start,B.end,i,r),n.push({point:i,pointOnLine:r,distance:H.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,[Ee]:null})}}}var Ue=class extends c{constructor(e=new ke,t=new je({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Ne.fromBufferAttribute(t,e),Pe.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Ne.distanceTo(Pe);let i=new re(r,2,1);return e.setAttribute(`instanceDistanceStart`,new d(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new d(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;H=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;U=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),ze.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?U*.5:Be(r,Math.max(r.near,ze.distanceToPoint(H.origin)),s.resolution),ze.radius+=c,H.intersectsSphere(ze)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Re.copy(o.boundingBox).applyMatrix4(a);let l;l=n?U*.5:Be(r,Math.max(r.near,Re.distanceToPoint(H.origin)),s.resolution),Re.expandByScalar(l),H.intersectsBox(Re)!==!1&&(n?Ve(this,t):He(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Me),this.material.uniforms.resolution.value.set(Me.z,Me.w))}},We=class extends Ue{constructor(e=new Ae,t=new je({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},Ge=N.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:i,segments:a,dashed:o,...s},c){var l;let u=le(e=>e.size),d=N.useMemo(()=>a?new Ue:new We,[a]),[f]=N.useState(()=>new je),p=(n==null||(l=n[0])==null?void 0:l.length)===4?4:3,m=N.useMemo(()=>{let r=a?new ke:new Ae,i=e.map(e=>{let t=Array.isArray(e);return e instanceof y||e instanceof w?[e.x,e.y,e.z]:e instanceof ne?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=16777215;let e=n.map(e=>e instanceof b?e.toArray():e);r.setColors(e.flat(),p)}return r},[e,a,n,p]);return N.useLayoutEffect(()=>{d.computeLineDistances()},[e,d]),N.useLayoutEffect(()=>{o?f.defines.USE_DASH=``:delete f.defines.USE_DASH,f.needsUpdate=!0},[o,f]),N.useEffect(()=>()=>{m.dispose(),f.dispose()},[m]),N.createElement(`primitive`,ae({object:d,ref:c},s),N.createElement(`primitive`,{object:m,attach:`geometry`}),N.createElement(`primitive`,ae({object:f,attach:`material`,color:t,vertexColors:!!n,resolution:[u.width,u.height],linewidth:r??i??1,dashed:o,transparent:p===4},s)))}),Ke=parseInt(`186`.replace(/\D+/g,``)),qe=class extends oe{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${Ke>=154?`colorspace_fragment`:`encodings_fragment`}>
      }`})}},Je=e=>new y().setFromSpherical(new v(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Ye=N.forwardRef(({radius:e=100,depth:t=50,count:n=5e3,saturation:r=0,factor:i=4,fade:a=!1,speed:o=1},s)=>{let c=N.useRef(null),[l,u,d]=N.useMemo(()=>{let a=[],o=[],s=Array.from({length:n},()=>(.5+.5*Math.random())*i),c=new b,l=e+t,u=t/n;for(let e=0;e<n;e++)l-=u*Math.random(),a.push(...Je(l).toArray()),c.setHSL(e/n,r,.9),o.push(c.r,c.g,c.b);return[new Float32Array(a),new Float32Array(o),new Float32Array(s)]},[n,t,i,e,r]);S(e=>c.current&&(c.current.uniforms.time.value=e.clock.elapsedTime*o));let[f]=N.useState(()=>new qe);return N.createElement(`points`,{ref:s},N.createElement(`bufferGeometry`,null,N.createElement(`bufferAttribute`,{attach:`attributes-position`,args:[l,3]}),N.createElement(`bufferAttribute`,{attach:`attributes-color`,args:[u,3]}),N.createElement(`bufferAttribute`,{attach:`attributes-size`,args:[d,1]})),N.createElement(`primitive`,{ref:c,object:f,attach:`material`,blending:2,"uniforms-fade-value":a,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Xe=`
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
`,Ze=`
uniform float uTime;
uniform vec3 uLight;
varying vec3 vObj;
varying vec3 vNormal;
varying vec3 vView;
${j}
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
`,Qe=`
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,$e=`
uniform vec3 uLight;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vec3 n = normalize(vNormal);
  float rim = pow(1.0 - abs(dot(n, normalize(vView))), 3.0);
  float lit = 0.35 + 0.65 * clamp(dot(n, normalize(uLight)) + 0.4, 0.0, 1.0);
  gl_FragColor = vec4(vec3(0.35, 0.65, 1.0) * rim * lit * 1.6, rim);
}
`,W=a(),G=e=>new y(...e),et=e=>e*e*e*(e*(e*6-15)+10),K=typeof window<`u`&&window.innerWidth<760,tt=[[0,-22,-6],[7,-22,-17],[-3,-22,-28],[5,-22,-39]],q=[0,-22,-56],nt=[1,-1,1,-1],J=[{pos:[-1,3,26],look:[5,-6,-10]},{pos:[3.2,2.4,9.5],look:[.2,.6,0]},{pos:[1.75,1.6,3.4],look:[0,1.1,0]},{pos:[-1.6,1.55,1.6],look:[-4.4,.95,-2.2]},{pos:[-1,-4.2,6],look:[0,-10,-8]},...tt.map((e,t)=>({pos:[e[0]-1.2*nt[t],e[1]+.7,e[2]+6.2],look:[e[0]+1.9*nt[t],e[1],e[2]]})),K?{pos:[0,-20.6,-41],look:[0,-22.6,-56]}:{pos:[0,-20.6,-43],look:[0,-22.6,-56]},K?{pos:[.3,-20,-65.5],look:[.3,-21.5,-78]}:{pos:[0,-19.7,-66.5],look:[0,-20.2,-78]},K?{pos:[0,-13.3,-88],look:[0,-14.1,-100]}:{pos:[-1.6,-13.3,-89],look:[-1.6,-14.1,-100]},{pos:[0,3.2,17],look:[1.5,-1,-4]}],rt=J.length-2;function it(e,t,n,r=!0){let i=document.createElement(`canvas`);i.width=e,i.height=t,n(i.getContext(`2d`),e,t);let a=new D(i);return r&&(a.colorSpace=u),a.anisotropy=8,a}var at=()=>it(512,512,(e,t,n)=>{e.fillStyle=`#a8792a`,e.fillRect(0,0,t,n);let r=7,i=()=>(r=r*16807%2147483647)/2147483647;for(let r=0;r<520;r++){let r=i()*t,a=i()*n,o=40+i()*50;e.fillStyle=`hsla(${36+i()*10}, ${55+i()*30}%, ${o}%, 0.55)`,e.beginPath(),e.moveTo(r,a),e.lineTo(r+(i()-.5)*90,a+(i()-.5)*90),e.lineTo(r+(i()-.5)*90,a+(i()-.5)*90),e.fill()}}),ot=()=>it(512,640,(e,t,n)=>{e.fillStyle=`#8f9aab`,e.fillRect(0,0,t,n);let r=t/6,i=n/8;for(let t=0;t<6;t++)for(let n=0;n<8;n++){let a=e.createLinearGradient(t*r,n*i,(t+1)*r,(n+1)*i);a.addColorStop(0,`#1b2f5c`),a.addColorStop(.5,`#0c1835`),a.addColorStop(1,`#14264d`),e.fillStyle=a,e.fillRect(t*r+3,n*i+3,r-6,i-6),e.strokeStyle=`rgba(160,180,220,0.18)`,e.lineWidth=1;for(let a=1;a<4;a++)e.beginPath(),e.moveTo(t*r+3,n*i+a*i/4),e.lineTo((t+1)*r-3,n*i+a*i/4),e.stroke()}}),st=()=>it(256,256,(e,t,n)=>{let r=3,i=()=>(r=r*16807%2147483647)/2147483647;for(let r=0;r<14;r++){let r=t*(.3+i()*.4),a=n*(.35+i()*.3),o=t*(.12+i()*.2),s=e.createRadialGradient(r,a,0,r,a,o);s.addColorStop(0,`rgba(255,255,255,0.55)`),s.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=s,e.fillRect(0,0,t,n)}}),ct=()=>it(64,512,(e,t,n)=>{let r=e.createLinearGradient(0,0,0,n);r.addColorStop(0,`rgba(255,255,255,0.9)`),r.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=r,e.fillRect(0,0,t,n);let i=e.createLinearGradient(0,0,t,0);i.addColorStop(0,`rgba(0,0,0,1)`),i.addColorStop(.5,`rgba(0,0,0,0)`),i.addColorStop(1,`rgba(0,0,0,1)`),e.globalCompositeOperation=`destination-out`,e.fillStyle=i,e.fillRect(0,0,t,n)}),lt=e=>it(256,256,(t,n,r)=>{let i=t.createRadialGradient(n/2,r/2,0,n/2,r/2,n/2);i.addColorStop(0,e),i.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=i,t.fillRect(0,0,n,r)});function ut({sky:e}){let t=(0,N.useRef)(),n=(0,N.useRef)(),r=(0,N.useMemo)(()=>new y(-.6,.75,.55).normalize(),[]),i=(0,N.useMemo)(()=>({uTime:{value:0},uLight:{value:r}}),[r]),a=(0,N.useMemo)(()=>({uLight:{value:r}}),[r]);return S((r,i)=>{n.current.uniforms.uTime.value+=i,t.current.rotation.y+=i*.004,t.current.visible=e.current<.35}),(0,W.jsxs)(`group`,{ref:t,position:[10,-34,-30],rotation:[.3,0,0],children:[(0,W.jsxs)(`mesh`,{children:[(0,W.jsx)(`sphereGeometry`,{args:[30,160,160]}),(0,W.jsx)(`shaderMaterial`,{ref:n,vertexShader:Xe,fragmentShader:Ze,uniforms:i})]}),(0,W.jsxs)(`mesh`,{scale:1.035,children:[(0,W.jsx)(`sphereGeometry`,{args:[30,96,96]}),(0,W.jsx)(`shaderMaterial`,{vertexShader:Qe,fragmentShader:$e,uniforms:a,side:1,transparent:!0,depthWrite:!1,blending:2})]})]})}function dt({active:e}){let t=(0,N.useRef)(),n=(0,N.useMemo)(at,[]),r=(0,N.useMemo)(ot,[]);S(({clock:e})=>{t.current.rotation.y=-.5+Math.sin(e.elapsedTime*.08)*.12,t.current.rotation.z=.05+Math.sin(e.elapsedTime*.11)*.03});let i=(0,W.jsx)(`meshStandardMaterial`,{color:`#c9ced6`,metalness:.9,roughness:.25});return(0,W.jsxs)(`group`,{ref:t,position:[0,1,0],rotation:[.12,-.5,.05],children:[(0,W.jsxs)(`mesh`,{children:[(0,W.jsx)(`boxGeometry`,{args:[1.1,1.5,1.1]}),(0,W.jsx)(`meshStandardMaterial`,{map:n,color:`#f0c069`,metalness:1,roughness:.36})]}),(0,W.jsxs)(`mesh`,{position:[0,.79,0],children:[(0,W.jsx)(`boxGeometry`,{args:[1.16,.08,1.16]}),i]}),(0,W.jsxs)(`mesh`,{position:[0,-.79,0],children:[(0,W.jsx)(`boxGeometry`,{args:[1.16,.08,1.16]}),i]}),(0,W.jsxs)(`group`,{position:[.18,1,.12],rotation:[.55,0,.35],children:[(0,W.jsxs)(`mesh`,{children:[(0,W.jsx)(`sphereGeometry`,{args:[.4,40,16,0,Math.PI*2,0,Math.PI/3.1]}),(0,W.jsx)(`meshStandardMaterial`,{color:`#e9ebee`,metalness:.5,roughness:.3,side:2})]}),(0,W.jsxs)(`mesh`,{position:[0,.12,0],children:[(0,W.jsx)(`cylinderGeometry`,{args:[.015,.015,.45,8]}),i]})]}),[[.3,.2,.56],[-.25,-.3,.56]].map((e,t)=>(0,W.jsxs)(`mesh`,{position:e,rotation:[Math.PI/2,0,0],children:[(0,W.jsx)(`cylinderGeometry`,{args:[.09,.11,.14,24]}),(0,W.jsx)(`meshStandardMaterial`,{color:`#1a1d24`,metalness:.8,roughness:.2})]},t)),[-1,1].map(e=>(0,W.jsxs)(`group`,{position:[e*.55,.05,0],children:[(0,W.jsxs)(`mesh`,{position:[e*.42,0,0],rotation:[0,0,Math.PI/2],children:[(0,W.jsx)(`cylinderGeometry`,{args:[.03,.03,.85,10]}),i]}),[0,1,2,3].map(t=>(0,W.jsxs)(`mesh`,{position:[e*(1.4+t*1.12),0,0],children:[(0,W.jsx)(`boxGeometry`,{args:[1.07,.035,1.35]}),(0,W.jsx)(`meshStandardMaterial`,{map:r,metalness:.7,roughness:.28,envMapIntensity:1.4})]},t))]},e)),M[1].callouts.map(t=>(0,W.jsx)(I,{position:[t.at[0],t.at[1]-1,t.at[2]],center:!1,zIndexRange:[20,0],children:(0,W.jsxs)(`div`,{className:`ob-callout ${e===1?`is-on`:``}`,children:[(0,W.jsx)(`span`,{className:`ob-callout__ring`}),(0,W.jsxs)(`span`,{className:`ob-callout__text`,children:[(0,W.jsx)(`b`,{children:t.title}),t.sub]})]})},t.title))]})}function ft(){let e=(0,N.useMemo)(()=>{let e=42,t=()=>(e=e*16807%2147483647)/2147483647,n=Array.from({length:46},()=>new y((t()-.5)*34,(t()-.2)*16,-8-t()*14)),r=[];n.forEach((e,t)=>{n.map((t,n)=>({j:n,d:e.distanceTo(t)})).filter(e=>e.j>t&&e.d<6).sort((e,t)=>e.d-t.d).slice(0,2).forEach(({j:t})=>r.push(e,n[t]))});let i=[];return n.forEach(e=>{i.push(G([e.x-.18,e.y,e.z]),G([e.x+.18,e.y,e.z]),G([e.x,e.y-.18,e.z]),G([e.x,e.y+.18,e.z]))}),{lines:new E().setFromPoints(r),cross:new E().setFromPoints(i)}},[]);return(0,W.jsxs)(`group`,{children:[(0,W.jsx)(`lineSegments`,{geometry:e.lines,children:(0,W.jsx)(`lineBasicMaterial`,{color:`#cfe9ff`,transparent:!0,opacity:.14,depthWrite:!1})}),(0,W.jsx)(`lineSegments`,{geometry:e.cross,children:(0,W.jsx)(`lineBasicMaterial`,{color:`#ffffff`,transparent:!0,opacity:.55,depthWrite:!1})})]})}function pt({sky:e}){let t=(0,N.useRef)(),n=(0,N.useRef)([]),r=(0,N.useMemo)(st,[]),i=(0,N.useMemo)(()=>{let e=11,t=()=>(e=e*16807%2147483647)/2147483647,n=Array.from({length:110},()=>({p:[(t()-.5)*34,-6-t()*13,14-t()*80],s:5+t()*9,o:.35+t()*.4})),r=Array.from({length:110},()=>({p:[(t()-.5)*44,-26.5-t()*2.5,6-t()*120],s:8+t()*10,o:.6+t()*.3}));return[...n,...r]},[]);return S(()=>{let r=m.smoothstep(e.current,.12,.6);t.current.visible=r>.01,n.current.forEach((e,t)=>e&&(e.opacity=i[t].o*r))}),(0,W.jsx)(`group`,{ref:t,children:i.map((e,t)=>(0,W.jsx)(`sprite`,{position:e.p,scale:[e.s,e.s*.6,1],children:(0,W.jsx)(`spriteMaterial`,{ref:e=>n.current[t]=e,map:r,transparent:!0,opacity:0,depthWrite:!1,color:`#e9eef5`})},t))})}function mt({position:e}){let t=(0,N.useMemo)(ct,[]);return(0,W.jsx)(`group`,{position:e,children:[-.9,0,.8].map((e,n)=>(0,W.jsxs)(`mesh`,{position:[e,5.5,-.6+n*.3],rotation:[0,0,(n-1)*.12],children:[(0,W.jsx)(`planeGeometry`,{args:[.9+n*.3,9]}),(0,W.jsx)(`meshBasicMaterial`,{map:t,transparent:!0,opacity:.22,blending:2,depthWrite:!1,fog:!1})]},n))})}function ht({active:e,sky:t}){let n=(0,N.useRef)(),r=(0,N.useMemo)(()=>fe(),[]),i=(0,N.useMemo)(()=>r.laptop.map(e=>{let t=new D(e);return t.colorSpace=u,t.anisotropy=8,t}),[r]),a=(0,N.useRef)(0),o=(0,N.useRef)([]);return S(({clock:s},c)=>{a.current+=c;let l=e-4;l>=0&&l<4&&a.current>.07&&(a.current=0,r.draw(l,s.elapsedTime),i[l].needsUpdate=!0),o.current.forEach((e,t)=>e&&(e.rotation.z+=c*(t%2?-.2:.25))),n.current.visible=t.current>.3}),(0,W.jsx)(`group`,{ref:n,children:tt.map((e,t)=>(0,W.jsxs)(`group`,{position:e,rotation:[0,-nt[t]*.22,0],children:[(0,W.jsx)(O,{args:[3.9,2.55,.32],radius:.08,smoothness:4,children:(0,W.jsx)(`meshStandardMaterial`,{color:`#cfd5dc`,metalness:.75,roughness:.32})}),(0,W.jsxs)(`mesh`,{position:[0,0,.165],children:[(0,W.jsx)(`planeGeometry`,{args:[3.6,2.28]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#05070b`})]}),(0,W.jsxs)(`mesh`,{position:[0,0,.17],children:[(0,W.jsx)(`planeGeometry`,{args:[3.44,2.15]}),(0,W.jsx)(`meshBasicMaterial`,{map:i[t],toneMapped:!1})]}),[[-1.8,1.12],[1.8,1.12],[-1.8,-1.12],[1.8,-1.12]].map(([e,t],n)=>(0,W.jsxs)(`mesh`,{position:[e,t,.18],rotation:[Math.PI/2,0,0],children:[(0,W.jsx)(`cylinderGeometry`,{args:[.05,.05,.04,12]}),(0,W.jsx)(`meshStandardMaterial`,{color:`#8a939f`,metalness:.9,roughness:.2})]},n)),(0,W.jsxs)(`mesh`,{ref:e=>o.current[t]=e,position:[0,0,-.4],children:[(0,W.jsx)(`torusGeometry`,{args:[2.6,.012,8,160]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#ffffff`,transparent:!0,opacity:.55,fog:!1})]}),(0,W.jsx)(mt,{position:[0,0,0]})]},t))})}var Y=Object.fromEntries(M.map((e,t)=>[e.kind===`project`?e.id:e.kind,t])),gt=e=>Math.min(1,Math.max(0,e)),_t=e=>1-(1-e)**3,vt=2;function yt(e){let t=(0,N.useRef)({on:!1,t0:0});return n=>(e&&!t.current.on&&(t.current={on:!0,t0:n}),e||(t.current.on=!1),t.current.on?n-t.current.t0:1/0)}var X={w:1.5,h:1.75,d:.7,gx:1.75,gy:2},bt=e=>K?[q[0]+(e%3-1)*X.gx,q[1]+(2-Math.floor(e/3))*X.gy+1.6]:[q[0]+(e%5-2)*X.gx,q[1]+(1-Math.floor(e/5))*X.gy+.4];function xt({sky:e,active:t}){let n=(0,N.useRef)(),r=(0,N.useRef)([]),i=(0,N.useRef)([]),a=(0,N.useRef)(Array(15).fill(0)),[o,s]=(0,N.useState)(-1),c=(0,N.useMemo)(()=>lt(`rgba(255,140,60,0.9)`),[]),l=M[Y.array].repos,u=t===Y.array,d=yt(u);return S(({clock:t},s)=>{n.current.visible=u&&e.current>.3;let c=t.elapsedTime,l=d(c);r.current.forEach((e,t)=>{if(!e)return;let n=_t(gt((l-.15-t*.06)/.9));a.current[t]=m.damp(a.current[t],o===t?.45:0,8,s);let[r,u]=bt(t);e.position.set(r,u-(1-n)*1.2,q[2]-(1-n)*7+a.current[t]),e.rotation.y=(1-n)*(t%2?.9:-.9);let d=o===t?1.6:.6+.4*Math.sin(c*1.6+t*1.3);i.current[t]?.color.setRGB(2*d,.9*d,.3*d)})}),(0,W.jsxs)(`group`,{ref:n,children:[l.map((e,t)=>(0,W.jsxs)(`group`,{ref:e=>r.current[t]=e,position:[...bt(t),q[2]],children:[(0,W.jsx)(O,{args:[X.w,X.h,X.d],radius:.05,smoothness:3,children:(0,W.jsx)(`meshStandardMaterial`,{color:`#1a1d24`,metalness:.85,roughness:.32})}),(0,W.jsxs)(`mesh`,{position:[0,X.h/2-.2,X.d/2+.006],children:[(0,W.jsx)(`planeGeometry`,{args:[X.w-.3,.08]}),(0,W.jsx)(`meshBasicMaterial`,{ref:e=>i.current[t]=e,toneMapped:!1})]}),u&&(0,W.jsx)(I,{transform:!0,position:[0,-.08,X.d/2+.01],distanceFactor:vt,zIndexRange:[4,1],children:(0,W.jsxs)(`a`,{className:`ob-rcard ${o===t?`is-hover`:``}`,href:e.url,target:`_blank`,rel:`noreferrer`,style:{"--d":`${.7+t*.06}s`},onPointerEnter:()=>s(t),onPointerLeave:()=>s(-1),onFocus:()=>s(t),onBlur:()=>s(-1),children:[(0,W.jsxs)(`span`,{className:`ob-rcard__top`,children:[(0,W.jsx)(`span`,{children:String(t+1).padStart(2,`0`)}),(0,W.jsx)(`span`,{children:e.category})]}),(0,W.jsx)(`b`,{className:`ob-rcard__title`,children:e.title}),(0,W.jsx)(`span`,{className:`ob-rcard__stack`,children:e.stack.join(` · `)}),(0,W.jsx)(`span`,{className:`ob-rcard__link`,children:`GitHub ↗`})]})})]},e.url)),(0,W.jsx)(`sprite`,{position:[q[0],q[1]+.5,q[2]-3],scale:[16,10,1],children:(0,W.jsx)(`spriteMaterial`,{map:c,transparent:!0,opacity:.5,blending:2,depthWrite:!1})})]})}var Z=[0,-20,-78],Q=K?{from:3.6,to:-3.6,at:-1.3}:{from:-6.2,to:6.2,at:-.6},St=K?[2.7,.9,-.9,-2.7]:[-4.5,-1.5,1.5,4.5],Ct=e=>{let t=Q.from+(Q.to-Q.from)*e;return K?[Z[0]+Q.at,Z[1]+t,Z[2]]:[Z[0]+t,Z[1]+Q.at,Z[2]]},wt=e=>K?[Z[0]+Q.at,Z[1]+St[e],Z[2]]:[Z[0]+St[e],Z[1]+Q.at,Z[2]],Tt=.62;function Et({arc:e}){let t=(0,N.useRef)(),n=(0,N.useRef)(-1);return S(()=>{let r=Math.max(.002,e.current);Math.abs(r-n.current)<.004||(n.current=r,t.current.geometry.dispose(),t.current.geometry=new o(Tt,.035,10,120,r*Math.PI*2))}),(0,W.jsxs)(`mesh`,{ref:t,rotation:[0,Math.PI,Math.PI/2],children:[(0,W.jsx)(`torusGeometry`,{args:[Tt,.035,10,120,.01]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#e8f6ff`,toneMapped:!1})]})}function Dt({sky:e,active:t}){let n=(0,N.useRef)(),r=(0,N.useRef)(),i=(0,N.useRef)(),a=(0,N.useRef)([]),o=(0,N.useRef)([0,0,0,0].map(()=>({current:0}))),s=(0,N.useMemo)(()=>[...M[Y.education].entries].reverse(),[]),c=t===Y.education,l=yt(c),u=Math.abs(Q.to-Q.from),d=(0,N.useMemo)(()=>{let e=[];for(let t=0;t<=40;t++){let n=Ct(t/40),r=t%5==0?.14:.06;K?e.push(G([n[0]-r,n[1],n[2]]),G([n[0]+r,n[1],n[2]])):e.push(G([n[0],n[1]-r,n[2]]),G([n[0],n[1]+r,n[2]]))}return new E().setFromPoints(e)},[]);return S(({clock:t})=>{if(n.current.visible=c&&e.current>.3,!c)return;let u=t.elapsedTime,d=l(u),f=_t(gt((d-.1)/1.3)),p=Ct(f/2);r.current.position.set(...p),r.current.scale.set(K?1:Math.max(f,.001),K?Math.max(f,.001):1,1);let m=f<1?f:u*.22%1;i.current.position.set(...Ct(m)),i.current.visible=d>.1,a.current.forEach((e,t)=>{if(!e)return;let n=_t(gt((d-.45-t*.32)/.6));e.scale.setScalar(Math.max(n,.001)),e.rotation.z=(1-n)*1.2,o.current[t].current=s[t].pct/100*_t(gt((d-.75-t*.32)/1.3))})}),(0,W.jsxs)(`group`,{ref:n,children:[(0,W.jsxs)(`mesh`,{ref:r,children:[(0,W.jsx)(`boxGeometry`,{args:K?[.02,u,.02]:[u,.02,.02]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#e8f6ff`,toneMapped:!1})]}),(0,W.jsx)(`lineSegments`,{geometry:d,children:(0,W.jsx)(`lineBasicMaterial`,{color:`#cfe9ff`,transparent:!0,opacity:.35})}),(0,W.jsxs)(`mesh`,{ref:i,children:[(0,W.jsx)(`sphereGeometry`,{args:[.07,16,16]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#ffffff`,toneMapped:!1})]}),s.map((e,t)=>(0,W.jsxs)(`group`,{position:wt(t),children:[(0,W.jsxs)(`group`,{ref:e=>a.current[t]=e,children:[(0,W.jsxs)(`mesh`,{children:[(0,W.jsx)(`torusGeometry`,{args:[Tt,.012,8,120]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#cfe9ff`,transparent:!0,opacity:.28})]}),(0,W.jsx)(Et,{arc:o.current[t]}),(0,W.jsxs)(`mesh`,{children:[(0,W.jsx)(`sphereGeometry`,{args:[.13,24,24]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#ffffff`,toneMapped:!1})]}),(0,W.jsxs)(`mesh`,{children:[(0,W.jsx)(`sphereGeometry`,{args:[.3,24,24]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#9ad9ff`,transparent:!0,opacity:.18,depthWrite:!1})]})]}),(0,W.jsx)(Ge,{points:K?[[.7,0,0],[1.07,0,0]]:[[0,-.7,0],[0,-1.12,0]],color:`#ffffff`,lineWidth:1,transparent:!0,opacity:.7}),c&&(0,W.jsxs)(W.Fragment,{children:[!K&&(0,W.jsx)(I,{position:[0,.98,0],center:!0,zIndexRange:[9,6],children:(0,W.jsx)(`span`,{className:`ob-eduS`,style:{"--d":`${.9+t*.32}s`},children:e.score})}),(0,W.jsx)(I,{position:K?[1.17,0,0]:[0,-1.22,0],zIndexRange:[9,6],children:(0,W.jsxs)(`div`,{className:`ob-eduL ${K?`ob-eduL--side`:``}`,style:{"--d":`${.8+t*.32}s`},children:[(0,W.jsxs)(`span`,{className:`ob-eduL__years`,children:[`+ `,e.years,K&&(0,W.jsxs)(`em`,{children:[` · `,e.score]})]}),(0,W.jsx)(`b`,{className:`ob-eduL__degree`,children:e.degree}),(0,W.jsxs)(`span`,{className:`ob-eduL__school`,children:[e.school,e.place?`, ${e.place}`:``]})]})})]})]},e.degree))]})}var $=[0,K?-12.4:-14,-100],Ot=K?2.4:3.9,kt=K?2.3:1.8;function At({sky:e,active:t}){let n=(0,N.useRef)(),r=(0,N.useRef)(),i=(0,N.useRef)(),a=(0,N.useRef)([]),o=M[Y.credentials].items,s=t===Y.credentials,c=yt(s),l=(0,N.useMemo)(()=>{let e=[];for(let t=0;t<=96;t++){let n=t/96*Math.PI*2;e.push(G([$[0]+Math.cos(n)*Ot,$[1]+Math.sin(n)*kt-.2,$[2]+Math.sin(n)*1.2]))}return e},[]);return S(({clock:t},l)=>{n.current.visible=s&&e.current>.3;let u=t.elapsedTime,d=c(u);r.current.rotation.x+=l*.3,r.current.rotation.y+=l*.4,i.current.scale.setScalar(1+Math.sin(u*2)*.06);let f=u*.12;a.current.forEach((e,t)=>{if(!e)return;let n=_t(gt((d-.2-t*.12)/1.1)),r=f+t/o.length*Math.PI*2;e.position.set($[0]+Math.cos(r)*Ot*n,$[1]+(Math.sin(r)*kt-.2)*n,$[2]+Math.sin(r)*1.2*n),e.scale.setScalar(.2+.8*n),e.rotation.y=Math.sin(u*.8+t)*.35})}),(0,W.jsxs)(`group`,{ref:n,children:[(0,W.jsx)(Ge,{points:l,color:`#cfe9ff`,lineWidth:1,transparent:!0,opacity:.35}),(0,W.jsxs)(`group`,{position:$,children:[(0,W.jsxs)(`mesh`,{ref:r,children:[(0,W.jsx)(`icosahedronGeometry`,{args:[1,1]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#ffffff`,wireframe:!0,transparent:!0,opacity:.55})]}),(0,W.jsxs)(`mesh`,{ref:i,children:[(0,W.jsx)(`sphereGeometry`,{args:[.55,32,32]}),(0,W.jsx)(`meshBasicMaterial`,{color:`#cfe9ff`,toneMapped:!1})]})]}),o.map((e,t)=>{let n=e.type===`Achievement`;return(0,W.jsxs)(`group`,{ref:e=>a.current[t]=e,position:$,children:[(0,W.jsxs)(`mesh`,{rotation:[Math.PI/2,0,0],children:[(0,W.jsx)(`cylinderGeometry`,{args:[.62,.62,.14,6]}),(0,W.jsx)(`meshStandardMaterial`,{color:n?`#c9a24f`:`#cfd6de`,metalness:.9,roughness:.25})]}),(0,W.jsxs)(`mesh`,{position:[0,0,.075],children:[(0,W.jsx)(`torusGeometry`,{args:[.44,.025,8,48]}),(0,W.jsx)(`meshBasicMaterial`,{color:n?`#ffd27a`:`#e8f6ff`,toneMapped:!1})]}),s&&(0,W.jsx)(I,{position:[0,-.95,0],center:!0,zIndexRange:[9,6],children:(0,W.jsxs)(`div`,{className:`ob-cred ${n?`ob-cred--gold`:``}`,style:{"--d":`${.9+t*.12}s`},children:[(0,W.jsx)(`span`,{children:e.type}),(0,W.jsx)(`b`,{children:e.title}),e.sub&&(0,W.jsx)(`small`,{children:e.sub})]})})]},e.title)})]})}function jt({journey:e,sky:t}){let{camera:n,scene:a}=le(),o=(0,N.useMemo)(()=>new y,[]),s=(0,N.useMemo)(()=>({a:new y,b:new y,c:new y,d:new y}),[]),c=(0,N.useMemo)(()=>new b(`#02040a`),[]),l=(0,N.useMemo)(()=>new b(`#93a6bc`),[]);return(0,N.useLayoutEffect)(()=>{a.background=new b(`#02040a`),a.fog=new p(`#02040a`,0)},[a]),S((u,d)=>{let f=e.current;f.progress=r()?f.target:m.damp(f.progress,f.target,1.6,d);let p=Math.min(Math.max(f.progress+1,0),J.length-1),h=Math.floor(p),g=Math.min(h+1,J.length-1),_=et(p-h);s.a.fromArray(J[h].pos),s.b.fromArray(J[g].pos),s.c.fromArray(J[h].look),s.d.fromArray(J[g].look);let v=u.clock.elapsedTime,ee=i.active?i.x:0,y=i.active?i.y:0;n.position.lerpVectors(s.a,s.b,_),n.position.x+=Math.sin(v*.2)*.08+ee*.35,n.position.y+=Math.cos(v*.17)*.06+y*.2,o.lerpVectors(s.c,s.d,_),n.lookAt(o);let b=m.smoothstep(-n.position.y,1.5,6.5);t.current=b,a.background.lerpColors(c,l,b),a.fog.color.copy(a.background),a.fog.density=b*.03,f.onSky?.(m.smoothstep(-n.position.y,5,8)*(1-m.smoothstep(-n.position.y,18,21)))}),null}function Mt({sky:e}){let t=(0,N.useRef)();return S(()=>{t.current.visible=e.current<.7}),(0,W.jsxs)(`group`,{ref:t,children:[(0,W.jsx)(Ye,{radius:90,depth:50,count:4e3,factor:3.2,saturation:0,fade:!0,speed:.3}),(0,W.jsx)(ft,{})]})}function Nt({journey:e,active:t,onReady:n}){let r=(0,N.useRef)(0),i=typeof window<`u`&&window.innerWidth<760;return(0,W.jsxs)(se,{className:`ob-canvas`,camera:{position:J[0].pos,fov:i?60:42,near:.1,far:400},dpr:[1,1.6],gl:{antialias:!0,powerPreference:`high-performance`},onCreated:()=>n?.(),children:[(0,W.jsx)(jt,{journey:e,sky:r}),(0,W.jsx)(`ambientLight`,{intensity:.35}),(0,W.jsx)(`directionalLight`,{position:[-6,8,6],intensity:2.2,color:`#fff6e8`}),(0,W.jsxs)(ie,{resolution:256,frames:1,children:[(0,W.jsx)(ce,{form:`rect`,intensity:3,color:`#ffffff`,position:[-4,6,4],scale:[10,4,1]}),(0,W.jsx)(ce,{form:`rect`,intensity:2,color:`#9ad9ff`,position:[6,-2,3],"rotation-y":-Math.PI/2,scale:[6,6,1]}),(0,W.jsx)(ce,{form:`ring`,intensity:1.5,color:`#4da6ff`,position:[0,-6,-6],scale:8})]}),(0,W.jsx)(Mt,{sky:r}),(0,W.jsx)(ut,{sky:r}),(0,W.jsx)(dt,{active:t}),(0,W.jsx)(pt,{sky:r}),(0,W.jsx)(ht,{active:t,sky:r}),(0,W.jsx)(xt,{sky:r,active:t}),(0,W.jsx)(Dt,{sky:r,active:t}),(0,W.jsx)(At,{sky:r,active:t}),!i&&(0,W.jsxs)(A,{multisampling:4,children:[(0,W.jsx)(de,{mipmapBlur:!0,intensity:.55,luminanceThreshold:.62,luminanceSmoothing:.2}),(0,W.jsx)(k,{offset:.3,darkness:.7})]})]})}export{rt as LAST,Nt as default};