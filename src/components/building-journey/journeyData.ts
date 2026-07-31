import {
  Building2,
  DraftingCompass,
  Gem,
  Layers3,
  Sparkles,
} from "lucide-react";

export interface JourneyStep {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  progress: number;
  icon: typeof Building2;
  accent: string;
}

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    number: "01",
    title: "Foundation",
    subtitle: "Built upon precision",
    description:
      "Every extraordinary residence begins with engineering excellence, structural integrity and a vision designed to endure.",
    progress: 20,
    icon: Layers3,
    accent: "Structural planning",
  },
  {
    id: 2,
    number: "02",
    title: "Architecture",
    subtitle: "Form shaped by purpose",
    description:
      "Distinctive architecture combines elegant proportions, natural light and timeless materials into one refined composition.",
    progress: 40,
    icon: DraftingCompass,
    accent: "Signature design",
  },
  {
    id: 3,
    number: "03",
    title: "Interiors",
    subtitle: "Crafted from within",
    description:
      "Curated interiors, bespoke finishes and considered details transform every room into an elevated personal experience.",
    progress: 60,
    icon: Gem,
    accent: "Bespoke finishes",
  },
  {
    id: 4,
    number: "04",
    title: "Amenities",
    subtitle: "Life beyond the residence",
    description:
      "Private wellness, leisure and hospitality spaces are designed around comfort, privacy and effortless daily living.",
    progress: 80,
    icon: Sparkles,
    accent: "World-class living",
  },
  {
    id: 5,
    number: "05",
    title: "Complete",
    subtitle: "A landmark comes alive",
    description:
      "Architecture, landscape and lifestyle unite to create a residence that feels distinctive from every perspective.",
    progress: 100,
    icon: Building2,
    accent: "The final masterpiece",
  },
];