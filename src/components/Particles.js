import React, { useRef, useCallback, useEffect, useState } from "react";
import { useControls } from "leva";
import { AdditiveBlending, Color } from "three";

function Particles() {
  const {
    particlesCount,
    particleSize,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  } = useControls({
    particlesCount: { value: 100000, min: 100, max: 1000000, step: 100 },
    particleSize: { value: 0.01, min: 0.001, max: 3, step: 0.01 },
    radius: { value: 5, min: 0.01, max: 20, step: 0.01 },
    branches: { value: 3, min: 2, max: 20, step: 1 },
    spin: { value: 1, min: -5, max: 5, step: 0.01 },
    randomness: { value: 0.2, min: 0, max: 2, step: 0.01 },
    randomnessPower: { value: 3, min: 1, max: 10, step: 0.1 },
    insideColor: { value: "#ff8040" },
    outsideColor: { value: "#8080ff" },
  });

  const pointsRef = useRef();
  const positionRef = useRef();
  const colorRef = useRef();

  const [positions, setPositions] = useState(
    new Float32Array(particlesCount * 3)
  );

  const [colors, setColors] = useState(new Float32Array(particlesCount * 3));

  
  useEffect(() => {
    const inColor = new Color(insideColor);
    const outColor = new Color(outsideColor);

    for (let index = 0; index < colors.length / 3; index++) {
      const rad = Math.random() * radius;
      const mixedColor = inColor.clone();
      mixedColor.lerp(outColor, rad / radius);

      const i3 = index * 3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    colorRef.current.needsUpdate = true;
  }, [colors,
    radius,
    insideColor,
    outsideColor,
  ]);

  useEffect(() => {

    for (let index = 0; index < positions.length / 3; index++) {
      // position
      const rad = Math.random() * radius;
      const spinAngle = rad * spin;
      const branchAngle = ((index % branches) / branches) * Math.PI * 2;
      const i3 = index * 3;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        rad;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        rad;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        rad;

      positions[i3] = Math.cos(branchAngle + spinAngle) * rad + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * rad + randomZ;

    }

    positionRef.current.needsUpdate = true;
  }, [
    positions,
    colors,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower
  ]);

  useEffect(() => {
    pointsRef.current.geometry.dispose();
    pointsRef.current.material.dispose();
    setPositions(new Float32Array(particlesCount * 3));

    pointsRef.current.geometry.dispose();
    pointsRef.current.material.dispose();
    setColors(new Float32Array(particlesCount * 3));
  }, [particlesCount]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={particlesCount}
          array={positions}
          itemSize={3}
          ref={positionRef}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={particlesCount}
          array={colors}
          itemSize={3}
          ref={colorRef}
        />
      </bufferGeometry>
      <pointsMaterial
        depthWrite={false}
        transparent={true}
        size={particleSize}
        sizeAttenuation={true}
        blending={AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
}

export default Particles;
