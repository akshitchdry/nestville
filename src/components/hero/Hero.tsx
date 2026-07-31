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
        min-h-[850px]
        overflow-hidden
        bg-[#060806]
        lg:min-h-[760px]
      "
    >
      <HeroVideo />

      <div
        className="
          absolute
          inset-0
          z-[2]
          bg-gradient-to-r
          from-[#030503]/95
          via-[#030503]/62
          to-[#030503]/22
        "
      />

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

      <HeroParallax />

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-[850px]
          w-full
          max-w-[1600px]
          items-center
          px-5
          pb-[230px]
          pt-[130px]
          sm:px-8
          lg:min-h-[760px]
          lg:px-12
          lg:pb-[190px]
          lg:pt-[120px]
          xl:px-16
        "
      >
        <HeroContent />
      </div>

      <FloatingPropertyCard />
      <HeroStats />
      <ScrollIndicator />
      <HeroSearch />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-36
          bg-gradient-to-t
          from-[#060806]
          to-transparent
        "
      />
    </section>
  );
}