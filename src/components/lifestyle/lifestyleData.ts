import {
  Building2,
  Castle,
  Cpu,
  Flag,
  Mountain,
  Waves,
} from "lucide-react";

export interface LifestyleItem {
  id: number;
  title: string;
  description: string;
  propertyCount: string;
  image: string;
  icon: typeof Waves;
  href: string;
}

export const lifestyleItems: LifestyleItem[] = [
  {
    id: 1,
    title: "Waterfront Living",
    description:
      "Private residences shaped by uninterrupted water views and refined coastal living.",
    propertyCount: "128 Properties",
    image: "/images/lifestyles/waterfront.webp",
    icon: Waves,
    href: "/properties?lifestyle=waterfront",
  },
  {
    id: 2,
    title: "Urban Penthouses",
    description:
      "Elevated city homes with panoramic skylines, privacy and contemporary architecture.",
    propertyCount: "96 Properties",
    image: "/images/lifestyles/penthouse.webp",
    icon: Building2,
    href: "/properties?lifestyle=penthouse",
  },
  {
    id: 3,
    title: "Private Estates",
    description:
      "Expansive residences designed around seclusion, landscape and timeless elegance.",
    propertyCount: "72 Properties",
    image: "/images/lifestyles/estate.webp",
    icon: Castle,
    href: "/properties?lifestyle=estate",
  },
  {
    id: 4,
    title: "Mountain Retreats",
    description:
      "Peaceful architectural escapes surrounded by nature and dramatic landscapes.",
    propertyCount: "64 Properties",
    image: "/images/lifestyles/mountain.webp",
    icon: Mountain,
    href: "/properties?lifestyle=mountain",
  },
  {
    id: 5,
    title: "Smart Homes",
    description:
      "Future-ready residences combining intelligent technology with effortless comfort.",
    propertyCount: "120 Properties",
    image: "/images/lifestyles/smart-home.webp",
    icon: Cpu,
    href: "/properties?lifestyle=smart-home",
  },
  {
    id: 6,
    title: "Golf Residences",
    description:
      "Premium homes positioned around championship courses and private communities.",
    propertyCount: "80 Properties",
    image: "/images/lifestyles/golf.webp",
    icon: Flag,
    href: "/properties?lifestyle=golf",
  },
];