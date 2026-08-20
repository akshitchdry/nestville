"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GlobeScene() {
  const globeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const dots = useMemo(() => {
    return Array.from({ length: 85 }, (_, index) => {
      const phi = Math.acos(-1 + (2 * index) / 85);
      const theta = Math.sqrt(85 * Math.PI) * phi;

      const radius = 2;

      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.08;

      globeRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06;
    }
  });

  return (
    <group
      ref={globeRef}
      position={[0, 0, 0]}
    >
      {/* MAIN TRANSPARENT GLOBE */}

      <mesh>
        <sphereGeometry args={[2, 64, 64]} />

        <meshPhysicalMaterial
          color="#0b1510"
          transparent
          opacity={0.16}
          roughness={0.2}
          metalness={0.25}
          transmission={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* WIREFRAME */}

      <mesh>
        <sphereGeometry args={[2.015, 32, 32]} />

        <meshBasicMaterial
          color="#d6b56a"
          wireframe
          transparent
          opacity={0.055}
        />
      </mesh>

      {/* GOLD LOCATION DOTS */}

      {dots.map((dot, index) => (
        <mesh
          key={index}
          position={[
            dot.x,
            dot.y,
            dot.z,
          ]}
        >
          <sphereGeometry args={[0.018, 8, 8]} />

          <meshBasicMaterial
            color="#d6b56a"
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {/* OUTER GOLD RING */}

      <mesh
        ref={ringRef}
        rotation={[
          Math.PI / 2.5,
          0.3,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.35,
            0.012,
            16,
            160,
          ]}
        />

        <meshBasicMaterial
          color="#d6b56a"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* SECOND ORBIT */}

      <mesh
        rotation={[
          Math.PI / 2,
          Math.PI / 3,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.55,
            0.006,
            12,
            160,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* CENTER GLOW */}

      <pointLight
        position={[0, 0, 0]}
        color="#d6b56a"
        intensity={2}
        distance={7}
      />

      {/* LOCATION MARKER */}

      <group position={[1.35, 1.25, 0.85]}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />

          <meshBasicMaterial color="#e5c77c" />
        </mesh>

        <mesh>
          <ringGeometry args={[0.1, 0.14, 32]} />

          <meshBasicMaterial
            color="#d6b56a"
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>

        <pointLight
          color="#d6b56a"
          intensity={3}
          distance={2}
        />
      </group>
    </group>
  );
}