"use client";

import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { timelineEntries, type TimelineLane } from "@/lib/timeline";

// Single vertical spine, newest first. Each entry is a dot on the spine plus
// content to its right. Lane is shown by dot colour + a small badge — no
// parallel columns, so nothing can overflow a narrow phone. The one signature
// effect is the spine drawing itself as you scroll (desktop only; disabled
// under reduced-motion and on touch-sized layouts to avoid scroll jank).

const LANES: Record<
  TimelineLane,
  { label: string; dot: string; text: string }
> = {
  work: {
    label: "Work",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  learning: {
    label: "Learning",
    dot: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400",
  },
  projects: {
    label: "Projects",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
};

const LEGEND: TimelineLane[] = ["work", "learning", "projects"];

const monthIdx = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const laneRank: Record<TimelineLane, number> = {
  work: 0,
  projects: 1,
  learning: 2,
};

// Newest first — most recent at the top, 2018 at the bottom.
const sorted = [...timelineEntries].sort(
  (a, b) =>
    monthIdx(b.start) - monthIdx(a.start) || laneRank[a.lane] - laneRank[b.lane]
);

export function CareerTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.6"],
  });

  const reveal = reduce
    ? {}
    : ({
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.4 },
      } as const);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {LEGEND.map((lane) => (
          <span
            key={lane}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span className={cn("size-2 rounded-full", LANES[lane].dot)} />
            {LANES[lane].label}
          </span>
        ))}
      </div>

      <div ref={listRef} className="relative">
        {/* Static spine — sits under the row of dots (left-[7px] = centre of
            the 16px dot column, minus half the 2px line). */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
        {/* Scroll-drawn spine — the signature effect. md-and-up only. */}
        <motion.div
          className="absolute top-2 bottom-2 left-[6px] hidden w-[2px] origin-top bg-primary md:block"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />

        <div className="space-y-7">
          {sorted.map((e) => {
            const lane = LANES[e.lane];
            const ongoing = e.end === "present";
            return (
              <motion.div
                key={`${e.title}-${e.start}`}
                className="relative flex gap-4"
                {...reveal}
              >
                {/* Dot column */}
                <div className="relative z-10 mt-1 shrink-0">
                  <span
                    className={cn(
                      "block size-4 rounded-full ring-4 ring-background",
                      lane.dot
                    )}
                  />
                  {ongoing && (
                    <span
                      className={cn(
                        "absolute inset-0 size-4 animate-ping rounded-full opacity-60",
                        lane.dot
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    {e.link ? (
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noopener"
                        className="text-sm font-medium underline-offset-4 hover:underline"
                      >
                        {e.title}
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{e.title}</span>
                    )}
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-widest",
                        lane.text
                      )}
                    >
                      {lane.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {e.detail ? `${e.detail} · ` : ""}
                    {e.period}
                  </p>
                  {e.blurb && (
                    <p className="mt-1 max-w-prose text-sm text-muted-foreground">
                      {e.blurb}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
