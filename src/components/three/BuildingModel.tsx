"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BuildingModel() {
  const groupRef = useRef<THREE.Group>(null);

  const floors = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => ({
      y: index * 0.22,
      width: 2.5 - index * 0.025,
      depth: 1.4 - index * 0.01,
    }));
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    group.rotation.y += delta * 0.08;

    group.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.08 - 1.8;
  });

  return (
    <group
      ref={groupRef}
      position={[0.8, -1.8, 0]}
      rotation={[0.05, -0.45, 0]}
    >
      {/* FOUNDATION */}

      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[3.2, 0.18, 2]} />

        <meshStandardMaterial
          color="#0d120f"
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>

      {/* MAIN TOWER */}

      {floors.map((floor, index) => (
        <group
          key={index}
          position={[0, floor.y, 0]}
        >
          <mesh>
            <boxGeometry
              args={[
                floor.width,
                0.18,
                floor.depth,
              ]}
            />

            <meshStandardMaterial
              color="#101713"
              metalness={0.45}
              roughness={0.28}
            />
          </mesh>

          {/* FRONT GLASS */}

          <mesh position={[0, 0, floor.depth / 2 + 0.012]}>
            <boxGeometry
              args={[
                floor.width * 0.84,
                0.11,
                0.02,
              ]}
            />

            <meshStandardMaterial
              color={index % 3 === 0 ? "#d8b66b" : "#42504a"}
              emissive={
                index % 3 === 0
                  ? new THREE.Color("#8d6a2f")
                  : new THREE.Color("#000000")
              }
              emissiveIntensity={index % 3 === 0 ? 0.9 : 0}
              metalness={0.35}
              roughness={0.08}
              transparent
              opacity={0.82}
            />
          </mesh>

          {/* SIDE GLASS */}

          <mesh
            position={[
              floor.width / 2 + 0.012,
              0,
              0,
            ]}
          >
            <boxGeometry
              args={[
                0.02,
                0.11,
                floor.depth * 0.8,
              ]}
            />

            <meshStandardMaterial
              color="#34423b"
              metalness={0.45}
              roughness={0.1}
              transparent
              opacity={0.75}
            />
          </mesh>

          {/* BALCONY LINE */}

          {index % 2 === 0 && (
            <mesh
              position={[
                0,
                -0.105,
                floor.depth / 2 + 0.12,
              ]}
            >
              <boxGeometry
                args={[
                  floor.width * 0.92,
                  0.025,
                  0.22,
                ]}
              />

              <meshStandardMaterial
                color="#b18c47"
                metalness={0.75}
                roughness={0.22}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* ROOFTOP */}

      <mesh position={[0, 4.05, 0]}>
        <boxGeometry args={[1.75, 0.2, 1]} />

        <meshStandardMaterial
          color="#151c17"
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>

      {/* GOLD ROOF DETAIL */}

      <mesh position={[0, 4.22, 0]}>
        <boxGeometry args={[1.15, 0.08, 0.66]} />

        <meshStandardMaterial
          color="#c8a35b"
          emissive="#6c4d1f"
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.18}
        />
      </mesh>

      {/* ANTENNA */}

      <mesh position={[0, 4.75, 0]}>
        <cylinderGeometry
          args={[
            0.018,
            0.018,
            1.05,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#d7bd7d"
          emissive="#8b6429"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* TOP LIGHT */}

      <mesh position={[0, 5.3, 0]}>
        <sphereGeometry args={[0.06, 20, 20]} />

        <meshStandardMaterial
          color="#e4c77f"
          emissive="#e4c77f"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* PODIUM LEFT */}

      <mesh position={[-1.65, 0.25, 0.2]}>
        <boxGeometry args={[1.1, 0.5, 1.2]} />

        <meshStandardMaterial
          color="#101511"
          metalness={0.45}
          roughness={0.35}
        />
      </mesh>

      {/* PODIUM RIGHT */}

      <mesh position={[1.65, 0.15, 0.1]}>
        <boxGeometry args={[1.05, 0.35, 1.05]} />

        <meshStandardMaterial
          color="#0d130f"
          metalness={0.4}
          roughness={0.36}
        />
      </mesh>

      {/* LANDSCAPE PLATFORM */}

      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry
          args={[
            2.8,
            3.1,
            0.16,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#08100a"
          metalness={0.15}
          roughness={0.65}
        />
      </mesh>

      {/* GOLD RING */}

      <mesh
        position={[0, -0.27, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[
            2.45,
            0.018,
            16,
            120,
          ]}
        />

        <meshStandardMaterial
          color="#c8a35b"
          emissive="#6b4a1c"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* SOFT GROUND LIGHT */}

      <pointLight
        position={[0, -0.6, 1.8]}
        intensity={4}
        distance={7}
        color="#c8a35b"
      />
    </group>
  );
}