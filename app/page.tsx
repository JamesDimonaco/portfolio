"use client";

import { Github, Linkedin, Mail, ExternalLink, Award, Server } from "lucide-react";
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

const companies = [
  {
    name: "Dama Health",
    role: "Full Stack Developer",
    period: "Present",
    status: "active" as const,
    description: "Building healthcare solutions with modern web technologies.",
    link: "https://github.com/damahealth",
  },
  {
    name: "PinTraveler",
    role: "Full Stack Developer",
    period: "Present",
    status: "active" as const,
    description: "Creating travel experiences through innovative digital products.",
    link: "https://github.com/PinTraveler",
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

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="size-32 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary">
            <div className="flex size-full items-center justify-center text-4xl text-muted-foreground">
              JD
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">James Dimonaco</h1>
              <p className="text-lg text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
            <p className="max-w-lg text-muted-foreground">
              Full stack developer from the United Kingdom with a passion for infrastructure and DevOps.
              Building modern web applications while running a homelab with Kubernetes, hypervisors, and self-hosted services.
            </p>
            <div className="flex items-center justify-center gap-2 md:justify-start">
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
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Certifications Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
            <p className="text-muted-foreground">
              Professional training and credentials
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <Card key={cert.title} size="sm">
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
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Homelab Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Server className="size-5" />
              Homelab
            </h2>
            <p className="text-muted-foreground">
              Self-hosted infrastructure for learning and experimentation
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {homelab.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Tech Stack Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Tech Stack</h2>
            <p className="text-muted-foreground">
              Technologies I work with
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Projects Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">
              Side projects and things I&apos;ve built
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.title} size="sm">
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
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Experience Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Experience
            </h2>
            <p className="text-muted-foreground">
              Companies I&apos;m currently working with
            </p>
          </div>
          <div className="grid gap-4">
            {companies.map((company) => (
              <Card key={company.name} size="sm">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {company.name}
                        <Badge
                          variant={
                            company.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {company.status === "active" ? "Current" : "Past"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {company.role} &middot; {company.period}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {company.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noopener"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                  >
                    <Github className="size-4" />
                    View Organization
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
