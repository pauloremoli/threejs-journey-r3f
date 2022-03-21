import React, {useRef} from "react";
import { useFrame } from '@react-three/fiber'

function Ghosts() {
  const ghost1Ref = useRef();
  const ghost2Ref = useRef();
  const ghost3Ref = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const ghost1Angle = elapsedTime * 0.5;
    ghost1Ref.current.position.x = Math.cos(ghost1Angle) * 4;
    ghost1Ref.current.position.y = Math.sin(ghost1Angle) * 4;
    ghost1Ref.current.position.z = Math.sin(ghost1Angle) * 3;

    const ghost2Angle = - elapsedTime * 0.32;
    ghost2Ref.current.position.x = Math.cos(ghost2Angle) * 5;
    ghost2Ref.current.position.y = Math.sin(ghost2Angle) * 5
    ghost2Ref.current.position.z = Math.sin(ghost2Angle) * 4 * Math.sin(elapsedTime * 2.5)

    
    const ghost3Angle = - elapsedTime * 0.18;
    ghost3Ref.current.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3Ref.current.position.y = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3Ref.current.position.z = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2)
  })

  return (
    <>
      <pointLight ref={ghost1Ref} args={["yellow", 2, 3]} />
      <pointLight ref={ghost2Ref} args={["blue", 2, 3]} />
      <pointLight ref={ghost3Ref} args={["red", 2, 3]} />
    </>
  );
}

export default Ghosts;
