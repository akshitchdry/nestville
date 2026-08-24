import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function InvestmentOutlookPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
            Investment
          </span>

          <h1 className="mt-6 text-5xl font-light leading-tight md:text-7xl">
            Real Estate Investment
            <span className="block text-[#d6b56a]">
              Outlook 2026
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/40">
            <span>28 Jul 2026</span>
            <span>•</span>
            <span>6 min read</span>
          </div>

          <p className="mt-10 text-lg leading-8 text-white/60">
            Premium real estate continues to attract buyers looking for a
            balance of lifestyle value, long-term stability and carefully
            selected growth opportunities.
          </p>

          <div className="mt-14 space-y-12">
            <ArticleSection
              number="01"
              title="Location Remains Fundamental"
            >
              Strong investment decisions still begin with location.
              Connectivity, infrastructure, neighbourhood quality and future
              development can all influence long-term demand and resale value.
            </ArticleSection>

            <ArticleSection
              number="02"
              title="Quality Over Quantity"
            >
              Investors are increasingly paying attention to construction
              quality, developer reputation and the overall resident
              experience rather than simply comparing properties by size.
            </ArticleSection>

            <ArticleSection
              number="03"
              title="Lifestyle-Led Demand"
            >
              Wellness amenities, privacy, landscaped spaces and access to
              premium services are becoming important factors for buyers in
              the luxury segment.
            </ArticleSection>

            <ArticleSection
              number="04"
              title="Long-Term Thinking"
            >
              Premium property works best when viewed with a long-term
              perspective. Maintenance, surrounding development and changing
              buyer preferences can all influence future value.
            </ArticleSection>

            <ArticleSection
              number="05"
              title="Diversification Matters"
            >
              Buyers considering property as part of a wider investment
              strategy may benefit from evaluating different locations,
              property types and ownership goals instead of relying on a
              single market.
            </ArticleSection>
          </div>

          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
              NestVille Journal
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
              Explore property insights, architecture, interiors and ideas
              shaping exceptional living.
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