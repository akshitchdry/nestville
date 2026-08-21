export default function Loading() {
  return (
    <main
      className="
        fixed
        inset-0
        z-[99999]
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#050605]
        text-white
      "
    >
      {/* GOLD GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#d6b56a]/10
          blur-[190px]
        "
      />

      {/* GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
          [background-size:90px_90px]
        "
      />

      <div className="relative z-10 text-center">
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.45em]
            text-[#d6b56a]
          "
        >
          NestVille
        </p>

        <h1
          className="
            mt-5
            text-5xl
            font-light
            tracking-[-0.04em]
            text-white
            sm:text-6xl
          "
        >
          Signature
          <span className="block text-[#d6b56a]">
            Residences
          </span>
        </h1>

        <div
          className="
            relative
            mx-auto
            mt-10
            h-px
            w-56
            overflow-hidden
            bg-white/10
          "
        >
          <span
            className="
              absolute
              inset-y-0
              left-0
              w-1/3
              animate-[loadingLine_1.2s_ease-in-out_infinite]
              bg-gradient-to-r
              from-transparent
              via-[#d6b56a]
              to-transparent
            "
          />
        </div>

        <p
          className="
            mt-6
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/30
          "
        >
          Curating exceptional living
        </p>
      </div>
    </main>
  );
}