// Timeline data — projected from the `experience`, `certifications`, and
// `projects` arrays in app/page.tsx.
//
// TODO: dedupe — page.tsx and this file both hold work/cert/project facts.
// Make them share a single source of truth once the timeline design settles.

export type TimelineLane = "work" | "learning" | "projects" | "location";

export interface TimelineEntry {
  lane: TimelineLane;
  /** YYYY-MM — used for ordering and bar-span maths only */
  start: string;
  /** YYYY-MM, or "present" while ongoing. Omit for point-in-time events. */
  end?: string;
  title: string;
  /** e.g. role or issuer — rendered before the period */
  detail?: string;
  /** Human-readable period, rendered verbatim. "~" marks approximate dates. */
  period: string;
  blurb?: string;
  link?: string;
}

export const timelineEntries: TimelineEntry[] = [
  // ── Work ────────────────────────────────────────────────────────────
  {
    lane: "work",
    start: "2018-06",
    end: "2020-04",
    title: "Omnis Interactive",
    detail: "Front-End Developer",
    period: "Jun 2018 – Apr 2020",
    blurb: "AI chatbot startup serving businesses on Messenger.",
  },
  {
    lane: "work",
    start: "2020-05",
    end: "2021-11",
    title: "HALO Screening",
    detail: "Front-End Developer",
    period: "May 2020 – Nov 2021",
    blurb:
      "COVID-19 testing provider building mobile apps and web consoles for PCR test management.",
  },
  {
    lane: "work",
    start: "2021-12",
    end: "2022-10",
    title: "SailGP",
    detail: "Senior Full-Stack Developer",
    period: "Dec 2021 – Oct 2022",
    blurb: "Part of the technical team for the global sailing championship.",
  },
  {
    lane: "work",
    start: "2022-03",
    end: "2024-06", // site says "Mar 2022 – 2024"; mid-year approximation
    title: "Where You At",
    detail: "Head of Engineering",
    period: "Mar 2022 – 2024",
    blurb:
      "Nightlife safety startup using indoor positioning with Bluetooth beacons. Scaled the team from 2 to 8.",
  },
  {
    lane: "work",
    start: "2024-01", // site says "2024"; approximate month
    end: "present",
    title: "Dama Health",
    detail: "Senior Full Stack Developer · Contract",
    period: "2024 – Present",
    blurb:
      "Took over full technical ownership as the outgoing CTO transitioned out.",
    link: "https://github.com/damahealth",
  },
  {
    lane: "work",
    start: "2025-01", // site says "2025"; approximate month
    end: "present",
    title: "PinTraveler",
    detail: "Senior Full Stack Developer · Contract",
    period: "2025 – Present",
    blurb: "Creating travel experiences through innovative digital products.",
    link: "https://github.com/PinTraveler",
  },

  // ── Learning ────────────────────────────────────────────────────────
  {
    lane: "learning",
    start: "2024-06",
    title: "Kubernetes, Docker & Agile Scrum certifications",
    detail: "Simplilearn · Kubernetes and Docker with IBM",
    period: "Jun 2024",
    link: "/certs/kubernetes-ibm.pdf",
  },
  {
    lane: "learning",
    start: "2024-12",
    title: "DevOps Post Graduate Program",
    detail: "Caltech CTME (via Simplilearn)",
    period: "Dec 2024",
    blurb:
      "Completed alongside the Dama Health contract, during the CTO transition.",
    link: "/certs/devops-caltech.pdf",
  },

  // ── Projects (launch markers — kept sparse) ─────────────────────────
  {
    lane: "projects",
    start: "2025-11",
    title: "LexiKey",
    period: "Nov 2025",
    blurb: "Enhanced keyboard interactions and text processing.",
    link: "https://www.lexikey.org/",
  },
  {
    lane: "projects",
    start: "2026-01",
    title: "Composure v0.1.9",
    period: "Jan 2026",
    blurb: "TUI dashboard for Docker-Compose stacks.",
    link: "https://pypi.org/project/composure/",
  },
  {
    lane: "projects",
    start: "2026-03",
    title: "PageAlert",
    period: "Mar 2026",
    blurb: "AI-powered website monitoring. Open source.",
    link: "https://pagealert.io",
  },
  {
    lane: "projects",
    start: "2026-04",
    end: "present",
    title: "MyEtAl",
    detail: "Actively building",
    period: "Apr 2026 – Present",
    blurb: "Share your research with a QR code. Web + iOS + Android.",
    link: "https://myetal.app",
  },

  // ── Location (coarse, approximate) ──────────────────────────────────
  {
    lane: "location",
    start: "2018-06",
    end: "2025-06", // approximate — left for South America mid 2025
    title: "United Kingdom",
    period: "2018 – mid 2025",
    blurb: "Home base.",
  },
  {
    lane: "location",
    start: "2025-06", // approximate trip start
    end: "2026-04",
    title: "South & Central America",
    period: "~Mid 2025 – Apr 2026",
    blurb:
      "Colombia → Bolivia → Peru → Ecuador → Colombia → Panama → Costa Rica → Nicaragua → El Salvador → Guatemala → Mexico. Working remotely for Dama Health throughout.",
  },
  {
    lane: "location",
    start: "2026-04",
    end: "2026-05",
    title: "United Kingdom",
    period: "Apr – May 2026",
    blurb: "Back briefly between trips.",
  },
  {
    lane: "location",
    start: "2026-05",
    end: "present",
    title: "Asia",
    period: "May 2026 – Present",
    blurb:
      "Malaysia → Thailand (Open Water diving on Koh Tao) → Sumatra → Bali → Gili Islands. Nepal trekking planned for October 2026.",
  },
];
