import React from 'react'

export default function Door(props) {
  return (
    <mesh
      {...props} position={[0, 1, 2.01]}>
      <planeGeometry args={[2, 2]}  />
      <meshStandardMaterial color={'#a9c388'} />
    </mesh>
  )
}
