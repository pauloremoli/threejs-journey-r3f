import React, { useMemo, useRef } from "react";
import { Vector3, Raycaster } from "three";
import Ball from "./Ball";
import { useFrame } from "@react-three/fiber";

function MyRaycaster() {
  const ball1Ref = useRef();
  const ball2Ref = useRef();
  const ball3Ref = useRef();

  const raycaster = useMemo(
    () => {
    const rayDirection = new Vector3(20, 0, 0);
    rayDirection.normalize();
    return new Raycaster(new Vector3(-4, 0, 0), rayDirection);
    }, []
  );
  useFrame(({clock}) => {
		ball1Ref.current.position.y = Math.sin(clock.getElapsedTime());
		ball2Ref.current.position.y = Math.sin(clock.getElapsedTime() *.9);
		ball3Ref.current.position.y = Math.sin(clock.getElapsedTime() *.8);
    const intersections = raycaster.intersectObjects([
      ball1Ref.current,
      ball2Ref.current,
      ball3Ref.current,
    ]);
    [ball1Ref, ball2Ref, ball3Ref].forEach((ref) =>
      ref.current.material.color.set("red")
    );
    for (const intersect of intersections)
      intersect.object.material.color.set("#0000ff");
  });

  return (
    <>
      <Ball position={[3, 0, 0]} ref={ball1Ref} />
      <Ball position={[0, 0, 0]} ref={ball2Ref} />
      <Ball position={[-3, 0, 0]} ref={ball3Ref} />
    </>
  );
}

export default MyRaycaster;
