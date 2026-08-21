import type { Asset, Pathname } from "$app/types";

export const projectCategories = [
  "publication",
  "presentation",
  "course",
  "toy",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** Author name highlighted (bold) inside an item's author list. */
export const authorSelf = "Po-Yun Cheng";

export type ProjectItem = {
  title: string;
  /** Author list in publication order; `authorSelf` is rendered bold. */
  authors?: string[];
  /** Award label, e.g. "Best Poster Paper"; rendered with a trophy icon. */
  award?: string;
  /** Supports multiple lines; rendered as-is (use it for a full citation). */
  description: string;
  year: number;
  category: ProjectCategory;
  link: string;
  previewImage?: Asset;
  previewVideo?: Asset;
  showOnLanding: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    title: "Automated Code Review Using a Multi-LLMs Framework.",
    authors: ["Po-Yun Cheng", "Kuan-Yi Lee", "Chen-Wei Zhang", "Jonathan Lee"],
    description:
      "TCSE 2026: The 22nd Taiwan Conference on Software Engineering.",
    award: "Best Poster Paper",
    year: 2026,
    category: "presentation",
    link: "https://github.com/Tanimal19/llmcr",
    previewImage: "/project-previews/llmcr.png",
    showOnLanding: true,
  },
  {
    title: "Gesture Desktop Control",
    description:
      "HCI research on gesture-base desktop control system. (EECS255@UC Merced)",
    year: 2025,
    category: "course",
    link: "https://github.com/Tanimal19/gesture_desktop_control",
    previewImage: "/project-previews/gesture.png",
    showOnLanding: true,
  },
  {
    title:
      "HeadTurner: Enhancing Viewing Range and Comfort of using Virtual and Mixed-Reality Headsets while Lying Down via Assisted Shoulder and Head Actuation.",
    authors: [
      "En-Huei Wu",
      "Po-Yun Cheng",
      "Che-Wei Hsu",
      "Cheng Hsin Han",
      "Pei Chen Lee",
      "Chia-An Fan",
      "Yu Chia Kuo",
      "Kai-Jing Hu",
      "Yu Chen",
      "Mike Y. Chen",
    ],
    description: `CHI '25: Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems, pp. 1-16. doi:10.1145/3706598.3714214`,
    year: 2025,
    category: "publication",
    link: "https://dl.acm.org/doi/10.1145/3706598.3714214",
    previewImage: "/project-previews/headturner.png",
    showOnLanding: true,
  },
  {
    title: "DataCenterManager",
    description: "Web app to manage data center resources. (CSIE5217@NTU)",
    year: 2025,
    category: "course",
    link: "https://github.com/Tanimal19/DCM",
    previewVideo: "/project-previews/dcm-demo.mp4",
    showOnLanding: false,
  },
  {
    title: "ONGAKU",
    description: "Website to listen youtube music with lyrics.",
    year: 2025,
    category: "toy",
    link: "https://github.com/Tanimal19/ongaku",
    previewVideo: "/project-previews/ongaku-demo.mp4",
    showOnLanding: false,
  },
  {
    title: "Nasa-TLX Calculator",
    description: "Online calculator for NASA-TLX questionnaire.",
    year: 2024,
    category: "toy",
    link: "https://github.com/Tanimal19/nasa-tlx-calculator",
    previewVideo: "/project-previews/nasatlx-demo.mp4",
    showOnLanding: false,
  },
];

export type SocialLink = {
  href: string;
  text: string;
  colorhex: string;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/Tanimal19",
    text: "Github",
    colorhex: "#6cc644",
  },
  {
    href: "https://www.linkedin.com/in/poyuncheng-bob/",
    text: "LinkedIn",
    colorhex: "#004182",
  },
  {
    href: "https://www.instagram.com/_tanimal_x/",
    text: "Instagram",
    colorhex: "#FF0069",
  },
];

export type PageLink =
  | { kind: "page"; href: Pathname; text: string }
  | { kind: "asset"; href: Asset; text: string };

export const pageLinks: PageLink[] = [
  { kind: "page", href: "/works", text: "Works" },
  { kind: "page", href: "/blog", text: "Writings" },
  { kind: "asset", href: "/poyuncheng_cv.pdf", text: "Curriculum Vitae" },
  { kind: "page", href: "/misc", text: "Misc" },
];
