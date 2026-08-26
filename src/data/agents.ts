export interface Agent {
  id: number;
  slug: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  image: string;
  phone: string;
  email: string;
  properties: number;
  specialty: string;
  bio: string;
  languages: string[];
}

export const agents: Agent[] = [
  {
    id: 1,
    slug: "arjun-mehra",
    name: "Arjun Mehra",
    role: "Senior Property Advisor",
    location: "Dubai, UAE",
    experience: "12+ Years",
    image: "/images/agents/agent-1.webp",
    phone: "+971504567890",
    email: "arjun@nestville.com",
    properties: 48,
    specialty: "Luxury Villas",
    bio:
      "Arjun specializes in premium villas and private residences, helping clients evaluate location, lifestyle and long-term value with a highly personalised approach.",
    languages: ["English", "Hindi"],
  },
  {
    id: 2,
    slug: "sophia-bennett",
    name: "Sophia Bennett",
    role: "Luxury Property Consultant",
    location: "London, United Kingdom",
    experience: "10+ Years",
    image: "/images/agents/agent-2.webp",
    phone: "+442079460100",
    email: "sophia@nestville.com",
    properties: 36,
    specialty: "Prime Apartments",
    bio:
      "Sophia advises buyers and investors across premium city residences, with a focus on refined apartments, penthouses and globally connected neighbourhoods.",
    languages: ["English", "French"],
  },
  {
    id: 3,
    slug: "daniel-rodriguez",
    name: "Daniel Rodriguez",
    role: "Investment Property Advisor",
    location: "Los Angeles, California",
    experience: "14+ Years",
    image: "/images/agents/agent-3.webp",
    phone: "+13105550180",
    email: "daniel@nestville.com",
    properties: 52,
    specialty: "Investment Properties",
    bio:
      "Daniel works with buyers seeking premium residential opportunities, combining market knowledge with a practical approach to investment strategy and property selection.",
    languages: ["English", "Spanish"],
  },
];