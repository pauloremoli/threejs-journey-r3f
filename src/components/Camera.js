import React, { useState, useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const useMove = () => {
  const [state, setState] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e) => {
    setState((state) => ({
      ...state,
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5,
    }));
  };
  return {
    mouseX: state.x,
    mouseY: state.y,
  };
};

const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setState((state) => ({
      ...state,
      x: window.scrollX,
      y: window.scrollY,
    }));
  };

  return {
    scrollX: state.x,
    scrollY: state.y
  };
};

const Camera = () => {
  const { mouseX, mouseY } = useMove();
  const { scrollY } = useScroll();
  const groupRef = useRef();
  const cameraRef = useRef();

  const { size } = useThree();

  useFrame(() => {
    cameraRef.current.position.y = (-scrollY / window.innerHeight) * 5;

    groupRef.current.position.x += (mouseX - groupRef.current.position.x) ;
    groupRef.current.position.y += (mouseY - groupRef.current.position.y) ;
  });
  
  return (
    <group ref={groupRef}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 3]}
        fov={75}
        aspect={size.width / size.height}
        near={0.1}
        far={100}
      />
    </group>
  );
};

export default Camera;
