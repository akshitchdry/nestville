"use client";

export default function SceneLights() {
  return (
    <>
      {/* SOFT AMBIENT LIGHT */}
      <ambientLight intensity={0.35} />

      {/* MAIN WARM KEY LIGHT */}
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.4}
        color="#f2d58c"
      />

      {/* COOL FILL LIGHT */}
      <directionalLight
        position={[-5, 4, 3]}
        intensity={1.1}
        color="#8fa99a"
      />

      {/* TOP GOLD LIGHT */}
      <pointLight
        position={[0, 6, 2]}
        intensity={3}
        distance={12}
        decay={2}
        color="#d6b56a"
      />

      {/* LEFT SIDE GOLD GLOW */}
      <pointLight
        position={[-4, 1, 3]}
        intensity={2}
        distance={10}
        decay={2}
        color="#b58b45"
      />

      {/* RIGHT SIDE SOFT LIGHT */}
      <pointLight
        position={[5, 2, -2]}
        intensity={1.8}
        distance={10}
        decay={2}
        color="#d9c18a"
      />

      {/* BUILDING BOTTOM LIGHT */}
      <spotLight
        position={[0, -2, 4]}
        target-position={[0, 2, 0]}
        intensity={4}
        angle={0.5}
        penumbra={0.8}
        distance={12}
        decay={2}
        color="#c8a35b"
      />

      {/* BACK RIM LIGHT */}
      <spotLight
        position={[0, 5, -5]}
        target-position={[0, 2, 0]}
        intensity={3}
        angle={0.55}
        penumbra={1}
        distance={14}
        decay={2}
        color="#557264"
      />
    </>
  );
}