import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Burguer = () => {
  const ref = useRef();
  const model = useLoader(GLTFLoader, "/burguer/burguer.glb");

  return <primitive ref={ref} object={model.scene}  scale={[2, 2, 2]} position={[0, -1, 0]}/>;
};

export default Burguer;
