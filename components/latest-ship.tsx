"use client";

import { useEffect, useState } from "react";
import { GitCommitHorizontal } from "lucide-react";
import type { ShipItem } from "@/app/api/latest-ship/route";

// Hand-edit this if the GitHub API is ever unavailable or empty — keeps the
// strip populated with something true rather than hiding it entirely.
const FALLBACK_ITEMS: ShipItem[] = [
  { repo: "myetal", message: "Ship faster with AI agent workflows", date: "" },
];

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
  return `${diffMonths}mo ago`;
}

export function LatestShip() {
  const [items, setItems] = useState<ShipItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      try {
        const res = await fetch("/api/latest-ship");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!cancelled) {
          setItems(data.items?.length ? data.items : FALLBACK_ITEMS);
        }
      } catch {
        if (!cancelled) setItems(FALLBACK_ITEMS);
      }
    }

    fetchItems();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
      {items.map((item, i) => (
        <span key={`${item.repo}-${i}`} className="flex items-center gap-1.5">
          <GitCommitHorizontal className="size-3.5 text-primary shrink-0" />
          <span className="font-medium text-foreground">{item.repo}</span>
          <span className="max-w-48 truncate">{item.message}</span>
          {item.date && <span className="text-muted-foreground/70">· {relativeDate(item.date)}</span>}
        </span>
      ))}
    </div>
  );
}
