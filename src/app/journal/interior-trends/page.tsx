import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function InteriorTrendsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
            Interior
          </span>

          <h1 className="mt-6 text-5xl font-light leading-tight md:text-7xl">
            Interior Trends Defining
            <span className="block text-[#d6b56a]">
              Modern Luxury Homes
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/40">
            <span>24 Jul 2026</span>
            <span>•</span>
            <span>7 min read</span>
          </div>

          <p className="mt-10 text-lg leading-8 text-white/60">
            Modern luxury is becoming less about excess and more about
            thoughtful spaces, timeless materials and effortless comfort.
          </p>

          <div className="mt-14 space-y-12">
            <ArticleSection
              number="01"
              title="Warm Minimalism"
            >
              Clean architecture remains important, but modern luxury homes
              are moving toward warmer and more inviting interiors. Natural
              textures, soft lighting and carefully selected furniture can
              create sophisticated spaces without making them feel cold.
            </ArticleSection>

            <ArticleSection
              number="02"
              title="Natural Materials"
            >
              Stone, wood, marble and other natural materials continue to
              define premium interiors. Their texture and character give
              rooms depth while helping the design remain timeless.
            </ArticleSection>

            <ArticleSection
              number="03"
              title="Indoor & Outdoor Living"
            >
              Large windows, terraces and landscaped spaces are increasingly
              becoming extensions of the interior. The strongest designs
              create a natural connection between indoor comfort and outdoor
              surroundings.
            </ArticleSection>

            <ArticleSection
              number="04"
              title="Integrated Technology"
            >
              Smart lighting, climate control and home automation work best
              when the technology disappears into the architecture. Luxury
              technology should make the home easier to live in without
              dominating its visual design.
            </ArticleSection>

            <ArticleSection
              number="05"
              title="Personalised Spaces"
            >
              Private libraries, wellness rooms, entertainment areas and
              flexible workspaces allow a residence to reflect the lifestyle
              of the people living there.
            </ArticleSection>
          </div>

          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
              NestVille Journal
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
              Explore architecture, interiors, property investment and the
              ideas shaping exceptional residences.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

interface ArticleSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function ArticleSection({
  number,
  title,
  children,
}: ArticleSectionProps) {
  return (
    <div className="border-t border-white/10 pt-8">
      <div className="flex gap-5 sm:gap-8">
        <span className="shrink-0 text-sm text-[#d6b56a]">
          {number}
        </span>

        <div>
          <h2 className="text-2xl font-light text-white sm:text-3xl">
            {title}
          </h2>

          <p className="mt-5 text-[15px] leading-8 text-white/60">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}