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
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.9;

  // wave distortion
  p.x += sin(p.y * 8.0 + t) * 0.08;
  p.y += sin(p.x * 7.0 - t * 0.8) * 0.06;

  // secondary smaller wobble
  p.x += sin(p.y * 18.0 - t * 1.3) * 0.015;
  p.y += cos(p.x * 16.0 + t * 1.1) * 0.015;

  // grid scale
  float scale = 7.5;
  vec2 g = p * scale;

  float cx = floor(g.x);
  float cy = floor(g.y);

  // checker
  float checker = mod(cx + cy, 2.0);

  // local cell coords
  vec2 cell = fract(g) - 0.5;

  // make each square slightly rounded / organic
  float mask = max(abs(cell.x), abs(cell.y));
  float square = smoothstep(0.44, 0.40, mask);

  // invert checker so white shapes appear on black
  float col = checker * square;

  // subtle vignette
  float vignette = smoothstep(1.4, 0.35, length((uv - 0.5) * 2.0));
  col *= vignette;

  vec3 bg = vec3(0.02, 0.02, 0.03);
  vec3 fg = vec3(0.88, 0.88, 0.9);

  vec3 finalColor = mix(bg, fg, col);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function WaveGridPlane() {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
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

export default function WaveGridPanel() {
  return (
    <div className="waveGridPanel" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
        <WaveGridPlane />
      </Canvas>
    </div>
  );
}