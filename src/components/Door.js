import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';

export default function Door(props) {
  const doorColorTexture = useLoader(TextureLoader, '/textures/door/color.jpg');
  const doorAlphaTexture = useLoader(TextureLoader, ' /textures/door/alpha.jpg');
  const doorAmbientOcclusionTexture = useLoader(TextureLoader, ' /textures/door/ambientOcclusion.jpg');
  const doorHeightTexture = useLoader(TextureLoader, ' /textures/door/height.jpg');
  const doorNormalTexture = useLoader(TextureLoader, ' /textures/door/normal.jpg');
  const doorMetalnessTexture = useLoader(TextureLoader, ' /textures/door/metalness.jpg');
  const doorRoughnessTexture = useLoader(TextureLoader, ' /textures/door/roughness.jpg');

  const geomRef = useRef()

  React.useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute("uv2", new THREE.BufferAttribute(geomRef.current.attributes.uv.array, 2))
    }
  }, [])


  return (
    <mesh
      {...props} position={[0, 0.9, 2.01]}>
      <planeGeometry ref={geomRef} args={[2, 2, 100, 100]} />
      <meshStandardMaterial map={doorColorTexture} transparent alphaMap={doorAlphaTexture} aoMap={doorAmbientOcclusionTexture} displacementMap={doorHeightTexture} displacementScale={0.1} normalMap={doorNormalTexture} metalnessMap={doorMetalnessTexture} roughnessMap={doorRoughnessTexture} />
    </mesh>
  )
}
