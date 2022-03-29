import { useFrame, useLoader } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Fox = () => {
  const ref = useRef();
  const model = useLoader(GLTFLoader, "/fox/Fox.gltf");

  let mixer;
  if (model.animations.length) {
    mixer = new AnimationMixer(model.scene);
    const action = mixer.clipAction(model.animations[1]);
    action.play();
  }

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
    ref.current.position.z += delta * 0.2;
  });

  return <primitive ref={ref} object={model.scene}  scale={0.025} />;
};

export default Fox;
