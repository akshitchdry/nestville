"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050605] text-white">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#d6b56a]">
              NestVille
            </p>

            <h1 className="mt-6 text-5xl font-light tracking-[-0.04em] sm:text-7xl">
              Something went
              <span className="block text-[#d6b56a]">
                wrong.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/45">
              We couldn&apos;t load the experience. Please try again.
            </p>

            <button
              type="button"
              onClick={reset}
              className="
                mt-9
                rounded-full
                bg-[#d6b56a]
                px-8
                py-4
                text-[9px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-black
                transition-transform
                hover:scale-105
              "
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}