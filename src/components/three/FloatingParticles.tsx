"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 180;

  const positions = useMemo(() => {
    const array = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Deterministic values instead of Math.random()
      const x = Math.sin(i * 12.9898) * 43758.5453;
      const y = Math.sin((i + 1) * 78.233) * 43758.5453;
      const z = Math.sin((i + 2) * 37.719) * 43758.5453;

      const randomX = x - Math.floor(x);
      const randomY = y - Math.floor(y);
      const randomZ = z - Math.floor(z);

      array[i3] = (randomX - 0.5) * 12;
      array[i3 + 1] = (randomY - 0.5) * 9;
      array[i3 + 2] = (randomZ - 0.5) * 8;
    }

    return array;
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;

    if (!points) return;

    points.rotation.y += delta * 0.015;

    points.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.025;

    points.position.y =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        color="#d6b56a"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}