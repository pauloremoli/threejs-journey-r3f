import { useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';


function Grave({ ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/scene.gltf')
    return (
      <group ref={group} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[3.39, -2.09, 6.74]} rotation={[-0.27, 0.6, 1.93]} />
          <group position={[0, 0, 1.1]}>
            <mesh geometry={nodes.Cube_0.geometry} material={materials['Material.001']} />
          </group>
        </group>
      </group>
    )
  }
  
  useGLTF.preload('/scene.gltf')

const Graves = (props) => {
    let graves = [];
    for (let index = 0; index < 40; index++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 3.2 + Math.random() * 6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const rotationZ = (Math.random() - 0.5) * 0.2;
        const rotationY = (Math.random() - 0.5) * 0.2;
        graves.push(<Grave key={index} scale={0.2} position={[x, -0.25, z]} rotation={[0, rotationY, rotationZ]}/> )
    };



    return (
        <Suspense fallback={null}>
            {graves}
        </Suspense>
    )
}

export default Graves;