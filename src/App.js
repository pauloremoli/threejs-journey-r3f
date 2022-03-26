import { Canvas } from "@react-three/fiber";
import React from "react";
import "./App.css";
import Contact from "./components/Contact";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Scene from "./components/Scene";

export default function App() {
  return (
    <>
      <div className="webgl">
        <Canvas className="canvas">
          <Scene />
        </Canvas>
      </div>
      <Intro />
      <Projects />
      <Contact />
    </>
  );
}
