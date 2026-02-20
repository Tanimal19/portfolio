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
    title: "HeadTurner",
    description:
      "research on enhancing lying-down VR experience via assisted body actuation (role: study design & data)",
    year: 2025,
    link: "https://dl.acm.org/doi/10.1145/3706598.3714214",
    previewImage: "/project-previews/headturner.png",
    showOnLanding: true,
  },
  {
    title: "DataCenterManager",
    description: "web app to manage data center resources (role: full-stack)",
    year: 2025,
    link: "https://github.com/Tanimal19/DCM",
    previewVideo: "/project-previews/dcm-demo.mp4",
    showOnLanding: true,
  },
  {
    title: "ONGAKU",
    description: "website to listen youtube music with lyrics",
    year: 2025,
    link: "https://github.com/Tanimal19/ongaku",
    previewVideo: "/project-previews/ongaku-demo.mp4",
    showOnLanding: true,
  },
  {
    title: "Nasa-TLX Calculator",
    description: "online calculator for NASA-TLX questionnaire",
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
  { href: "/cv.pdf", text: "Resume" },
];
