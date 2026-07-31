export interface FeaturedProject {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  startingPrice: string;
  residences: string;
  bedrooms: string;
  completion: string;
  status: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    name: "The Celestia",
    location: "Downtown Dubai",
    description:
      "A landmark collection of private residences shaped by architecture, panoramic views and elevated city living.",
    image: "/images/projects/project-1.webp",
    startingPrice: "$2.4M",
    residences: "42",
    bedrooms: "3–6",
    completion: "2028",
    status: "Now launching",
  },
  {
    id: 2,
    name: "Aurelia Bay",
    location: "Palm Jumeirah",
    description:
      "Waterfront homes designed around privacy, natural light and uninterrupted views across the Arabian Gulf.",
    image: "/images/projects/project-2.webp",
    startingPrice: "$3.8M",
    residences: "28",
    bedrooms: "4–7",
    completion: "2029",
    status: "Private release",
  },
  {
    id: 3,
    name: "Nocturne Heights",
    location: "Singapore",
    description:
      "A sculptural residential tower combining calm interiors, sky gardens and a distinctly modern identity.",
    image: "/images/projects/project-3.webp",
    startingPrice: "$1.9M",
    residences: "64",
    bedrooms: "2–5",
    completion: "2027",
    status: "Limited collection",
  },
];