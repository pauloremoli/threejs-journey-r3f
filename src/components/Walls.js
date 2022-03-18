import React from 'react'

const Walls = (props) => {
    return (
        <mesh {...props} position={[0, 1.25, 0]}>
            <boxBufferGeometry args={[4, 2.5, 4]}/>
            <meshStandardMaterial color={'#ac8e82'}/>
        </mesh>
    )
}

export default Walls