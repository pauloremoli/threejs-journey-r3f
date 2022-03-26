import { useScroll } from "../hooks/useScroll";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { NearestFilter } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useSpring, animated, config } from "@react-spring/three";

const Torus = ({ section, ...props }) => {
  const { currentSection } = useScroll();
  const [isCurrentSection, setIsCurrentSection] = useState(false);
  const gradient = useLoader(TextureLoader, "/textures/gradients/5.jpg");
  gradient.magFilter = NearestFilter;
  const ref = useRef();

  const { scale } = useSpring({
    scale: isCurrentSection ? 1 : 0.7,
    config: config.wobbly,
    delay: 200
  });

  useFrame(({ clock }) => {
    ref.current.rotation.x += 0.01;
  });

  useEffect(() => {
    setIsCurrentSection(currentSection === section);
    console.log(currentSection);
  }, [currentSection, section]);

  return (
    <animated.mesh scale={scale} {...props} ref={ref}>
      <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
      <meshToonMaterial gradientMap={gradient}  />
    </animated.mesh>
  );
};

export default Torus;
