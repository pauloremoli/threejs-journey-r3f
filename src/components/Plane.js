import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { Vector2 } from "three";

const vertexShader = `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    attribute vec3 position;
    uniform vec2 uFrequency;
    uniform float uTime;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
      modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime ) * 0.1;
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
`;

const fragmentShader = `
    precision mediump float;
    
    void main() {
      gl_FragColor = vec4(1.0, 0, 0, 1.0);
    }
`;

const Plane = () => {
  const { uFrequency } = useControls({ uFrequency: { x: 10, y: 5 } });

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.getElapsedTime();
    ref.current.material.uniforms.uFrequency.value.x = uFrequency.x;
    ref.current.material.uniforms.uFrequency.value.y = uFrequency.y;
    ref.current.material.uniforms.uniformsNeedUpdate = true;
  });

  const ref = useRef();


  const data = useMemo(
    () => ({
      fragmentShader,
      vertexShader,
      uniforms: {
        uFrequency: { value: new Vector2(uFrequency.x, uFrequency.y) },
        uTime: { value: 0 },
      },
    }),
    []
  );

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <rawShaderMaterial attach="material" {...data} />
    </mesh>
  );
};

export default Plane;
