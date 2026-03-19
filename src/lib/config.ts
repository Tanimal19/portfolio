export type ProjectItem = {
  title: string;
  description: string;
  year: number;
  link: string;
  previewImage?: string;
  previewVideo?: string;
  showOnLanding: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    title: "LLM-CR",
    description: "LLM code review application. (course project)",
    year: 2026,
    link: "https://github.com/Tanimal19/llmcr",
    previewImage: "",
    showOnLanding: false,
  },
  {
    title: "Gesture Desktop Control",
    description:
      "HCI research on gesture-base desktop control system. (course project)",
    year: 2025,
    link: "https://github.com/Tanimal19/gesture_desktop_control",
    previewImage: "",
    showOnLanding: false,
  },
  {
    title: "HeadTurner",
    description: "HCI research on lying-down VR experience. (research)",
    year: 2025,
    link: "https://dl.acm.org/doi/10.1145/3706598.3714214",
    previewImage: "/project-previews/headturner.png",
    showOnLanding: true,
  },
  {
    title: "DataCenterManager",
    description: "Web app to manage data center resources. (course project)",
    year: 2025,
    link: "https://github.com/Tanimal19/DCM",
    previewVideo: "/project-previews/dcm-demo.mp4",
    showOnLanding: true,
  },
  {
    title: "ONGAKU",
    description: "Website to listen youtube music with lyrics. (side project)",
    year: 2025,
    link: "https://github.com/Tanimal19/ongaku",
    previewVideo: "/project-previews/ongaku-demo.mp4",
    showOnLanding: true,
  },
  {
    title: "Nasa-TLX Calculator",
    description: "Online calculator for NASA-TLX questionnaire. (side project)",
    year: 2024,
    link: "https://github.com/Tanimal19/nasa-tlx-calculator",
    previewVideo: "/project-previews/nasatlx-demo.mp4",
    showOnLanding: true,
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

export type PageLink = {
  href: string;
  text: string;
};

export const pageLinks: PageLink[] = [
  { href: "/blog", text: "Writings" },
  { href: "/resume.pdf", text: "Resume" },
];
