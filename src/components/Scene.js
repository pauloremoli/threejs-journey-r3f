import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';
import Plane from './Plane';

const Scene = () => {
  const { size } = useThree();
  return (
    <>
      <ambientLight color={"#ffffff"} intensity={0.5} />
      <directionalLight color={"#ffffff"} intensity={0.5} position={[4, 5, -2]} />
      <OrbitControls enableDamping />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} aspect={size.width / size.height} near={0.1} far={100} />
      <Plane/>
    </>
  );
}

export default Scene;