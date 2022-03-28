
import { Canvas } from '@react-three/fiber';
import React from 'react';
import './App.css';
import Scene from './components/Scene';

export default function App() {
  return (
    <Canvas className='canvas' camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}>
      <Scene />
    </Canvas>
  )
}

