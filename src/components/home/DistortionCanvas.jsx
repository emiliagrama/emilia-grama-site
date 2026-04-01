import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragment = `
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  float dist = distance(uv, uMouse * 0.5 + 0.5);
  float strength = smoothstep(0.3, 0.0, dist);

  uv += strength * 0.05 * vec2(
    sin(uv.y * 10.0 + uTime),
    cos(uv.x * 10.0 + uTime)
  );

  vec4 color = texture2D(uTexture, uv);

  gl_FragColor = color;
}
`;

function DistortedPlane() {
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: new THREE.TextureLoader().load("/images/universe/intent-fill.jpg"),
      },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.mouse.x, state.mouse.y),
      0.05
    );
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
      />
    </mesh>
  );
}

export default function DistortionCanvas() {
  return (
    <Canvas>
      <DistortedPlane />
    </Canvas>
  );
}