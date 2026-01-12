"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Star, GitFork, Users, Code, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface GitHubStatsData {
  totalRepos: number;
  totalStars: number;
  followers: number;
  contributions: number;
  topLanguages: { name: string; count: number }[];
}

// Language colors (GitHub style)
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  default: "#8b8b8b",
};

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (value - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 }
  },
};

const statCards = [
  { key: "totalRepos", label: "Repositories", icon: GitFork, color: "#a78bfa" },
  { key: "totalStars", label: "Stars Earned", icon: Star, color: "#fbbf24" },
  { key: "contributions", label: "Contributions", icon: Flame, color: "#34d399" },
  { key: "followers", label: "Followers", icon: Users, color: "#60a5fa" },
] as const;

export function GitHubStats({ compact = false }: { compact?: boolean }) {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (error) return null; // Silently fail - don't show section if API fails

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="space-y-6"
    >
      {/* Header - hidden in compact mode */}
      {!compact && (
        <div>
          <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Github className="size-5" />
            GitHub Activity
          </h2>
          <p className="text-muted-foreground">
            Live stats from my GitHub profile
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <motion.div key={key} variants={staggerItem}>
            <Card size="sm" className="relative overflow-hidden group">
              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
              />
              <CardContent className="relative">
                <div className="flex flex-col items-center text-center gap-1">
                  <Icon className="size-5 mb-1" style={{ color }} />
                  <span className="text-2xl font-bold">
                    {loading ? (
                      <span className="inline-block w-8 h-6 bg-muted animate-pulse rounded" />
                    ) : (
                      <AnimatedCounter value={stats?.[key] || 0} />
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Languages */}
      {stats?.topLanguages && stats.topLanguages.length > 0 && (
        <motion.div variants={staggerItem}>
          <Card size="sm" className="hover:scale-100 hover:shadow-none hover:ring-foreground/10">
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Code className="size-4 text-primary" />
                <span className="text-sm font-medium">Top Languages</span>
              </div>
              <div className="space-y-2">
                {stats.topLanguages.map((lang, index) => {
                  const maxCount = stats.topLanguages[0].count;
                  const percentage = (lang.count / maxCount) * 100;
                  const color = languageColors[lang.name] || languageColors.default;

                  return (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs text-muted-foreground w-20 truncate">
                        {lang.name}
                      </span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6 text-right">
                        {lang.count}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
