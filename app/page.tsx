"use client";

import { Github, Linkedin, Mail, ExternalLink, Award, Server, MapPin, Calendar, Users, Sparkles } from "lucide-react";
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
    title: "Team Leadership",
    description: "Development process setup, code reviews, and mentoring",
  },
  {
    title: "AI Integration",
    description: "Modern AI tooling and workflows to supercharge your team",
  },
  {
    title: "Startup CTO-as-a-Service",
    description: "Technical strategy and execution for early-stage startups",
  },
];

export default function Page() {
  const scrollToContact = () => {
    document.getElementById("work-together")?.scrollIntoView({ behavior: "smooth" });
  };

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
              Full stack developer from the UK with 8 years of experience. Currently digital nomading through South America.
              This isn&apos;t just my job—it&apos;s my passion. I run a homelab that my family depends on daily.
            </p>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <button
                onClick={scrollToContact}
                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
              >
                <Sparkles className="size-4" />
                Available for Hire
              </button>
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
              My mini-datacenter running production services for family—Nextcloud, Jellyfin, and more
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
              Tech-agnostic and always learning—these are my current tools
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

        <Separator className="my-12" />

        {/* Work Together Section */}
        <section id="work-together" className="space-y-8 scroll-mt-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground">
              Available for part-time contract work
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card size="sm">
              <CardContent >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">South America</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          </div>

          {/* About */}
          <Card>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                I started coding young and never stopped. With 8 years of hands-on experience,
                I&apos;ve led teams of up to 8 people (6 devs, QA, and designer) and shipped products
                from zero to production.
              </p>
              <p className="text-muted-foreground">
                Currently travelling through South America as a digital nomad, which means I&apos;m
                available for <span className="text-foreground font-medium">part-time work at a reduced rate</span>.
                Perfect for startups who need senior experience without the full-time commitment.
              </p>
              <p className="text-muted-foreground">
                I&apos;m tech-agnostic and adapt to whatever your stack needs. Need a full team?
                With modern AI tooling and my broad experience, I can often do the work of
                multiple specialists for early-stage startups.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What I Can Help With</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="flex gap-3">
                  <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{service.title}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rate & CTA */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <p className="text-2xl font-bold">$400<span className="text-lg font-normal text-muted-foreground">/day</span></p>
                  <p className="text-sm text-muted-foreground">Reduced rate while travelling • Part-time available</p>
                </div>
                <a
                  href="mailto:James@dimonaco.co.uk?subject=Project Inquiry"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                >
                  <Mail className="size-4" />
                  Get in Touch
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
