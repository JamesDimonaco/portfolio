"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Popover } from "@base-ui/react/popover";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// UPDATE THIS WHEN YOU MOVE TO A NEW TIMEZONE
// ============================================
const CURRENT_TIMEZONE = "America/Mexico_City";

interface TimezoneData {
  jamesTime: string;
  visitorTime: string;
  jamesCity: string;
  visitorCity: string;
  hourDifference: number;
}

function formatCity(tz: string) {
  return tz.split("/").pop()!.replace(/_/g, " ");
}

function getLiveTimes(visitorTz: string) {
  const now = new Date();
  const jamesFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: CURRENT_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const visitorFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: visitorTz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return {
    jamesTime: jamesFmt.format(now),
    visitorTime: visitorFmt.format(now),
  };
}

export function TimezoneCompare({ variant = "nav" }: { variant?: "nav" | "hero" }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<TimezoneData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cachedRef = useRef(false);
  const visitorTzRef = useRef<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchComparison = useCallback(async () => {
    const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    visitorTzRef.current = visitorTz;

    if (visitorTz === CURRENT_TIMEZONE) {
      const { jamesTime } = getLiveTimes(visitorTz);
      setData({
        jamesTime,
        visitorTime: jamesTime,
        jamesCity: formatCity(CURRENT_TIMEZONE),
        visitorCity: formatCity(visitorTz),
        hourDifference: 0,
      });
      cachedRef.current = true;
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(
        `/api/timezone?from=${encodeURIComponent(CURRENT_TIMEZONE)}&to=${encodeURIComponent(visitorTz)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (!res.ok) throw new Error("Failed to fetch timezone data");

      const json = await res.json();
      const { jamesTime, visitorTime } = getLiveTimes(visitorTz);

      setData({
        jamesTime,
        visitorTime,
        jamesCity: formatCity(CURRENT_TIMEZONE),
        visitorCity: formatCity(visitorTz),
        hourDifference: json.hour_difference ?? json.hourDifference ?? 0,
      });
      cachedRef.current = true;
    } catch (e) {
      clearTimeout(timeout);
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("Request timed out");
      } else {
        setError("Failed to load timezone data");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open && !cachedRef.current) {
      fetchComparison();
    }

    if (open && cachedRef.current && visitorTzRef.current) {
      intervalRef.current = setInterval(() => {
        const { jamesTime, visitorTime } = getLiveTimes(visitorTzRef.current);
        setData((prev) =>
          prev ? { ...prev, jamesTime, visitorTime } : prev
        );
      }, 60_000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [open, fetchComparison]);

  // Start interval once data loads
  useEffect(() => {
    if (open && data && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const { jamesTime, visitorTime } = getLiveTimes(visitorTzRef.current);
        setData((prev) =>
          prev ? { ...prev, jamesTime, visitorTime } : prev
        );
      }, 60_000);
    }
  }, [open, data]);

  function getDifferenceText(hours: number) {
    if (hours === 0) return "Same timezone!";
    const abs = Math.abs(hours);
    const label = abs === 1 ? "hour" : "hours";
    return hours > 0 ? `${abs} ${label} ahead` : `${abs} ${label} behind`;
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(
          "rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted",
          variant === "nav" && "p-1.5",
          variant === "hero" && "p-2 flex items-center gap-1.5 text-xs"
        )}
        aria-label="Compare timezones"
      >
        <Clock className={cn(variant === "nav" ? "size-3.5" : "size-3.5")} />
        {variant === "hero" && <span>My time</span>}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          className="isolate z-50 outline-none"
          side="bottom"
          sideOffset={4}
          align={variant === "hero" ? "end" : "start"}
        >
          <Popover.Popup className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ring-foreground/5 bg-popover text-popover-foreground rounded-2xl p-4 shadow-2xl ring-1 duration-100 z-50 origin-(--transform-origin) outline-none w-64">
            {loading && (
              <div className="flex items-center justify-center py-3">
                <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            )}

            {error && (
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">{error}</p>
                <button
                  onClick={() => {
                    cachedRef.current = false;
                    fetchComparison();
                  }}
                  className="text-sm text-foreground underline underline-offset-2 hover:text-muted-foreground"
                >
                  Retry
                </button>
              </div>
            )}

            {data && !loading && !error && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      James ({data.jamesCity})
                    </span>
                    <span className="text-sm font-medium tabular-nums">
                      {data.jamesTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      You ({data.visitorCity})
                    </span>
                    <span className="text-sm font-medium tabular-nums">
                      {data.visitorTime}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                <p className="text-sm text-muted-foreground text-center">
                  {getDifferenceText(data.hourDifference)}
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
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
