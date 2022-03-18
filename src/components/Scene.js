import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Plane from './Plane';
import House from './House';

const Scene = () => {
  const { size } = useThree();
  return (
    <>
      <ambientLight color={"#ffffff"} intensity={0.5} />
      <directionalLight color={"#ffffff"} intensity={0.5} position={[4, 5, -2]} />
      <Plane position={[0, 0, 0]} />
      <House />
      <OrbitControls enableDamping />
      <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={75} aspect={size.width / size.height} near={0.1} far={100} />

    </>
  );
}

export default Scene;