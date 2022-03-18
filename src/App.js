
import { Canvas } from '@react-three/fiber';
import React from 'react';
import './App.css';
import Scene from './components/Scene';

export default function App() {
  return (
    <Canvas className='canvas'>
      <Scene />
    </Canvas>
  )
}

