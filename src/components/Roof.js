import React from 'react'

function Roof(props) {
    return (
        <mesh {...props} position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneBufferGeometry args={[3.5 , 1, 4]}/>
            <meshStandardMaterial color={'#b35f45'}/>
        </mesh>
    )
}

export default Roof