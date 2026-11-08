import { z } from "zod";
import { REQUIRED_TOPICS } from "./requirements";

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
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, "timestamp must be ISO 8601 with offset")
  .refine((value) => Number.isFinite(Date.parse(value)), "invalid timestamp");

export const metricStatus = z.enum(["confirmed", "provisional", "estimate", "stale", "unavailable"]);

export const metricSchema = z
  .object({
    label: z.string().min(1),
    scope: z.enum(["india-session", "global", "historical"]),
    unit: z.string().optional(),
    baseline: z.number().nullable(),
    baselineLabel: z.string().optional(),
    baselineAt: timestamp.nullable(),
    latest: z.number().nullable(),
    /** Optional overrides; otherwise derived from baseline/latest. */
    changeBps: z.number().nullable().optional(),
    status: metricStatus,
    sourceId: z.string().min(1),
    capturedAt: timestamp,
    note: z.string().optional(),
  }).strict()
  .superRefine((m, ctx) => {
    if (m.status !== "unavailable" && m.latest === null) {
      ctx.addIssue({ code: "custom", message: `"${m.label}": latest is null but status is ${m.status}; use "unavailable"` });
    }
    if (m.status === "unavailable" && m.latest !== null) ctx.addIssue({ code: "custom", message: "unavailable observation must not contain a latest number" });
    if (m.baseline !== null && m.baselineAt === null) ctx.addIssue({ code: "custom", message: "numeric baseline requires baselineAt" });
    if (["stale", "unavailable", "provisional", "estimate"].includes(m.status) && !m.note) ctx.addIssue({ code: "custom", message: "non-confirmed observation requires an explanatory note" });
  });

export const sectionSchema = z.object({
  kind: z.enum(["fact", "estimate", "interpretation"]),
  topic: z.string().min(1),
  status: metricStatus,
  asOf: timestamp,
  title: z.string().min(1),
  body: z.string().min(1),
  sourceIds: z.array(z.string().min(1)).min(1),
}).strict();

export const sourceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  url: z.string().url().refine((url) => url.startsWith("https://"), "source must use HTTPS"),
  accessedAt: timestamp,
}).strict();

export const scenarioSchema = z.object({
  horizon: z.enum(["3M", "6M", "12M"]),
  subject: z.string().min(1),
  status: z.enum(["estimate", "unavailable"]),
  outlook: z.string().min(1),
  confidence: z.enum(["low", "medium", "high", "unavailable"]),
  alternative: z.string().min(1),
  confirmation: z.string().min(1),
  invalidation: z.string().min(1),
  sourceIds: z.array(z.string().min(1)).min(1),
}).strict();

export const reportSchema = z
  .object({
    type: z.enum(REPORT_TYPES),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    title: z.string().optional(),
    asOf: timestamp,
    generatedAt: timestamp,
    provisional: z.boolean().default(false),
    session: z.object({
      status: z.enum(["open", "closed"]),
      note: z.string().min(1),
      calendarSourceId: z.string().min(1),
      checkedAt: timestamp,
    }).strict(),
    conclusion: z.string().min(1),
    metrics: z.array(metricSchema).default([]),
    sections: z.array(sectionSchema).default([]),
    sources: z.array(sourceSchema).min(1, "at least one source is required"),
    scenarios: z.array(scenarioSchema).default([]),
    revisions: z.array(z.object({ at: timestamp, note: z.string().min(1) })).default([]),
  }).strict()
  .superRefine((r, ctx) => {
    const ids = new Set(r.sources.map((s) => s.id));
    if (ids.size !== r.sources.length) ctx.addIssue({ code: "custom", message: "source IDs must be unique" });
    if (!ids.has(r.session.calendarSourceId)) ctx.addIssue({ code: "custom", message: "calendar source must be cited" });
    const day = new Date(`${r.date}T00:00:00Z`).getUTCDay();
    if ((day === 0 || day === 6) && r.session.status === "open") ctx.addIssue({ code: "custom", message: "weekend requires a no-session note" });
    if (new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(r.asOf)) !== r.date) ctx.addIssue({ code: "custom", message: "asOf IST date must match report date" });
    if (r.session.status === "open") {
      for (const topic of REQUIRED_TOPICS[r.type]) {
        if (!r.sections.some((s) => s.topic === topic)) ctx.addIssue({ code: "custom", message: `missing required coverage: ${topic}; explicitly mark unavailable when not verifiable` });
      }
      if (r.type !== "mid-market-review") for (const horizon of ["3M", "6M", "12M"] as const) {
        if (!r.scenarios.some((s) => s.horizon === horizon)) ctx.addIssue({ code: "custom", message: `missing ${horizon} conditional scenario` });
      }
    }
    if (r.type === "risk-monitor" && r.sections.some((s) => ["attribution", "company-deep-dive"].includes(s.topic))) ctx.addIssue({ code: "custom", message: "Risk Monitor must not duplicate stock attribution or company deep dive" });
    r.metrics.forEach((m) => {
      if (r.session.status === "closed" && m.scope === "india-session" && m.latest !== null) ctx.addIssue({ code: "custom", message: "no-session report cannot present Indian session prices" });
      if (!ids.has(m.sourceId)) ctx.addIssue({ code: "custom", message: `metric "${m.label}" cites unknown source "${m.sourceId}"` });
    });
    r.sections.forEach((s) =>
      s.sourceIds?.forEach((id) => {
        if (!ids.has(id)) ctx.addIssue({ code: "custom", message: `section "${s.title}" cites unknown source "${id}"` });
      }),
    );
    r.scenarios.forEach((s) => s.sourceIds.forEach((id) => {
      if (!ids.has(id)) ctx.addIssue({ code: "custom", message: `scenario cites unknown source ${id}` });
    }));
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
