"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CyclingMoreBadgeProps {
  items: string[];
  featured: string[];
  intervalMs?: number;
}

export function CyclingMoreBadge({ items, featured, intervalMs = 800 }: CyclingMoreBadgeProps) {
  const remaining = items.filter(item => !featured.includes(item));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % remaining.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [remaining.length, isHovered, intervalMs]);

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border text-xs text-muted-foreground cursor-default overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-primary font-medium">+{remaining.length}</span>
      <span className="w-px h-3 bg-border" />
      <motion.span
        key={currentIndex}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-w-[60px]"
      >
        {remaining[currentIndex]}
      </motion.span>
    </motion.div>
  );
}
