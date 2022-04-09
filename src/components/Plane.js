import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector2 } from "three";

const vertexShader = `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    attribute vec3 position;
    uniform vec2 uFrequency;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.z += sin(modelPosition.x * uFrequency.x ) * 0.1;
      modelPosition.z += sin(modelPosition.y * uFrequency.y ) * 0.1;
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
  
  const { uFrequency } = useControls({  uFrequency: {x: 10, y: 5 }})

  const ref = useRef();

  const data = useMemo(
    () => ({
      fragmentShader,
      vertexShader,
      uniforms: {
          uFrequency: { value: new Vector2(uFrequency.x, uFrequency.y)}
      }
    }),
    [uFrequency]
  );

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <rawShaderMaterial attach="material" {...data} />
    </mesh>
  );
};

export default Plane;
