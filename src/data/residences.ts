export interface Residence {
  id: number;
  slug: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  category: string;
}

export const residences: Residence[] = [
  {
    id: 1,
    slug: "the-aurelia-estate",
    title: "The Aurelia Estate",
    location: "Palm Jumeirah, Dubai",
    price: "$6.2M",
    bedrooms: 5,
    bathrooms: 7,
    area: "8,400 sq. ft.",
    image: "/images/properties/residence-1.webp",
    category: "Waterfront Estate",
  },
  {
    id: 2,
    slug: "horizon-villa",
    title: "The Horizon Villa",
    location: "Beverly Hills, California",
    price: "$4.8M",
    bedrooms: 4,
    bathrooms: 5,
    area: "6,200 sq. ft.",
    image: "/images/properties/residence-2.webp",
    category: "Private Villa",
  },
  {
    id: 3,
    slug: "oceanview-mansion",
    title: "Oceanview Mansion",
    location: "Malibu, California",
    price: "$9.5M",
    bedrooms: 6,
    bathrooms: 8,
    area: "10,500 sq. ft.",
    image: "/images/properties/residence-3.webp",
    category: "Ocean Residence",
  },
  {
    id: 4,
    slug: "celestia-penthouse",
    title: "Celestia Penthouse",
    location: "Downtown Dubai",
    price: "$7.3M",
    bedrooms: 4,
    bathrooms: 6,
    area: "7,600 sq. ft.",
    image: "/images/properties/residence-4.webp",
    category: "Sky Residence",
  },
  {
    id: 5,
    slug: "the-serenity-house",
    title: "The Serenity House",
    location: "London, United Kingdom",
    price: "$5.6M",
    bedrooms: 5,
    bathrooms: 6,
    area: "6,900 sq. ft.",
    image: "/images/properties/residence-5.webp",
    category: "Modern Heritage",
  },
];