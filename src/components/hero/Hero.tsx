"use client";

import FloatingPropertyCard from "./FloatingPropertyCard";
import HeroContent from "./HeroContent";
import HeroParallax from "./HeroParallax";
import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";
import HeroVideo from "./HeroVideo";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#060806]

        min-h-[980px]

        sm:min-h-[960px]

        md:min-h-[920px]

        lg:min-h-[760px]
      "
    >
      {/* VIDEO */}

      <HeroVideo />

      {/* DARK LEFT OVERLAY */}

      <div
        className="
          absolute
          inset-0
          z-[2]

          bg-gradient-to-b
          from-[#030503]/75
          via-[#030503]/45
          to-[#060806]

          lg:bg-gradient-to-r
          lg:from-[#030503]/95
          lg:via-[#030503]/62
          lg:to-[#030503]/22
        "
      />

      {/* BOTTOM FADE */}

      <div
        className="
          absolute
          inset-0
          z-[3]
          bg-gradient-to-t
          from-[#060806]
          via-transparent
          to-[#030503]/55
        "
      />

      {/* PARALLAX */}

      <div className="hidden lg:block">
        <HeroParallax />
      </div>

      {/* MAIN HERO CONTENT */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-[1600px]
          flex-col
          justify-start

          px-5
          pb-[390px]
          pt-[120px]

          sm:px-8
          sm:pb-[360px]
          sm:pt-[135px]

          md:pb-[330px]

          lg:min-h-[760px]
          lg:justify-center
          lg:px-12
          lg:pb-[190px]
          lg:pt-[120px]

          xl:px-16
        "
      >
        <div
          className="
            w-full
            max-w-[760px]

            lg:max-w-none
          "
        >
          <HeroContent />
        </div>
      </div>

      {/* FLOATING PROPERTY CARD */}

      <div
        className="
          hidden

          md:block

          lg:block
        "
      >
        <FloatingPropertyCard />
      </div>

      {/* HERO STATS */}

      <div
        className="
          absolute
          inset-x-0
          bottom-[190px]
          z-30

          px-5

          sm:bottom-[185px]
          sm:px-8

          lg:bottom-auto
          lg:px-0
        "
      >
        <HeroStats />
      </div>

      {/* SEARCH */}

      <div
        className="
          absolute
          inset-x-0
          bottom-[62px]
          z-40

          px-5

          sm:bottom-[64px]
          sm:px-8

          lg:bottom-8
          lg:px-0
        "
      >
        <HeroSearch />
      </div>

      {/* SCROLL INDICATOR */}

      <div
        className="
          hidden
          lg:block
        "
      >
        <ScrollIndicator />
      </div>

      {/* MOBILE BOTTOM SAFE FADE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-52

          bg-gradient-to-t
          from-[#060806]
          via-[#060806]/80
          to-transparent

          lg:h-36
        "
      />
    </section>
  );
}