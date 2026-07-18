"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, Award, Server, MapPin, Calendar, Users, Sparkles, ChevronDown, Briefcase, Code, Wrench, MessageCircle, Quote, ArrowUpRight, FlaskConical, GitCommitHorizontal, Lock } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GitHubStats } from "@/components/github-stats";
import { ScrambleText } from "@/components/scramble-text";
import { RotatingTypewriter } from "@/components/rotating-typewriter";
import { CyclingMoreBadge } from "@/components/cycling-more-badge";
import { TimezoneCompare } from "@/components/timezone-compare";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InquiryForm } from "@/components/inquiry-form";
import { projects } from "@/lib/projects";
import type { LatestCommit } from "@/app/api/commits/route";

// ============================================
// UPDATE THESE WHEN YOU MOVE TO A NEW LOCATION
// LOCATION = the broad region (used in prose), BASE = where you actually are
// ============================================
const CURRENT_LOCATION = "Southeast Asia";
const CURRENT_BASE = "Gili Islands, Indonesia";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Animated section wrapper
function AnimatedSection({ children, className, delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function relativeDate(iso: string): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${Math.max(diffMins, 1)}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

type DeepDive = {
  intro: string;
  sections: { title: string; items: string[] }[];
};

type Experience = {
  company: string;
  role: string;
  period: string;
  status: "active" | "past";
  contract?: boolean;
  summary: string;
  highlights: string[];
  link?: string;
  deepDive?: DeepDive;
};

const experience: Experience[] = [
  {
    company: "PinTraveler",
    role: "Senior Full Stack Developer",
    period: "2025 - Present",
    status: "active",
    contract: true,
    summary: "Creating travel experiences through innovative digital products.",
    highlights: [],
    link: "https://github.com/PinTraveler",
  },
  {
    company: "Dama Health",
    role: "Senior Full Stack Developer \u00b7 Tech Lead",
    period: "2024 - Present",
    status: "active",
    contract: true,
    summary: "London-based women\u2019s healthtech startup serving the US market. Sole engineer and tech lead \u2014 I own the product (an AI clinician copilot, embeddable patient-intake funnels) and the compliance programme behind it.",
    highlights: [
      "Took over full technical ownership as the outgoing CTO transitioned out",
      "Built Dama Assist, an AI copilot for women\u2019s-health clinicians \u2014 Gemini on Vertex AI, Convex, Next.js",
      "Built revenue-generating embeddable patient-intake funnels for client websites",
      "Run the HIPAA compliance programme on Vanta: security policy suite, risk register, vendor reviews",
      "Optimised AWS infrastructure, delivering significant cost savings",
    ],
    link: "https://github.com/damahealth",
    deepDive: {
      intro:
        "Contract roles usually mean feature work. At Dama I run the whole engineering function \u2014 the product itself, and the compliance machinery a US healthcare product needs behind it.",
      sections: [
        {
          title: "Product",
          items: [
            "Dama Assist \u2014 an AI copilot for women\u2019s-health clinicians: Gemini (Vertex AI) chat grounded in medication, supplement, and clinical-guideline context, with literature search over PubMed",
            "Embeddable patient-intake funnels that clients drop into their own websites",
            "Subscriptions and billing (Stripe), NPI clinician verification against the CMS registry, transactional and marketing email flows",
          ],
        },
        {
          title: "Compliance & security engineering",
          items: [
            "Policy owner for the HIPAA compliance programme on Vanta \u2014 own and annually review the full security policy suite: data management, risk management, incident response, BC/DR, secure development, operations security",
            "Ran a full vendor PHI-security audit: mapped data flows across 13 vendors, surfaced critical exposures (including LLM analytics tracing capturing full clinical conversations), and drove the BAA execution plan",
            "Overhauled the company risk register \u2014 including adding AI-specific risks like clinical hallucination and prompt injection",
            "Wrote and executed the quarterly data-restore runbook: first Convex restore test passed with 100% row-count fidelity, in ~30 minutes against a 4-hour RTO",
            "GDPR/CCPA compliance planning: cookie-consent architecture, privacy policy and Terms of Service groundwork for a UK company processing data in the US",
          ],
        },
      ],
    },
  },
  {
    company: "Where You At",
    role: "Head of Engineering",
    period: "Mar 2022 - 2024",
    status: "past" as const,
    summary: "Led engineering for a nightlife safety startup using indoor positioning with Bluetooth beacons.",
    highlights: [
      "Scaled team from 2 to 8 members (iOS, Android, Web), acting as Scrum Master and Product Owner",
      "Architected core NestJS API, grew user base to 65,000 with 3,000 MAU across 17 UK venues",
      "Built GCP infrastructure with Docker, Cloud Build CI/CD, PostgreSQL with PostGIS",
      "Migrated Next.js 12 to 14 with App Router, significantly improving performance",
      "Won Geospatial Innovation Award from Ordnance Survey",
    ],
  },
  {
    company: "SailGP",
    role: "Senior Full-Stack Developer",
    period: "Dec 2021 - Oct 2022",
    status: "past" as const,
    summary: "Part of the technical team for the global sailing championship, preparing infrastructure for each event.",
    highlights: [
      "Mastered Docker containerisation, improving deployment efficiency by 40%",
      "Created hybrid AWS/Oracle Cloud solution with 30% cost reduction and 99.99% uptime",
      "Led and technically managed external teams on specific projects",
      "Improved sprint management, increasing productivity by 15% and reducing overruns by 50%",
    ],
  },
  {
    company: "HALO Screening",
    role: "Front-End Developer",
    period: "May 2020 - Nov 2021",
    status: "past" as const,
    summary: "COVID-19 testing provider building mobile apps and web consoles for PCR test management.",
    highlights: [
      "Created online webstore in one week, featured on government website, 1,000+ kits sold in 24 hours",
      "Contributed to £250,000+ in test kit sales through the platform",
      "Increased API response speed by 45% through Django backend optimisation",
      "Maintained 99.9% uptime on AWS infrastructure (EC2, S3)",
    ],
  },
  {
    company: "Omnis Interactive",
    role: "Front-End Developer",
    period: "Jun 2018 - Apr 2020",
    status: "past" as const,
    summary: "AI chatbot startup serving businesses on Messenger to engage new markets.",
    highlights: [
      "Built Express.js API, upgraded from ES6 to TypeScript for scalability",
      "Created native mobile app for conversation monitoring (Angular 5, TypeScript)",
      "Built internal dashboard for API usage and error monitoring (React, Redux, Firebase)",
    ],
  },
];

const certifications = [
  {
    title: "DevOps Post Graduate Program",
    issuer: "Caltech",
    date: "December 2024",
    file: "/certs/devops-caltech.pdf",
  },
  {
    title: "Kubernetes with IBM",
    issuer: "Simplilearn",
    date: "June 2024",
    file: "/certs/kubernetes-ibm.pdf",
  },
  {
    title: "Docker with IBM",
    issuer: "Simplilearn",
    date: "June 2024",
    file: "/certs/docker-ibm.pdf",
  },
  {
    title: "Agile Scrum Foundation",
    issuer: "Simplilearn",
    date: "June 2024",
    file: "/certs/agile-scrum-foundation.pdf",
  },
];

const homelab = [
  "Kubernetes Cluster",
  "TrueNAS",
  "Proxmox",
  "Jenkins",
  "Jellyfin",
  "Nginx Proxy Manager",
  "Pi-hole",
  "Home Assistant",
  "Ubiquiti Network",
];

const techStack = [
  "TypeScript",
  "Python",
  "Next.js",
  "React",
  "React Native",
  "Expo",
  "Node.js",
  "Hono",
  "FastAPI",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "Convex",
  "Firebase",
  "AWS",
  "Google Cloud",
  "Vercel",
  "Docker",
  "Kubernetes",
  "Nginx",
  "Claude Code",
  "Cursor",
  "CodeRabbit",
  "PostHog",
  "Google Search Console",
  "Linear",
  "Jira",
  "Figma",
];

// Featured techs shown in overview (rest are in expandable)
const featuredTechs = ["TypeScript", "React", "Next.js", "Node.js", "Kubernetes", "AWS"];

const services = [
  {
    title: "Idea to Shipped Product",
    description: "Take your concept from zero to production — web, mobile, or both",
  },
  {
    title: "AI-Augmented Development",
    description: "Ship faster with AI agent workflows — one person, team-level output",
  },
  {
    title: "Infrastructure & DevOps",
    description: "Cloud architecture, Kubernetes, CI/CD pipelines, and cost optimisation",
  },
  {
    title: "SEO & Growth",
    description: "Technical SEO, Google Search Console, Core Web Vitals, and performance",
  },
  {
    title: "Technical Leadership",
    description: "Code review, architecture decisions, team setup, and mentoring",
  },
  {
    title: "Rescue & Takeover",
    description: "Inherit existing codebases, stabilise, and improve — I\u2019ve done it before",
  },
];

// ============================================
// UPDATE THIS TO SET MONTHLY AVAILABILITY
// Key format: "YYYY-MM" — any month not listed defaults to "good"
// ============================================
const availability: Record<string, "good" | "ok" | "limited"> = {
  "2026-05": "ok",
  "2026-06": "ok",
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const testimonials = [
  {
    quote: "I've had the pleasure of working with James on two projects, Pin Traveler and WYA, and he's the person you want on your team. He's your go-to for anything in software, especially full-stack development. He combines his technical expertise with calm, professional leadership, takes on complex challenges without hesitation, and consistently delivers high quality products with passion.",
    name: "Mehmet Can Alaca",
    role: "Senior iOS Developer & Co-Founder",
    company: "Pin Traveler",
    linkedin: "https://www.linkedin.com/in/mehmetcanalaca/",
  },
  {
    quote: "James was our Head of Engineering at WYA for two years and the difference he made is hard to overstate. He scaled the team from two to eight, shipped the beacon-positioning tech that won us the Ordnance Survey Geospatial Innovation Award, and got us to 65,000 users without ever losing his head. The thing about James is he just owns things — you hand him a problem and stop worrying about it. I'd hire him again in a heartbeat.",
    name: "Tamzin Lent",
    role: "Founder & CEO",
    company: "Where You At",
    linkedin: "https://uk.linkedin.com/in/tamzin-lent-53072a157",
  },
  {
    quote: "James is super passionate about his work and will give 100% to deliver whatever is needed.",
    name: "Andrew Muzzelle",
    role: "Chief Digital Officer",
    company: "Where You At",
    linkedin: "https://www.linkedin.com/in/muzzelle/",
  },
  {
    quote: "James was a fantastic addition to the SailGP tech team. What stood out most was his ability to quickly get to grips with a problem and come back with a pragmatic, well-thought-out solution — without needing his hand held. He collaborated brilliantly with the wider team and with external partners, which is why I trusted him to tech lead the Impact League project alongside Cognizant. Honestly, I was gutted when he left. I'd work with him again in a heartbeat.",
    name: "Phil O'Grady",
    role: "Head of Platform Engineering",
    company: "SailGP",
    linkedin: "https://www.linkedin.com/in/philogrady/",
  },
];

function SkillsAccordion() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const sections = [
    {
      id: "certifications",
      title: certifications[0].title,
      icon: Award,
      description: `${certifications[0].issuer} · ${certifications[0].date}`,
      content: (
        <div className="space-y-3">
          <div className="flex gap-2">
            <a
              href={certifications[0].file}
              target="_blank"
              rel="noopener"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <ExternalLink className="size-4" />
              View Certificate
            </a>
          </div>
          {certifications.length > 1 && (
            <div className="space-y-2 border-t border-border pt-3">
              <p className="text-xs font-medium text-muted-foreground">Other certifications</p>
              {certifications.slice(1).map((cert) => (
                <div key={cert.title} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                  </div>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                  >
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "github",
      title: "GitHub Activity",
      icon: Github,
      description: "Live stats from my profile",
      content: <GitHubStats compact />,
    },
    {
      id: "techstack",
      title: "Full Tech Stack",
      icon: Code,
      description: `${techStack.length} technologies`,
      content: (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-wrap gap-2"
        >
          {techStack.map((tech) => (
            <motion.div key={tech} variants={staggerItem}>
              <Badge variant="outline">{tech}</Badge>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
    {
      id: "homelab",
      title: "Homelab",
      icon: Server,
      description: "Self-hosted infrastructure",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            My mini-datacenter running production services for family—Nextcloud, Jellyfin, and more
          </p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-wrap gap-2"
          >
            {homelab.map((item) => (
              <motion.div key={item} variants={staggerItem}>
                <Badge variant="outline">{item}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {sections.map(({ id, title, icon: Icon, description, content }) => (
        <Card
          key={id}
          size="sm"
          className={cn("cursor-pointer", expanded === id && "ring-primary/50")}
          onClick={() => toggle(id)}
        >
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-xs">{description}</CardDescription>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expanded === id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="size-5 text-muted-foreground" />
              </motion.div>
            </div>
          </CardHeader>
          <motion.div
            initial={false}
            animate={{
              height: expanded === id ? "auto" : 0,
              opacity: expanded === id ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-4" onClick={(e) => e.stopPropagation()}>
              {content}
            </CardContent>
          </motion.div>
        </Card>
      ))}
    </div>
  );
}

function DeepDiveDialog({ company, deepDive }: { company: string; deepDive: DeepDive }) {
  return (
    <Dialog>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        render={<Button variant="outline" size="sm" />}
      >
        What I actually do here
        <ArrowUpRight className="size-4" />
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{company} — beyond the bullet points</DialogTitle>
          <DialogDescription>{deepDive.intro}</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          {deepDive.sections.map((section) => (
            <div key={section.title} className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {section.title}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ExperienceCard({ exp, isExpanded, onToggle }: {
  exp: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasHighlights = exp.highlights.length > 0;

  return (
    <motion.div
      variants={staggerItem}
      transition={{ duration: 0.4 }}
    >
      <Card
        size="sm"
        className={cn(
          hasHighlights && "cursor-pointer",
          isExpanded && "ring-primary/50"
        )}
        onClick={hasHighlights ? onToggle : undefined}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 flex-wrap">
                {exp.company}
                <Badge variant={exp.status === "active" ? "default" : "secondary"}>
                  {exp.status === "active" ? "Current" : "Past"}
                </Badge>
                {"contract" in exp && exp.contract && (
                  <Badge variant="outline">Contract</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {exp.role} &middot; {exp.period}
              </CardDescription>
            </div>
            {hasHighlights && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="size-5 text-muted-foreground shrink-0" />
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{exp.summary}</p>
          <motion.div
            initial={false}
            animate={{
              height: isExpanded && hasHighlights ? "auto" : 0,
              opacity: isExpanded && hasHighlights ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {hasHighlights && (
              <ul className="space-y-2 text-sm text-muted-foreground border-t border-border pt-3">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </CardContent>
        {(exp.deepDive || (exp.link && !isExpanded)) && (
          <CardFooter className="gap-2">
            {exp.deepDive && (
              <DeepDiveDialog company={exp.company} deepDive={exp.deepDive} />
            )}
            {exp.link && !isExpanded && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.stopPropagation()}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                <Github className="size-4" />
                View Organization
              </a>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

function AvailabilityCalendar() {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return { label: MONTH_NAMES[d.getMonth()], status: availability[key] || "good" };
  });

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Availability</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {months.map(({ label, status }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className="text-xs text-muted-foreground">{label}</span>
            <div
              className={cn(
                "h-2 w-full rounded-full",
                status === "good" && "bg-green-500",
                status === "ok" && "bg-yellow-500",
                status === "limited" && "bg-red-500",
              )}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="inline-block size-2 rounded-full bg-green-500" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="inline-block size-2 rounded-full bg-yellow-500" /> Some availability</span>
        <span className="flex items-center gap-1.5"><span className="inline-block size-2 rounded-full bg-red-500" /> Limited</span>
      </div>
    </div>
  );
}

export default function Page() {
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("experience");
  const [commits, setCommits] = useState<Record<string, LatestCommit> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/commits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.commits) setCommits(data.commits);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Most recently committed project first; repos without commit data keep
  // their hand-curated order at the bottom.
  const sortedProjects = useMemo(() => {
    if (!commits) return projects;
    return [...projects].sort((a, b) => {
      const da = commits[a.repo]?.date;
      const db = commits[b.repo]?.date;
      if (da && db) return new Date(db).getTime() - new Date(da).getTime();
      if (da) return -1;
      if (db) return 1;
      return 0;
    });
  }, [commits]);
  const experienceRef = useRef(null);
  const experienceInView = useInView(experienceRef, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: "0px" });

  const scrollToContact = () => {
    document.getElementById("work-together")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchTabAndScroll = (tab: string) => {
    setActiveTab(tab);
    scrollToSection("portfolio");
  };

  const toggleExp = (company: string) => {
    setExpandedExp(expandedExp === company ? null : company);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left"
        >
          <div className="order-last md:order-none md:absolute md:top-0 md:right-0">
            <TimezoneCompare variant="hero" />
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="size-32 shrink-0 overflow-hidden rounded-full ring-2 ring-primary"
          >
            <Image
              src="/profile.jpg"
              alt="James Dimonaco"
              width={128}
              height={128}
              className="size-full object-cover"
              priority
            />
          </motion.div>
          <div className="space-y-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-bold tracking-tight cursor-default"
              >
                <ScrambleText text="James Dimonaco" delay={400} />
              </motion.h1>
              <p className="text-lg text-muted-foreground">
                <RotatingTypewriter
                  texts={[
                    "Product Engineer",
                    "AI-Augmented Developer",
                    "DevOps Engineer · Caltech",
                    "Homelab Sysadmin",
                  ]}
                />
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="max-w-lg text-muted-foreground"
            >
              Product engineer and technical generalist from the UK with 8 years of experience. I don&apos;t just write code—I architect solutions, manage AI agents, review their output, and ship complete products. Currently digital nomading through {CURRENT_LOCATION}, building side projects like{" "}
              <a href="https://myetal.app" target="_blank" rel="noopener" className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors">MyEtAl</a>
              {" "}to solve real problems I find along the way.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center justify-center gap-2 md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
              >
                <Sparkles className="size-4" />
                Available for Hire
              </motion.button>
              <a
                href="https://github.com/jamesdimonaco"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://linkedin.com/in/james-dimonaco-436901160"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="mailto:James@dimonaco.co.uk"
                aria-label="Email"
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <Mail className="size-4" />
              </a>
              <a
                href="https://wa.me/447402440605"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <MessageCircle className="size-4" />
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Right Now Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Right now
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <button
              onClick={() => switchTabAndScroll("experience")}
              className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Briefcase className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Contracting</p>
                <p className="text-xs text-muted-foreground">
                  Dama Health — AI clinician copilot, plus HIPAA &amp; GDPR compliance engineering
                </p>
              </div>
            </button>
            <button
              onClick={() => switchTabAndScroll("projects")}
              className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <FlaskConical className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Building</p>
                <p className="text-xs text-muted-foreground">
                  Tools for researchers — MyEtAl, Research Homepage, taxon-sync
                </p>
              </div>
            </button>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <MapPin className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Based in</p>
                <p className="text-xs text-muted-foreground">{CURRENT_BASE}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sticky Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: heroInView ? 0 : 1, y: heroInView ? -10 : 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md pointer-events-auto"
          style={{ pointerEvents: heroInView ? "none" : "auto" }}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex h-12 items-center justify-between gap-2">
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-semibold">JD</span>
                <div className="hidden sm:block">
                  <TimezoneCompare />
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto sm:gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { label: "Experience", action: () => switchTabAndScroll("experience") },
                  { label: "Projects", action: () => switchTabAndScroll("projects") },
                  { label: "Skills", action: () => switchTabAndScroll("skills") },
                  { label: "Testimonials", action: () => scrollToSection("testimonials") },
                  { label: "Contact", action: () => scrollToSection("work-together") },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="whitespace-nowrap rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-muted sm:px-2.5"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>

        <Separator className="my-12" />

        {/* Portfolio Tabs Section */}
        <AnimatedSection id="portfolio" className="space-y-6 scroll-mt-16">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as string)}>
            <TabsList className="w-full">
              <TabsTrigger value="experience" className="flex-1 gap-1.5">
                <Briefcase className="size-3.5" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex-1 gap-1.5">
                <Code className="size-3.5" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex-1 gap-1.5">
                <Wrench className="size-3.5" />
                Skills
              </TabsTrigger>
            </TabsList>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">
                8 years across startups and enterprises—click to expand
              </p>
              <motion.div
                ref={experienceRef}
                initial="hidden"
                animate={experienceInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="grid gap-4"
              >
                {experience.map((exp) => (
                  <ExperienceCard
                    key={exp.company}
                    exp={exp}
                    isExpanded={expandedExp === exp.company}
                    onToggle={() => toggleExp(exp.company)}
                  />
                ))}
              </motion.div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">
                Side projects and things I&apos;ve built
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {sortedProjects.map((project, index) => {
                  const commit = commits?.[project.repo];
                  return (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card size="sm" className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 flex-wrap">
                            {project.title}
                            {project.active && <Badge>Actively building</Badge>}
                          </CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          {commit && (
                            <a
                              href={commit.url}
                              target={commit.url ? "_blank" : undefined}
                              rel={commit.url ? "noopener" : undefined}
                              className={cn(
                                "flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground",
                                commit.url && "transition-colors hover:text-foreground",
                                !commit.url && "pointer-events-none",
                              )}
                            >
                              <GitCommitHorizontal className="size-3.5 shrink-0" />
                              <span className="truncate">{commit.message}</span>
                              <span className="shrink-0 text-muted-foreground/60">
                                · {relativeDate(commit.date)}
                              </span>
                            </a>
                          )}
                        </CardContent>
                        <CardFooter className="gap-2">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener"
                              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                            >
                              <Github className="size-4" />
                              Code
                            </a>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 text-xs text-muted-foreground">
                              <Lock className="size-3.5" />
                              Private repo
                            </span>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener"
                              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                            >
                              <ExternalLink className="size-4" />
                              Live
                            </a>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">
                Tech-agnostic and always learning—click to explore
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {featuredTechs.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
                <CyclingMoreBadge items={techStack} featured={featuredTechs} />
              </div>
              <SkillsAccordion />
            </TabsContent>
          </Tabs>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <>
            <AnimatedSection id="testimonials" className="space-y-6 scroll-mt-16">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                  <Quote className="size-5" />
                  What People Say
                </h2>
                <p className="text-muted-foreground">
                  From people I&apos;ve worked with
                </p>
              </div>
              <div className="grid gap-4">
                {testimonials.map((t, index) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="space-y-4">
                        <p className="text-base italic text-muted-foreground sm:text-lg">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{t.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {t.role} · {t.company}
                            </p>
                          </div>
                          {t.linkedin && (
                            <a
                              href={t.linkedin}
                              target="_blank"
                              rel="noopener"
                              aria-label={`${t.name} on LinkedIn`}
                              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                            >
                              <Linkedin className="size-4" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <Separator className="my-12" />
          </>
        )}

        {/* Work Together Section */}
        <AnimatedSection id="work-together" className="space-y-8 scroll-mt-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground">
              Open to side projects, contract roles, and everything in between
            </p>
          </div>

          {/* Status Cards */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-3"
          >
            <motion.div variants={staggerItem}>
              <Card size="sm">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{CURRENT_BASE}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Card size="sm">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">8 years</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Card size="sm">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Team Lead</p>
                      <p className="text-sm text-muted-foreground">Up to 8 people</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  I started coding young and never stopped. With 8 years of hands-on experience,
                  I&apos;ve led teams of up to 8 people (6 devs, QA, and designer) and shipped products
                  from zero to production. Communicating with stakeholders and non-technical partners
                  has been a regular part of my experience.
                </p>
                <p className="text-muted-foreground">
                  I work as a <span className="text-foreground font-medium">product engineer</span>, not just a developer.
                  My role is to architect, review, and ship—using AI agents as my engineering team.
                  I manage workflows with <span className="text-foreground font-medium">Claude Code</span> and{" "}
                  <span className="text-foreground font-medium">Cursor</span>, review code with{" "}
                  <span className="text-foreground font-medium">CodeRabbit</span>, track analytics with{" "}
                  <span className="text-foreground font-medium">PostHog</span>, and manage delivery with{" "}
                  <span className="text-foreground font-medium">Linear</span>.
                  This makes me a force multiplier—one person delivering what traditionally takes a team.
                </p>
                <p className="text-muted-foreground">
                  I&apos;m tech-agnostic and adapt to whatever your stack needs. I also have strong{" "}
                  <span className="text-foreground font-medium">SEO</span> experience with Google Search Console
                  across multiple live apps. Currently travelling through {CURRENT_LOCATION} as a digital nomad.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What I Can Help With</h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-3 sm:grid-cols-2"
            >
              {services.map((service) => (
                <motion.div key={service.title} variants={staggerItem} className="flex gap-3">
                  <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{service.title}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Work With Me</CardTitle>
                <CardDescription>
                  Tell me what you&apos;re building — I&apos;ll reply within a day.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InquiryForm />
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6 space-y-5">
                <p className="text-muted-foreground text-center sm:text-left">
                  I&apos;m open to a variety of opportunities—from simple websites to complex SaaS platforms,
                  including side projects, contract roles, and long-term partnerships.
                </p>

                {/* Availability calendar */}
                <AvailabilityCalendar />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/447402440605"
                    target="_blank"
                    rel="noopener"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatedSection>
      </div>
    </main>
  );
}
