import React from 'react'

const Ball = React.forwardRef(function (props, ref) {
  return (
    <mesh {...props} ref={ref}>
        <sphereBufferGeometry args={[0.5, 16, 16]}/>
        <meshBasicMaterial color={"red"}/>
    </mesh>
  )
});

export default Ball