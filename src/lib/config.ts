import type { Asset, Pathname } from "$app/types";

export type ProjectItem = {
  title: string;
  description: string;
  year: number;
  link: string;
  previewImage?: Asset;
  previewVideo?: Asset;
  showOnLanding: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    title: "LLMCR",
    description: "Multi-agent code review system. (research @ NTU SE lab)",
    year: 2026,
    link: "https://github.com/Tanimal19/llmcr",
    previewImage: "/project-previews/llmcr.png",
    showOnLanding: true,
  },
  {
    title: "Gesture Desktop Control",
    description:
      "HCI research on gesture-base desktop control system. (EECS255@UC Merced)",
    year: 2025,
    link: "https://github.com/Tanimal19/gesture_desktop_control",
    previewImage: "/project-previews/gesture.png",
    showOnLanding: true,
  },
  {
    title: "HeadTurner",
    description:
      "HCI research on lying-down VR experience. (research@NTU HCI lab)",
    year: 2025,
    link: "https://dl.acm.org/doi/10.1145/3706598.3714214",
    previewImage: "/project-previews/headturner.png",
    showOnLanding: true,
  },
  {
    title: "DataCenterManager",
    description: "Web app to manage data center resources. (CSIE5217@NTU)",
    year: 2025,
    link: "https://github.com/Tanimal19/DCM",
    previewVideo: "/project-previews/dcm-demo.mp4",
    showOnLanding: true,
  },
  {
    title: "ONGAKU",
    description: "Website to listen youtube music with lyrics. (frontend toy)",
    year: 2025,
    link: "https://github.com/Tanimal19/ongaku",
    previewVideo: "/project-previews/ongaku-demo.mp4",
    showOnLanding: false,
  },
  {
    title: "Nasa-TLX Calculator",
    description: "Online calculator for NASA-TLX questionnaire. (frontend toy)",
    year: 2024,
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
  { kind: "page", href: "/blog", text: "Writings" },
  { kind: "asset", href: "/poyuncheng_cv.pdf", text: "Curriculum Vitae" },
];
