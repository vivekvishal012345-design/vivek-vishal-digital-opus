import { z } from "zod";

export const REPORT_TYPES = [
  "opening-bell",
  "mid-market-review",
  "daily-study",
  "risk-monitor",
] as const;
export type ReportType = (typeof REPORT_TYPES)[number];

export const REPORT_META: Record<
  ReportType,
  { title: string; short: string; schedule: string | null; blurb: string }
> = {
  "opening-bell": {
    title: "Opening Bell",
    short: "Opening Bell",
    schedule: "9:45 AM IST",
    blurb: "The first read of the Indian session: overnight cues, the open, and what matters for the day.",
  },
  "mid-market-review": {
    title: "Mid-Market Review",
    short: "Mid-Market",
    schedule: null,
    blurb: "An intraday check on how the session is developing. Published when there is something worth noting.",
  },
  "daily-study": {
    title: "Daily Indian Market Study",
    short: "Daily Study",
    schedule: "6:00 PM IST",
    blurb: "The closing study: indices, breadth, sectors, flows and what changed during the day.",
  },
  "risk-monitor": {
    title: "Cross-Asset Risk Monitor",
    short: "Risk Monitor",
    schedule: "7:00 PM IST",
    blurb: "Rates, currency, commodities, volatility and global risk signals relevant to Indian markets.",
  },
};

/** ISO 8601 timestamp with an explicit offset, e.g. 2026-11-09T09:45:00+05:30 */
const timestamp = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, "timestamp must be ISO 8601 with offset");

export const metricStatus = z.enum(["confirmed", "provisional", "estimate", "unavailable"]);

export const metricSchema = z
  .object({
    label: z.string().min(1),
    unit: z.string().optional(),
    baseline: z.number().nullable(),
    baselineLabel: z.string().optional(),
    latest: z.number().nullable(),
    /** Optional overrides; otherwise derived from baseline/latest. */
    changeBps: z.number().nullable().optional(),
    status: metricStatus,
    sourceId: z.string().min(1),
    capturedAt: timestamp,
    note: z.string().optional(),
  })
  .superRefine((m, ctx) => {
    if (m.status !== "unavailable" && m.latest === null) {
      ctx.addIssue({ code: "custom", message: `"${m.label}": latest is null but status is ${m.status}; use "unavailable"` });
    }
  });

export const sectionSchema = z.object({
  kind: z.enum(["fact", "estimate", "interpretation"]),
  title: z.string().min(1),
  body: z.string().min(1),
  sourceIds: z.array(z.string()).optional(),
});

export const sourceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  url: z.string().url().optional(),
  accessedAt: timestamp,
});

export const reportSchema = z
  .object({
    type: z.enum(REPORT_TYPES),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    title: z.string().optional(),
    asOf: timestamp,
    generatedAt: timestamp,
    provisional: z.boolean().default(false),
    conclusion: z.string().min(1),
    metrics: z.array(metricSchema).default([]),
    sections: z.array(sectionSchema).default([]),
    sources: z.array(sourceSchema).min(1, "at least one source is required"),
    revisions: z.array(z.object({ at: timestamp, note: z.string().min(1) })).default([]),
  })
  .superRefine((r, ctx) => {
    const ids = new Set(r.sources.map((s) => s.id));
    r.metrics.forEach((m) => {
      if (!ids.has(m.sourceId)) ctx.addIssue({ code: "custom", message: `metric "${m.label}" cites unknown source "${m.sourceId}"` });
    });
    r.sections.forEach((s) =>
      s.sourceIds?.forEach((id) => {
        if (!ids.has(id)) ctx.addIssue({ code: "custom", message: `section "${s.title}" cites unknown source "${id}"` });
      }),
    );
  });

export type Report = z.infer<typeof reportSchema>;
export type Metric = z.infer<typeof metricSchema>;

export interface Change {
  pts: number | null;
  pct: number | null;
  bps: number | null;
}

/** Point, percent and basis-point change. bps = percent change × 100 unless an explicit bps value is provided (e.g. for yields). */
export function computeChange(m: Pick<Metric, "baseline" | "latest" | "changeBps" | "unit">): Change {
  if (m.baseline === null || m.latest === null) return { pts: null, pct: null, bps: m.changeBps ?? null };
  const pts = m.latest - m.baseline;
  const pct = m.baseline === 0 ? null : (pts / Math.abs(m.baseline)) * 100;
  let bps: number | null = m.changeBps ?? null;
  if (bps === null && m.unit === "%") bps = pts * 100;
  return { pts, pct, bps };
}
