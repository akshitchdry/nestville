import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyOverview from "@/components/properties/PropertyOverview";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PropertySidebar from "@/components/properties/PropertySidebar";
import PropertyAgent from "@/components/properties/PropertyAgent";
import PropertyMap from "@/components/properties/PropertyMap";
import SimilarProperties from "@/components/properties/SimilarProperties";

export default function PropertyDetailsPage() {
  return (
    <main className="bg-[#050505] text-white">

      {/* Hero Gallery */}
      <PropertyGallery />

      {/* Overview + Sidebar */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.45fr_.55fr]">

          <div className="space-y-24">

            <PropertyOverview
              title="Royal Palm Villa"
              description="NestVille Royal Palm Villa blends contemporary architecture with timeless luxury. Designed with expansive living spaces, panoramic glass walls, premium finishes, and resort-inspired amenities, it delivers an unmatched residential experience."
              bedrooms={5}
              bathrooms={6}
              area="6,850 ft²"
              type="Luxury Villa"
              possession="Ready to Move"
              parking="4 Cars"
              facing="Sea Facing"
            />

            <PropertyAmenities />

          </div>

          <div>
            <PropertySidebar
              price="$4.8M"
              propertyId="NV-001"
              title="Royal Palm Villa"
              bookingAmount="$50,000"
              maintenance="$1,250 / Month"
              possession="Ready To Move"
            />
          </div>

        </div>
      </section>

      <PropertyAgent />

      <PropertyMap />

      <SimilarProperties />

    </main>
  );
}