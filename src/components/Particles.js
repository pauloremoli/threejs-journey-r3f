import { useLoader, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {AdditiveBlending} from "three";

function Particles() {
  const pointsRef = useRef();
  const positionRef = useRef();
  const starTexture = useLoader(TextureLoader, "/textures/particles/11.png");

  const particlesCount = 5000;
  const vertices = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let index = 0; index < vertices.length; index++) {
    vertices[index] = (Math.random() - 0.5) * 20;
    colors[index] = Math.random();
  }

  useFrame(({ clock }) => {

    for (let i = 0; i < vertices.length; i++) {
      const i3 = i * 3;
      const x = positionRef.current.array[ i3 ];
      positionRef.current.array[ i3 + 1] =  Math.sin(x + clock.getElapsedTime());
    }
    positionRef.current.needsUpdate = true;

  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry" >
      <bufferAttribute
          attachObject={["attributes", "position"]}
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
          ref={positionRef}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} blending={AdditiveBlending} depthWrite={false} transparent={true} size={0.1} sizeAttenuation={true} alphaMap={starTexture}/>
    </points>
  );
}

export default Particles;
