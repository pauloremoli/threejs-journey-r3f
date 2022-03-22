import React from "react";

function Bush(props) {
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
}

const Bushes = (props) => {
  return (
    <group {...props}>
      <Bush position={[-1.3, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} castShadow />
      <Bush position={[1.3, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} castShadow />
      <Bush position={[-1.6, 0.1, 2.1]} scale={[0.1, 0.1, 0.1]} castShadow />
      <Bush position={[1.5, 0.1, 2.2]} scale={[0.15, 0.2, 0.1]} castShadow />
    </group>
  );
};

export default Bushes;
