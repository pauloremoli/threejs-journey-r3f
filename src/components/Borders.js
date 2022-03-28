import React from "react";
import { useThree } from "@react-three/fiber";
import { usePlane } from "@react-three/cannon";

function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }));
  return (
    <mesh rotation={[- Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
}

const Borders = () => {
  const { viewport } = useThree();
  return (
    <>
      {/* floor */}
      <Plane position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* left wall */}
      <Plane position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      {/* right wall */}
      <Plane position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, -5]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 5]} rotation={[0, -Math.PI, 0]} />
    </>
  );
};

export default Borders;
