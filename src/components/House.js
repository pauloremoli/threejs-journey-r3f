import React, { useRef } from 'react';
import Door from './Door';
import Roof from './Roof';
import Walls from './Walls';

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