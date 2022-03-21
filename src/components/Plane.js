import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';

const Plane = (props) => {

  const grassColorTexture = useLoader(TextureLoader, '/textures/grass/color.jpg');
  const grassAmbientOcclusionTexture = useLoader(TextureLoader, '/textures/grass/ambientOcclusion.jpg')
  const grassNormalTexture = useLoader(TextureLoader, '/textures/grass/normal.jpg');
  const grassRoughnessTexture = useLoader(TextureLoader, '/textures/grass/roughness.jpg');

  const geomRef = useRef();

  React.useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute("uv2", new THREE.BufferAttribute(geomRef.current.attributes.uv.array, 2))
    }
  }, [])

  React.useEffect(() => {
    if (grassColorTexture) {
      grassColorTexture.repeat.set(8, 8);
      grassColorTexture.wrapS = grassColorTexture.wrapT = THREE.RepeatWrapping;
    }
  }, [grassColorTexture])


  React.useEffect(() => {
    if (grassAmbientOcclusionTexture) {
      grassAmbientOcclusionTexture.repeat.set(8, 8);
      grassAmbientOcclusionTexture.wrapS = grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    }
  }, [grassAmbientOcclusionTexture])


  React.useEffect(() => {
    if (grassNormalTexture) {
      grassNormalTexture.wrapS = grassNormalTexture.wrapT = THREE.RepeatWrapping;
      grassNormalTexture.repeat.set(8, 8);
    }
  }, [grassNormalTexture])


  React.useEffect(() => {
    if (grassRoughnessTexture) {
      grassRoughnessTexture.repeat.set(8, 8);
      grassRoughnessTexture.wrapS = grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
    }
  }, [grassRoughnessTexture])

  return (
    <mesh
      {...props} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry ref={geomRef} args={[20, 20]} />
      <meshStandardMaterial map={grassColorTexture} aoMap={grassAmbientOcclusionTexture} normalMap={grassNormalTexture} roughnessMap={grassRoughnessTexture} />
    </mesh>
  );
}

export default Plane;