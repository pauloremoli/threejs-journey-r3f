import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Particles from "./Particles";

const Scene = () => {
  const { size } = useThree();
  return (
    <>
    <Suspense fallback={null}>
      <ambientLight color={"#ffffff"} intensity={0.5} />
      <directionalLight color={"#ffffff"} intensity={0.5} position={[4, 5, -2]} />
      <Particles />
      <OrbitControls enableDamping />
      <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={75} aspect={size.width / size.height} near={0.1} far={100} />
      </Suspense>
    </>
  );
}

export default Scene;