import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import { Color } from "three";
import { Vector2 } from "three";

const vertexShader = `
    uniform vec2 uFrequency;
    uniform float uTime;
    uniform vec3 uColor;

    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
      elevation += sin(modelPosition.y * uFrequency.y - uTime ) * 0.1;
      modelPosition.z = elevation;
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
      vUv = uv;
      vElevation = elevation;
    }
`;

const fragmentShader = `
    uniform vec3 uColor;
    uniform sampler2D uTexture;
    
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vec4 textureColor = texture2D(uTexture, vUv);
      textureColor.rgb *= vElevation * 2.0 + 0.9;
      gl_FragColor = textureColor;
    }
`;

const Flag = ({flag, ...props}) => {
  const ukraineFlagTexture = useLoader(TextureLoader, flag)
  const { uFrequency } = useControls({ uFrequency: { x: 10, y: 5 } });
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.getElapsedTime();
    ref.current.material.uniforms.uFrequency.value.x = uFrequency.x;
    ref.current.material.uniforms.uFrequency.value.y = uFrequency.y;
    ref.current.material.uniforms.uniformsNeedUpdate = true;
  });

  const data = useMemo(
    () => ({
      fragmentShader,
      vertexShader,
      uniforms: {
        uFrequency: { value: new Vector2(uFrequency.x, uFrequency.y) },
        uTime: { value: 0 },
        uColor: { value: new Color('orange')},
        uTexture: {value: ukraineFlagTexture}
      },
    }),
    []
  );

  return (
    <mesh ref={ref} scale={[1, 2 / 3, 1]} {...props}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial attach="material" {...data} />
    </mesh>
  );
};

export default Flag;
