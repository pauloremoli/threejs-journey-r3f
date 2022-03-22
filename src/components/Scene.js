import React, {useState, useRef} from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree} from '@react-three/fiber'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Scene = () => {
  const { size } = useThree();
  return (
    <>
      <ambientLight color={"#ffffff"} intensity={0.5} />
      <directionalLight color={"#ffffff"} intensity={0.5} position={[4, 5, -2]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls enableDamping />
      <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={75} aspect={size.width / size.height} near={0.1} far={100} />

    </>
  );
}

export default Scene;