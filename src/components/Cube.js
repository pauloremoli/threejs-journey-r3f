import { useBox } from "@react-three/cannon";
import React from "react";

export function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref}>
      <boxGeometry />
    </mesh>
  );
}
