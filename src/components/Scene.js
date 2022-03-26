
import { useThree } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import Camera from "./Camera";
import Particles from "./Particles";
import Torus from "./Torus";

const Scene = () => {
  const { gl } = useThree();

  useEffect(() => {
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.alpha = true;
  }, [gl]);

  return (
    <>
      <ambientLight color={"#ffffff"} intensity={0.5} />
      <directionalLight
        color={"#ffffff"}
        intensity={0.5}
        position={[4, 0, -2]}
      />

      <Camera />
      <Suspense fallback={null}>
        <Particles/>
        <Torus position={[0, 0, 0]} section={0}/>
        <Torus position={[0, -5, 0]} section={1}/>
        <Torus position={[0, -10, 0]} section={2}/>
      </Suspense>
    </>
  );
};

export default Scene;
