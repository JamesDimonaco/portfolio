"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Popover } from "@base-ui/react/popover";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// UPDATE THIS WHEN YOU MOVE TO A NEW TIMEZONE
// ============================================
const CURRENT_TIMEZONE = "Asia/Bangkok";

interface Details {
  fromCity: string;
  fromCountry: string;
  fromFlag: string;
  fromDate: string;
  toCity: string;
  toCountry: string;
  toFlag: string;
  toDate: string;
  direction: string;
}

function formatCity(tz: string) {
  return tz.split("/").pop()!.replace(/_/g, " ");
}

// Offset (hours from UTC) for a timezone at a specific instant.
// Handles fractional offsets (e.g. India +5:30).
function getOffsetHours(timeZone: string, at: Date) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(at).reduce<Record<string, string>>((acc, p) => {
    if (p.type !== "literal") acc[p.type] = p.value;
    return acc;
  }, {});
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return (asUTC - at.getTime()) / 3_600_000;
}

function formatTime(tz: string, at: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(at);
}

function formatDate(tz: string, at: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(at);
}

function formatHours(abs: number) {
  return Number.isInteger(abs) ? `${abs}h` : `${abs.toFixed(1)}h`;
}

export function TimezoneCompare({ variant = "nav" }: { variant?: "nav" | "hero" }) {
  const [open, setOpen] = useState(false);
  const [visitorTz, setVisitorTz] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [details, setDetails] = useState<Details | null>(null);
  const detailsFetchedRef = useRef(false);

  useEffect(() => {
    setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const sameTz = visitorTz === CURRENT_TIMEZONE;

  // Positive => James is ahead of visitor. Negative => behind.
  const rawDiff = visitorTz
    ? getOffsetHours(CURRENT_TIMEZONE, now) - getOffsetHours(visitorTz, now)
    : null;
  const hourDiff = rawDiff === null ? null : Math.round(rawDiff * 10) / 10;

  const fetchDetails = useCallback(async () => {
    if (!visitorTz || sameTz || detailsFetchedRef.current) return;
    detailsFetchedRef.current = true;
    try {
      const res = await fetch(
        `/api/timezone?from=${encodeURIComponent(CURRENT_TIMEZONE)}&to=${encodeURIComponent(visitorTz)}`,
      );
      if (!res.ok) return;
      const json = await res.json();
      const d = json.data ?? json;
      setDetails({
        fromCity: d.from?.city ?? formatCity(CURRENT_TIMEZONE),
        fromCountry: d.from?.country ?? "",
        fromFlag: d.from?.flag ?? "",
        fromDate: d.from?.currentDate ?? "",
        toCity: d.to?.city ?? formatCity(visitorTz),
        toCountry: d.to?.country ?? "",
        toFlag: d.to?.flag ?? "",
        toDate: d.to?.currentDate ?? "",
        direction: d.difference?.description ?? "",
      });
    } catch {
      // Basics still render — enrichment just stays empty.
    }
  }, [visitorTz, sameTz]);

  useEffect(() => {
    if (open) fetchDetails();
  }, [open, fetchDetails]);

  function compactLabel() {
    if (hourDiff === null) return null;
    if (hourDiff === 0) return "same time";
    const f = formatHours(Math.abs(hourDiff));
    return hourDiff > 0 ? `${f} ahead` : `${f} behind`;
  }

  function fullLabel() {
    if (hourDiff === null) return "My time";
    if (hourDiff === 0) return "We're in the same timezone";
    const f = formatHours(Math.abs(hourDiff));
    return hourDiff > 0 ? `I'm ${f} ahead of you` : `I'm ${f} behind you`;
  }

  const jamesCity = details?.fromCity ?? formatCity(CURRENT_TIMEZONE);
  const visitorCity = visitorTz ? (details?.toCity ?? formatCity(visitorTz)) : "";
  const jamesDate = details?.fromDate || formatDate(CURRENT_TIMEZONE, now);
  const visitorDate = visitorTz ? (details?.toDate || formatDate(visitorTz, now)) : "";
  const jamesTime = formatTime(CURRENT_TIMEZONE, now);
  const visitorTime = visitorTz ? formatTime(visitorTz, now) : "";

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(
          "rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted",
          variant === "nav" && "px-2 py-1 flex items-center gap-1.5 text-xs tabular-nums",
          variant === "hero" && "px-2 py-1.5 flex items-center gap-1.5 text-xs tabular-nums",
        )}
        aria-label={`Compare timezones — ${fullLabel()}`}
      >
        <Clock className="size-3.5" />
        {variant === "nav" && <span>{compactLabel() ?? "my time"}</span>}
        {variant === "hero" && (
          <span className="flex items-center gap-1">
            <span>{fullLabel()}</span>
            {hourDiff !== null && hourDiff !== 0 && (
              <span className="text-muted-foreground/60">· tap</span>
            )}
          </span>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          className="isolate z-50 outline-none"
          side="bottom"
          sideOffset={4}
          align={variant === "hero" ? "end" : "start"}
        >
          <Popover.Popup className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ring-foreground/5 bg-popover text-popover-foreground rounded-2xl p-4 shadow-2xl ring-1 duration-100 z-50 origin-(--transform-origin) outline-none w-72">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {details?.fromFlag && <span aria-hidden>{details.fromFlag}</span>}
                    <span className="text-sm font-medium truncate">
                      James &mdash; {jamesCity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {[details?.fromCountry, jamesDate].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="text-base font-semibold tabular-nums shrink-0">
                  {jamesTime}
                </span>
              </div>

              {!sameTz && visitorTz && (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {details?.toFlag && <span aria-hidden>{details.toFlag}</span>}
                      <span className="text-sm font-medium truncate">
                        You &mdash; {visitorCity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {[details?.toCountry, visitorDate].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className="text-base font-semibold tabular-nums shrink-0">
                    {visitorTime}
                  </span>
                </div>
              )}

              <div className="h-px bg-border/50" />

              <p className="text-sm text-muted-foreground text-center">
                {details?.direction || fullLabel()}
              </p>

              <div className="h-px bg-border/50" />

              <a
                href="https://timezones.live"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>🔗</span>
                <span>timezones.live</span>
              </a>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
