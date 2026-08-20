"use client";

import {
  ReactNode,
  useRef,
} from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

interface CameraRigProps {
  children: ReactNode;
}

export default function CameraRig({
  children,
}: CameraRigProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;

    if (!group) return;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      mouseX * 0.18,
      0.035,
    );

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      -mouseY * 0.08,
      0.035,
    );

    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      mouseX * 0.22,
      0.03,
    );

    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      mouseY * 0.12,
      0.03,
    );

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouseX * 0.25,
      0.025,
    );

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      1.5 + mouseY * 0.14,
      0.025,
    );

    state.camera.lookAt(0, 1.1, 0);
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}