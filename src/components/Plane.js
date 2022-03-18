import React from 'react';

const Plane = (props) => {
  return (
    <mesh
      {...props} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[20, 20]}  />
      <meshStandardMaterial color={'#a9c388'} />
    </mesh>
  );
}

export default Plane;