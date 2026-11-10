import { createFileRoute } from "@tanstack/react-router";
import { formatDate, reportsByDate } from "@/lib/markets/reports";
import { ReportListItem } from "@/components/markets/Report";
import { marketsHead } from "@/lib/markets/head";
import { useState } from "react";
import { ACTIVE_PUBLISHABLE_TYPES, LEGACY_READABLE_TYPES, REPORT_META } from "@/lib/markets/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/markets/archive/")({
  head: () =>
    marketsHead(
      "/markets/archive",
      "Markets Archive — Vivek Vishal",
      "Every published Opening Brief and Market Review, by date.",
    ),
  component: ArchivePage,
});

function ArchivePage() {
  const [filter, setFilter] = useState("all");
  // Legacy formats appear in the filter only when historical reports of that type exist.
  const all = reportsByDate();
  const present = new Set(all.flatMap((g) => g.items.map((r) => r.type)));
  const filterTypes = [...ACTIVE_PUBLISHABLE_TYPES, ...LEGACY_READABLE_TYPES.filter((t) => present.has(t))];
  const groups = all.map((g) => ({ ...g, items: g.items.filter((r) => filter === "all" || r.type === filter) })).filter((g) => g.items.length);
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Archive</h1>
      <p className="mt-3 text-muted-foreground">All published reports, newest first. Times in IST.</p>
      <div className="mt-6 max-w-xs">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger aria-label="Filter reports"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All reports</SelectItem>{filterTypes.map((t) => <SelectItem key={t} value={t}>{REPORT_META[t].title}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {groups.length === 0 ? (
        <p className="mt-10 border-y border-border py-12 text-center text-muted-foreground">No reports published yet.</p>
      ) : (
        <div className="mt-10 border-t border-border">
          {groups.map((g) => (
            <section key={g.date} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h2 className="tabular pt-3 font-sans text-sm text-muted-foreground">{formatDate(g.date)}</h2>
              <div className="divide-y divide-border/60">
                {g.items.map((r) => <ReportListItem key={r.type} report={r} />)}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
