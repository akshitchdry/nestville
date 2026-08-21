import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      <section
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          px-6
          pb-20
          pt-32
          text-center
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[650px]
            w-[650px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#d6b56a]/10
            blur-[210px]
          "
        />

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

        <div className="relative z-10 mx-auto max-w-5xl">
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.4em]
              text-[#d6b56a]
            "
          >
            Page Not Found
          </p>

          <h1
            className="
              mt-6
              text-[clamp(7rem,20vw,16rem)]
              font-light
              leading-[0.75]
              tracking-[-0.08em]
              text-white
            "
          >
            404
          </h1>

          <h2
            className="
              mt-10
              text-[clamp(2.5rem,5vw,5rem)]
              font-light
              leading-[0.95]
              tracking-[-0.04em]
              text-white
            "
          >
            This address
            <span className="block text-[#d6b56a]">
              doesn&apos;t exist.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-xl
              text-[15px]
              leading-8
              text-white/45
            "
          >
            The page you are looking for may have moved, changed or no
            longer exists. Return home or explore our residences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                bg-[#d6b56a]
                px-7
                py-4
                text-[9px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#080908]
                transition-all
                duration-300
                hover:scale-[1.03]
              "
            >
              <Home size={15} />

              Back Home
            </Link>

            <Link
              href="/properties"
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                border
                border-white/15
                bg-white/[0.03]
                px-7
                py-4
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/65
                transition-all
                duration-300
                hover:border-[#d6b56a]/50
                hover:text-[#d6b56a]
              "
            >
              <ArrowLeft size={15} />

              Explore Properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}