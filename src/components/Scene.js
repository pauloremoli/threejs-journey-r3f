import React, { useEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Plane from './Plane';
import House from './House';
import Bushes from './Bushes';
import Graves from './Graves';

const Scene = () => {
  const { size, gl } = useThree();
  useEffect(() => {
    gl.setClearColor("#262837");
  }, [gl])

  return (
    <>

      <Suspense fallback={null}>
        <ambientLight color={"#b9d5ff"} intensity={0.12} />
        <directionalLight color={"#b9d5ff"} intensity={0.12} position={[4, 5, -2]} />
        <Plane position={[0, 0, 0]} />
        <House />
        <Bushes />
        <Graves />
        <OrbitControls enableDamping />
        <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={75} aspect={size.width / size.height} near={0.1} far={100} />
        <fog args={["#262837", 1, 15]} attach="fog" />
      </Suspense>
    </>
  );
}

export default Scene;