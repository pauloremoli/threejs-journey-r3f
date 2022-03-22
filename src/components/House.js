import React, { useRef } from 'react';
import Walls from './Walls';
import Roof from './Roof';
import Door from './Door';

const House = (props) => {
  const ref = useRef();
  return (
    <group ref={ref}
      {...props}>
      <Walls />
      <Roof />
      <Door/>
      <pointLight args={["#ff7d46", 1, 7]} position={[0, 2.2, 2.7]} castShadow/>
    </group>
  );
}

export default House;