"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
  }
);

const BuildingModel = dynamic(() => import("./BuildingModel"), {
  ssr: false,
});

const CameraRig = dynamic(() => import("./CameraRig"), {
  ssr: false,
});

const FloatingParticles = dynamic(() => import("./FloatingParticles"), {
  ssr: false,
});

const SceneLights = dynamic(() => import("./SceneLights"), {
  ssr: false,
});

export default function BuildingCanvas() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        w-full
        overflow-hidden
      "
    >
      <Canvas
        camera={{
          position: [0, 1.5, 8],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <SceneLights />

          <CameraRig>
            <BuildingModel />
          </CameraRig>

          <FloatingParticles />
        </Suspense>
      </Canvas>

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-[#060806]
          via-transparent
          to-[#060806]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/2
          h-[400px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#d6b56a]/5
          blur-[150px]
        "
      />
    </div>
  );
}