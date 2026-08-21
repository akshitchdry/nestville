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

        min-h-[1120px]
        sm:min-h-[1040px]
        md:min-h-[930px]
        lg:min-h-[760px]
      "
    >
      <HeroVideo />

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-[#030503]/80
          via-[#030503]/50
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

      {/* DESKTOP PARALLAX */}
      <div className="hidden lg:block">
        <HeroParallax />
      </div>

      {/* MAIN CONTENT — SAME POSITION */}
      <div
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-[1600px]
          items-start

          px-5
          pb-[560px]
          pt-[118px]

          sm:px-8
          sm:pb-[500px]
          sm:pt-[130px]

          md:pb-[390px]

          lg:min-h-[760px]
          lg:items-center
          lg:px-12
          lg:pb-[190px]
          lg:pt-[120px]

          xl:px-16
        "
      >
        <div className="w-full max-w-[760px]">
          <HeroContent />
        </div>
      </div>

      {/* FLOATING PROPERTY CARD */}
      <div className="hidden md:block">
        <FloatingPropertyCard />
      </div>

      {/* STATS — SAME BOTTOM AREA */}
      <div
        className="
          absolute
          inset-x-0
          bottom-[390px]
          z-30
          px-5

          sm:bottom-[340px]
          sm:px-8

          md:bottom-[245px]

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
    bottom-[70px]
    z-40
    px-5

    sm:bottom-[75px]
    sm:px-8

    md:bottom-[80px]

    lg:bottom-[55px]
    lg:px-12

    xl:bottom-[65px]
    xl:px-16

    2xl:bottom-[75px]
  "
>
  <HeroSearch />
</div>

      {/* SCROLL INDICATOR */}
      <div className="hidden lg:block">
        <ScrollIndicator />
      </div>

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-56
          bg-gradient-to-t
          from-[#060806]
          via-[#060806]/70
          to-transparent

          lg:h-36
        "
      />
    </section>
  );
}