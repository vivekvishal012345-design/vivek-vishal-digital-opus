import { reportSchema, REPORT_TYPES, type Report, type ReportType } from "./schema";

const files = import.meta.glob("/content/markets/*/*.json", { eager: true, import: "default" });

function load(): Report[] {
  const out: Report[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const parsed = reportSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(`Invalid market report ${path}:\n${parsed.error.issues.map((i) => ` - ${i.path.join(".")}: ${i.message}`).join("\n")}`);
    }
    const [, , , date, file] = path.split("/");
    if (parsed.data.date !== date || `${parsed.data.type}.json` !== file) {
      throw new Error(`Market report ${path}: date/type inside the file must match its location`);
    }
    out.push(parsed.data);
  }
  return out.sort((a, b) => (a.asOf < b.asOf ? 1 : -1));
}

export const reports: Report[] = load();

export const latestByType = (type: ReportType) => reports.find((r) => r.type === type) ?? null;
export const findReport = (date: string, type: string) =>
  reports.find((r) => r.date === date && r.type === type) ?? null;
export const isReportType = (t: string): t is ReportType => (REPORT_TYPES as readonly string[]).includes(t);

export function reportsByDate(): { date: string; items: Report[] }[] {
  const map = new Map<string, Report[]>();
  for (const r of reports) map.set(r.date, [...(map.get(r.date) ?? []), r]);
  return [...map.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, items]) => ({ date, items }));
}

export function formatIST(ts: string, withDate = true) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    ...(withDate ? { day: "numeric", month: "short", year: "numeric" } : {}),
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(ts)) + " IST";
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}
