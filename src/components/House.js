import React, { useRef } from 'react';
import Walls from './Walls';
import Roof from './Roof';
import Door from './Door';
import Bushes from './Bushes';

const House = (props) => {
  const ref = useRef();
  return (
    <group ref={ref}
      {...props}>
      <Walls />
      <Roof />
      <Door/>
      <Bushes/>
    </group>
  );
}

export default House;