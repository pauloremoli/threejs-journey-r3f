import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

const Walls = (props) => {
  const bricksColorTexture = useLoader(
    TextureLoader,
    "/textures/bricks/color.jpg"
  );
  const bricksAmbientOcclusionTexture = useLoader(
    TextureLoader,
    "/textures/bricks/ambientOcclusion.jpg"
  );
  const bricksNormalTexture = useLoader(
    TextureLoader,
    "/textures/bricks/normal.jpg"
  );
  const bricksRoughnessTexture = useLoader(
    TextureLoader,
    "/textures/bricks/roughness.jpg"
  );

  const geomRef = useRef();

  React.useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute(
        "uv2",
        new THREE.BufferAttribute(geomRef.current.attributes.uv.array, 2)
      );
    }
  }, []);

  return (
    <mesh {...props} position={[0, 1.25, 0]} castShadow>
      <boxBufferGeometry ref={geomRef} args={[4, 2.5, 4]} />
      <meshStandardMaterial
        map={bricksColorTexture}
        aoMap={bricksAmbientOcclusionTexture}
        normalMap={bricksNormalTexture}
        roughnessMap={bricksRoughnessTexture}
      />
    </mesh>
  );
};

export default Walls;
