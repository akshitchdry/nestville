import Navbar from "@/components/navbar/Navbar";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyOverview from "@/components/properties/PropertyOverview";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PropertySidebar from "@/components/properties/PropertySidebar";
import PropertyAgent from "@/components/properties/PropertyAgent";
import PropertyMap from "@/components/properties/PropertyMap";
import SimilarProperties from "@/components/properties/SimilarProperties";
import Footer from "@/components/footer/Footer";

export default function PropertyDetailsPage(){return <main className="relative overflow-hidden bg-[#050505] text-white"><Navbar/><div className="pt-24"><PropertyGallery/></div><section className="relative py-24"><div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.45fr_.55fr]"><div className="space-y-20"><PropertyOverview title="Royal Palm Villa" description="A refined luxury residence with panoramic views, premium finishes, private outdoor spaces and smart-home features designed for elevated everyday living." bedrooms={5} bathrooms={6} area="6,850 ft²" type="Luxury Villa" possession="Ready To Move" parking="4 Cars" facing="Sea Facing"/><PropertyAmenities/></div><PropertySidebar title="Royal Palm Villa" propertyId="NV-001" price="$4.8 Million" bookingAmount="$50,000" maintenance="$1,250 / Month" possession="Ready To Move"/></div></section><PropertyAgent/><PropertyMap/><SimilarProperties/><Footer/></main>;}
