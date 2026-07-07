"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { timelineEntries, type TimelineLane } from "@/lib/timeline";

// Layout: CSS grid with three thin "rail" columns (location, projects, work),
// a spine column, and the content column. Ranged entries render duration bars
// in their lane's rail spanning the grid rows their period covers — so
// overlaps (e.g. the Caltech program landing mid-Dama-contract) are visible
// without literal parallel columns. Works down to narrow phone widths.

const LANES: Record<
  TimelineLane,
  { label: string; dot: string; bar: string; text: string; railCol: number }
> = {
  location: {
    label: "Location",
    dot: "bg-sky-500",
    bar: "bg-sky-500/40",
    text: "text-sky-600 dark:text-sky-400",
    railCol: 1,
  },
  projects: {
    label: "Projects",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
    railCol: 2,
  },
  work: {
    label: "Work",
    dot: "bg-amber-500",
    bar: "bg-amber-500/40",
    text: "text-amber-600 dark:text-amber-400",
    railCol: 3,
  },
  learning: {
    label: "Learning",
    dot: "bg-violet-500",
    bar: "bg-violet-500/40",
    text: "text-violet-600 dark:text-violet-400",
    railCol: 0, // no ranged entries — never gets a rail bar
  },
};

const LEGEND: TimelineLane[] = ["work", "learning", "projects", "location"];

const SPINE_COL = 4;
const CONTENT_COL = 5;
const NOW_ROW = 1;

const monthIdx = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const laneRank: Record<TimelineLane, number> = {
  work: 0,
  learning: 1,
  projects: 2,
  location: 3,
};

// Newest first — "Now" sits at the top, 2018 at the bottom.
const sorted = [...timelineEntries].sort(
  (a, b) =>
    monthIdx(b.start) - monthIdx(a.start) || laneRank[a.lane] - laneRank[b.lane]
);

const rowOf = (i: number) => i + 2; // row 1 is the "Now" node
const LAST_ROW = sorted.length + 1;

interface Bar {
  lane: TimelineLane;
  rowStart: number;
  rowEnd: number;
  slot: 0 | 1;
  key: string;
}

function computeBars(): Bar[] {
  const bars: Bar[] = [];
  const byLane = new Map<
    TimelineLane,
    { startIdx: number; endIdx: number; row: number; key: string }[]
  >();

  sorted.forEach((e, i) => {
    if (!e.end) return;
    const endIdx =
      e.end === "present" ? Number.POSITIVE_INFINITY : monthIdx(e.end);
    const list = byLane.get(e.lane) ?? [];
    list.push({
      startIdx: monthIdx(e.start),
      endIdx,
      row: rowOf(i),
      key: `${e.title}-${e.start}`,
    });
    byLane.set(e.lane, list);
  });

  for (const [lane, items] of byLane) {
    // Greedy slot assignment (oldest first) so concurrent periods in the
    // same lane sit side by side instead of on top of each other.
    const slotEnds: number[] = [];
    for (const it of [...items].sort((a, b) => a.startIdx - b.startIdx)) {
      let slot = slotEnds.findIndex((end) => end <= it.startIdx);
      if (slot === -1) {
        slot = slotEnds.length;
        slotEnds.push(it.endIdx);
      } else {
        slotEnds[slot] = it.endIdx;
      }

      // Bar runs from the row where the period ends down to this entry's dot.
      let rowStart =
        it.endIdx === Number.POSITIVE_INFINITY
          ? NOW_ROW
          : rowOf(sorted.findIndex((s) => monthIdx(s.start) <= it.endIdx));
      let rowEnd = it.row;
      if (rowStart >= rowEnd) {
        // Period fits inside its own row — draw a stub through the row.
        rowStart = it.row;
        rowEnd = it.row + 1;
      }
      bars.push({
        lane,
        rowStart,
        rowEnd,
        slot: slot > 0 ? 1 : 0,
        key: it.key,
      });
    }
  }
  return bars;
}

const bars = computeBars();

export function CareerTimeline() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 0.75", "end 0.75"],
  });

  const reveal = reduce
    ? {}
    : ({
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45 },
      } as const);

  const stretch = reduce
    ? {}
    : ({
        initial: { scaleY: 0 },
        whileInView: { scaleY: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.6 },
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

      <div
        ref={gridRef}
        className="relative grid gap-y-10"
        style={{
          gridTemplateColumns: "10px 10px 14px 20px minmax(0, 1fr)",
          columnGap: "6px",
        }}
      >
        {/* Static spine */}
        <div
          className="w-px justify-self-center bg-border"
          style={{ gridColumn: SPINE_COL, gridRow: `1 / ${LAST_ROW}` }}
        />
        {/* Scroll-drawn spine — the one signature effect */}
        <motion.div
          className="w-[2px] origin-top justify-self-center bg-primary"
          style={{
            gridColumn: SPINE_COL,
            gridRow: `1 / ${LAST_ROW}`,
            scaleY: reduce ? 1 : scrollYProgress,
          }}
        />

        {/* Duration bars */}
        {bars.map((b) => (
          <motion.div
            key={b.key}
            className={cn(
              "w-[4px] origin-bottom rounded-full",
              LANES[b.lane].bar,
              b.slot === 0 ? "justify-self-start" : "justify-self-end"
            )}
            style={{
              gridColumn: LANES[b.lane].railCol,
              gridRow: `${b.rowStart} / ${b.rowEnd}`,
            }}
            {...stretch}
          />
        ))}

        {/* Now */}
        <div
          className="z-10 mt-1 size-3 justify-self-center rounded-full bg-primary ring-4 ring-background"
          style={{ gridColumn: SPINE_COL, gridRow: NOW_ROW }}
        />
        <motion.div
          className="min-w-0"
          style={{ gridColumn: CONTENT_COL, gridRow: NOW_ROW }}
          {...reveal}
        >
          <p className="text-sm font-medium">Now</p>
          <p className="text-xs text-muted-foreground">
            Gili Islands, Indonesia
          </p>
        </motion.div>

        {/* Entries */}
        {sorted.map((e, i) => {
          const row = rowOf(i);
          const lane = LANES[e.lane];
          return (
            <Fragment key={`${e.title}-${e.start}`}>
              <div
                className={cn(
                  "z-10 mt-1 size-3 justify-self-center rounded-full ring-4 ring-background",
                  lane.dot
                )}
                style={{ gridColumn: SPINE_COL, gridRow: row }}
              />
              <motion.div
                className="min-w-0"
                style={{ gridColumn: CONTENT_COL, gridRow: row }}
                {...reveal}
              >
                <div className="flex flex-wrap items-baseline gap-x-2">
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
                <p className="text-xs text-muted-foreground">
                  {e.detail ? `${e.detail} · ` : ""}
                  {e.period}
                </p>
                {e.blurb && (
                  <p className="mt-1 max-w-prose text-sm text-muted-foreground">
                    {e.blurb}
                  </p>
                )}
              </motion.div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
