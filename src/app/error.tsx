"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("NestVille page error:", error);
  }, [error]);

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#050605]
        px-6
        py-24
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
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#d6b56a]/10
          blur-[200px]
        "
      />

      {/* BACKGROUND GRID */}

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

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-3xl
          text-center
        "
      >
        {/* ICON */}

        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-[#d6b56a]/25
            bg-[#d6b56a]/10
            text-[#d6b56a]
          "
        >
          <AlertTriangle size={24} strokeWidth={1.4} />
        </div>

        {/* LABEL */}

        <p
          className="
            mt-8
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-[#d6b56a]
          "
        >
          Something went wrong
        </p>

        {/* HEADING */}

        <h1
          className="
            mt-6
            text-[clamp(3rem,7vw,6.5rem)]
            font-light
            leading-[0.9]
            tracking-[-0.05em]
            text-white
          "
        >
          We couldn&apos;t load
          <span className="block text-[#d6b56a]">this experience.</span>
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            mt-7
            max-w-xl
            text-[14px]
            leading-8
            text-white/45
          "
        >
          An unexpected error occurred while loading this page. You can try
          again or return to the NestVille homepage.
        </p>

        {/* BUTTONS */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
          "
        >
          <button
            type="button"
            onClick={reset}
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
              hover:bg-[#e5ca85]
            "
          >
            <RefreshCw
              size={15}
              className="
                transition-transform
                duration-500
                group-hover:rotate-180
              "
            />
            Try Again
          </button>

          <Link
            href="/"
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
              hover:border-[#d6b56a]/40
              hover:text-[#d6b56a]
            "
          >
            <ArrowLeft
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />
            Back Home
          </Link>
        </div>

        {/* ERROR ID */}

        {error.digest && (
          <p
            className="
              mt-10
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
