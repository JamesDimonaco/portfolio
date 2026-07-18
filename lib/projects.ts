export type Project = {
  title: string;
  /** GitHub repo as owner/name — used to fetch the latest commit */
  repo: string;
  active?: boolean;
  /** Private repos get no Code link (visitors would 404) */
  isPrivate?: boolean;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "MyEtAl",
    repo: "JamesDimonaco/myetal",
    active: true,
    description:
      "Share your research with a QR code. Researchers curate collections of papers, repos, and links, then generate a scannable QR for posters, slides, or CVs. ORCID sign-in auto-drafts your publications; public discovery search surfaces published collections. Web + iOS + Android.",
    tech: ["TypeScript", "Next.js", "Expo", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/JamesDimonaco/myetal",
    live: "https://myetal.app",
  },
  {
    title: "Research Homepage",
    repo: "JamesDimonaco/research-homepage",
    active: true,
    description:
      "Concierge site builder for researchers and labs — one app per researcher in a Turborepo, Sanity CMS, and an ORCID importer that pulls your publications from OpenAlex and drafts them automatically.",
    tech: ["TypeScript", "Next.js", "Turborepo", "Sanity"],
    github: "https://github.com/jamesdimonaco/research-homepage",
    live: "https://nicholas.dimonaco.co.uk/",
  },
  {
    title: "Magpie",
    repo: "JamesDimonaco/magpie",
    active: true,
    isPrivate: true,
    description:
      "Receipt + compliance wrangler for UK limited companies. A payment leaves the bank, Magpie finds the receipt email, one keypress confirms it, and the document is vaulted to your own storage — while Companies House and HMRC deadlines are watched so nothing is filed late.",
    tech: ["TypeScript", "Next.js", "Convex", "Gmail API", "Monzo API"],
  },
  {
    title: "Kith",
    repo: "JamesDimonaco/kith",
    active: true,
    isPrivate: true,
    description:
      "A living family tree for my own family — an interactive graph you can pan and explore, with real-time collaboration so relatives can fill in their own branches. Invite-only by design.",
    tech: ["TypeScript", "Next.js", "Convex", "React Flow"],
  },
  {
    title: "PageAlert",
    repo: "JamesDimonaco/prowl",
    description:
      "AI-powered website monitoring. Paste a URL, describe what you're looking for in plain English, and get notified when it appears. Open source.",
    tech: ["TypeScript", "Next.js", "Convex", "Playwright", "Claude AI"],
    github: "https://github.com/JamesDimonaco/prowl",
    live: "https://pagealert.io",
  },
  {
    title: "Timezone Map",
    repo: "JamesDimonaco/timezone-map",
    description:
      "An interactive world timezone map with 60+ cities, live time zones, and real-time user presence.",
    tech: ["TypeScript", "Next.js", "MapLibre", "Convex"],
    github: "https://github.com/JamesDimonaco/timezone-map",
    live: "https://timezones.live/",
  },
  {
    title: "Composure",
    repo: "JamesDimonaco/composure",
    description:
      "A TUI dashboard to audit, optimize, and visualize Docker-Compose stacks in real-time.",
    tech: ["Python", "Docker"],
    github: "https://github.com/JamesDimonaco/composure",
    live: "https://pypi.org/project/composure/",
  },
  {
    title: "LexiKey",
    repo: "JamesDimonaco/LexiKey",
    description:
      "A TypeScript project for enhanced keyboard interactions and text processing.",
    tech: ["TypeScript"],
    github: "https://github.com/JamesDimonaco/LexiKey",
    live: "https://www.lexikey.org/",
  },
  {
    title: "Travel Kitchen",
    repo: "JamesDimonaco/travel-kitchen",
    description:
      "A travel-focused culinary app for discovering recipes on the go.",
    tech: ["TypeScript", "React"],
    github: "https://github.com/jamesdimonaco/travel-kitchen",
    live: "https://travelkitchen.app/",
  },
];
