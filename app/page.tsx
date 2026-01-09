"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, Award, Server, MapPin, Calendar, Users, Sparkles, ChevronDown, Briefcase, Code, Wrench } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GitHubStats } from "@/components/github-stats";

// ============================================
// UPDATE THIS WHEN YOU MOVE TO A NEW LOCATION
// ============================================
const CURRENT_LOCATION = "Colombia";

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

// Typewriter component
function Typewriter({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
}

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

const projects = [
  {
    title: "LexiKey",
    description: "A TypeScript project for enhanced keyboard interactions and text processing.",
    tech: ["TypeScript"],
    github: "https://github.com/JamesDimonaco/LexiKey",
    live: "https://www.lexikey.org/",
  },
  {
    title: "Research Homepage",
    description: "A modern research homepage built with TypeScript and Next.js.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/jamesdimonaco/research-homepage",
    live: "https://nicholas.dimonaco.co.uk/",
  },
  {
    title: "Travel Kitchen",
    description: "A travel-focused culinary app for discovering recipes on the go.",
    tech: ["TypeScript", "React"],
    github: "https://github.com/jamesdimonaco/travel-kitchen",
    live: "https://travelkitchen.app/",
  },
  {
    title: "Trek Together",
    description: "A collaborative hiking and trekking companion application.",
    tech: ["TypeScript", "React Native"],
    github: "https://github.com/jamesdimonaco/trek-together",
    live: "https://www.trektogether.app/",
  },
];

const experience = [
  {
    company: "Dama Health",
    role: "Full Stack Developer",
    period: "2024 - Present",
    status: "active" as const,
    summary: "Building healthcare solutions with modern web technologies.",
    highlights: [],
    link: "https://github.com/damahealth",
  },
  {
    company: "PinTraveler",
    role: "Full Stack Developer",
    period: "2024 - Present",
    status: "active" as const,
    summary: "Creating travel experiences through innovative digital products.",
    highlights: [],
    link: "https://github.com/PinTraveler",
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
  "JavaScript",
  "Rust",
  "Python",
  "Next.js",
  "React",
  "React Native",
  "Expo",
  "Node.js",
  "FastAPI",
  "Prisma",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Google Cloud",
  "Vercel",
  "Docker",
  "Kubernetes",
  "Nginx",
  "Figma",
  "HTML5",
  "CSS3",
];

const services = [
  {
    title: "Greenfield Web Applications",
    description: "Full-stack web apps from scratch using Next.js, React, and modern tooling",
  },
  {
    title: "Mobile Development",
    description: "Cross-platform apps with React Native and Expo",
  },
  {
    title: "Infrastructure & DevOps",
    description: "Server setup, Kubernetes, CI/CD pipelines, and cloud architecture",
  },
  {
    title: "SEO & Performance",
    description: "Technical SEO, Core Web Vitals optimisation, and site speed improvements",
  },
  {
    title: "Team Leadership",
    description: "Development process setup, code reviews, and mentoring",
  },
  {
    title: "AI Integration",
    description: "Modern AI tooling and workflows to supercharge your team",
  },
];

function SkillsAccordion() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const sections = [
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

function ExperienceCard({ exp, isExpanded, onToggle, index }: {
  exp: typeof experience[0];
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
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
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </CardContent>
        {exp.link && !isExpanded && (
          <CardFooter>
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
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

export default function Page() {
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const experienceRef = useRef(null);
  const experienceInView = useInView(experienceRef, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const scrollToContact = () => {
    document.getElementById("work-together")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleExp = (company: string) => {
    setExpandedExp(expandedExp === company ? null : company);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="size-32 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary"
          >
            <div className="flex size-full items-center justify-center text-4xl text-muted-foreground">
              JD
            </div>
          </motion.div>
          <div className="space-y-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-bold tracking-tight"
              >
                James Dimonaco
              </motion.h1>
              <p className="text-lg text-muted-foreground">
                <Typewriter text="Full Stack Developer" />
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="max-w-lg text-muted-foreground"
            >
              Full stack developer from the UK with 8 years of experience. Currently digital nomading through {CURRENT_LOCATION}.
              This isn&apos;t just my job—it&apos;s my passion. I run a homelab that my family depends on daily.
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
            </motion.div>
          </div>
        </motion.section>

        <Separator className="my-12" />

        {/* Experience Section */}
        <AnimatedSection className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Briefcase className="size-5" />
              Experience
            </h2>
            <p className="text-muted-foreground">
              8 years across startups and enterprises—click to expand
            </p>
          </div>
          <motion.div
            ref={experienceRef}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid gap-4"
          >
            {experience.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                isExpanded={expandedExp === exp.company}
                onToggle={() => toggleExp(exp.company)}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* Certifications Section */}
        <AnimatedSection className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
            <p className="text-muted-foreground">
              Professional training and credentials
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="size-4 text-primary" />
                      {cert.title}
                    </CardTitle>
                    <CardDescription>
                      {cert.issuer} &middot; {cert.date}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener"
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                    >
                      <ExternalLink className="size-4" />
                      View Certificate
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* Skills & Tools Section */}
        <AnimatedSection className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Wrench className="size-5" />
              Skills & Tools
            </h2>
            <p className="text-muted-foreground">
              Tech-agnostic and always learning—click to explore
            </p>
          </div>

          {/* Overview badges - top items from each category */}
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "React", "Next.js", "Node.js", "Kubernetes", "AWS"].map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
            <Badge variant="outline" className="text-muted-foreground">+{techStack.length - 6} more</Badge>
          </div>

          {/* Expandable sections */}
          <SkillsAccordion />
        </AnimatedSection>

        <Separator className="my-12" />

        {/* Projects Section */}
        <AnimatedSection className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">
              Side projects and things I&apos;ve built
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                    >
                      <Github className="size-4" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener"
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                    >
                      <ExternalLink className="size-4" />
                      Live
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* Work Together Section */}
        <AnimatedSection id="work-together" className="space-y-8 scroll-mt-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground">
              Available for contract work
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
                      <p className="text-sm text-muted-foreground">{CURRENT_LOCATION}</p>
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
                  from zero to production.
                </p>
                <p className="text-muted-foreground">
                  Currently travelling through {CURRENT_LOCATION} as a digital nomad, which means I&apos;m
                  available at a <span className="text-foreground font-medium">reduced rate</span>.
                  Perfect for startups who need senior experience.
                </p>
                <p className="text-muted-foreground">
                  I&apos;m tech-agnostic and adapt to whatever your stack needs. Need a full team?
                  With modern AI tooling and my broad experience, I can often do the work of
                  multiple specialists for early-stage startups.
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

          {/* Rate & CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="text-2xl font-bold">$400<span className="text-lg font-normal text-muted-foreground">/day</span></p>
                    <p className="text-sm text-muted-foreground">Reduced rate while travelling • Available now</p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:James@dimonaco.co.uk?subject=Project Inquiry"
                    className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                  >
                    <Mail className="size-4" />
                    Get in Touch
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
