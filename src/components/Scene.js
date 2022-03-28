import {
  Physics
} from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import Borders from "./Borders";
import { Cube } from "./Cube";

const Scene = () => {

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <OrbitControls enableDamping />
      <directionalLight
        castShadow
        intensity={4}
        position={[50, 50, 25]}
        shadow-mapSize={[256, 256]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Physics defaultContactMaterial={{
            friction: 0.9,
            restitution: 0.7,
          }} gravity={[0, -40, 0]}>
        
          <Cube />
          <Borders />
      </Physics>
    </>
  );
};

export default Scene;
