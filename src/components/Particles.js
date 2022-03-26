import { useLoader, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { AdditiveBlending } from "three";

const Particles = () => {
  const pointsRef = useRef();
  const positionRef = useRef();

  const particlesCount = 200;
  const vertices = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let index = 0; index < particlesCount; index++) {
    vertices[index] = (Math.random() - 0.5) * 20;
    vertices[index + 1] =  5 * 0.5 - Math.random() - 0.5 * 5 * 3 * 20;
    vertices[index + 2] = -((Math.random() - 0.5) * 20);
    colors[index] = Math.random();
    colors[index + 1] = Math.random();
    colors[index + 2] = Math.random();
  }


  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
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
      <pointsMaterial
        vertexColors={true}
        blending={AdditiveBlending}
        depthWrite={false}
        transparent={true}
        size={0.05}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default Particles;