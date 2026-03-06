import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uMouseEase;
uniform vec2 uClick;
uniform float uClickTime;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x)
       + (c - a) * u.y * (1.0 - u.x)
       + (d - b) * u.x * u.y;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;

  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot(0.45) * p * 2.0 + 17.0;
    a *= 0.5;
  }

  return v;
}

float ridged(vec2 p) {
  float v = 0.0;
  float a = 0.5;

  for (int i = 0; i < 6; i++) {
    float n = noise(p);
    n = 1.0 - abs(n * 2.0 - 1.0);
    v += n * a;
    p = rot(0.35) * p * 2.0 + 11.0;
    a *= 0.55;
  }

  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.14;

  vec2 m = (uMouseEase - 0.5) * 2.0;
  m.x *= uResolution.x / uResolution.y;

  vec2 clickPos = (uClick - 0.5) * 2.0;
  clickPos.x *= uResolution.x / uResolution.y;

  float md = length(p - m);
  float mouseField = smoothstep(0.8, 0.0, md);

  vec2 drift = vec2(t * 0.18, -t * 0.11);
  vec2 q = p * 3.2;

  vec2 warp = vec2(
    fbm(q + drift + vec2(0.0, t * 0.7)),
    fbm(q - drift + vec2(4.7, -t * 0.55))
  );

  vec2 pp = q + (warp - 0.5) * 2.2;

  pp += vec2(
    sin(t * 0.8 + p.y * 1.6) * 0.18,
    cos(t * 0.65 + p.x * 1.2) * 0.14
  );

  vec2 mouseWarpDir = normalize((p - m) + 0.0001);
  pp += mouseWarpDir * mouseField * 0.12;
  pp += vec2(
    sin(mouseField * 8.0 + t * 1.4),
    cos(mouseField * 7.0 - t * 1.2)
  ) * 0.04 * mouseField;

  float clickAge = uTime - uClickTime;
  float ripple = 0.0;

  if (uClickTime > 0.0 && clickAge < 1.6) {
    float d = length(p - clickPos);
    float wave = sin(22.0 * d - clickAge * 8.0);
    float envelope = exp(-3.0 * clickAge);
    float ring = smoothstep(0.16, 0.0, abs(d - clickAge * 0.42));
    ripple = wave * ring * envelope;

    vec2 rippleDir = normalize((p - clickPos) + 0.0001);
    pp += rippleDir * ripple * 0.16;
  }

  float r1 = ridged(pp * 1.1 + drift * 0.6);
  float r2 = ridged(pp * 2.3 - drift * 1.1 + 3.7);
  float r3 = ridged(pp * 4.8 + drift * 1.6 - 1.9);

  float net = r1 * 0.7 + r2 * 0.22 + r3 * 0.08;

  float thin = smoothstep(0.72, 0.86, net);
  float thick = smoothstep(0.58, 0.78, r1) * 0.65;
  float hot = smoothstep(0.84, 0.94, fbm(pp * 0.9 + 8.0 + drift * 0.7)) * 0.8;

  float lines = max(thin, thick * 0.75);
  lines += hot * thin * 0.35;
  lines += mouseField * 0.06;
  lines += max(ripple, 0.0) * 0.18;

  float fade = smoothstep(1.2, 0.3, length(p));
  lines *= fade;

  vec3 bg = vec3(0.01, 0.03, 0.08);
  vec3 c1 = vec3(0.55, 0.88, 1.0);
  vec3 c2 = vec3(0.95, 0.98, 1.0);

  vec3 col = bg;
  col += c1 * lines * 0.95;
  col += c2 * pow(lines, 2.2) * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`;

function ShaderPlane({ mouseRef, clickRef }) {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseEase: { value: new THREE.Vector2(0.5, 0.5) },
      uClick: { value: new THREE.Vector2(0.5, 0.5) },
      uClickTime: { value: -10 }
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;

    const { uniforms } = materialRef.current;
    const now = clock.getElapsedTime();

    uniforms.uTime.value = now;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

    uniforms.uMouseEase.value.lerp(
      new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
      0.06
    );

    uniforms.uClick.value.set(clickRef.current.x, clickRef.current.y);
    uniforms.uClickTime.value = clickRef.current.time;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function ShaderPanel() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const clickRef = useRef({ x: 0.5, y: 0.5, time: -10 });

  const getLocalCoords = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height
    };
  };

  const handlePointerMove = (e) => {
    mouseRef.current = getLocalCoords(e);
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: 0.5, y: 0.5 };
  };

  const startTimeRef = useRef(performance.now() / 1000);

  const handleClick = (e) => {
    const pos = getLocalCoords(e);
    clickRef.current = {
      ...pos,
      time: performance.now() / 1000 - startTimeRef.current
    };
  };

  return (
    <div
      className="shaderPanel"
      aria-hidden="true"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
        <ShaderPlane mouseRef={mouseRef} clickRef={clickRef} />
      </Canvas>
    </div>
  );
}