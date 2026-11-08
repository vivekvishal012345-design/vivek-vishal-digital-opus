import { createFileRoute } from "@tanstack/react-router";
import { formatDate, reportsByDate } from "@/lib/markets/reports";
import { ReportListItem } from "@/components/markets/Report";
import { marketsHead } from "@/lib/markets/head";
import { useState } from "react";
import { REPORT_META, REPORT_TYPES } from "@/lib/markets/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/markets/archive/")({
  head: () =>
    marketsHead(
      "/markets/archive",
      "Markets Archive — Vivek Vishal",
      "Every published Opening Bell, Mid-Market Review, Daily Market Study and Risk Monitor, by date.",
    ),
  component: ArchivePage,
});

function ArchivePage() {
  const [filter, setFilter] = useState("all");
  const groups = reportsByDate().map((g) => ({ ...g, items: g.items.filter((r) => filter === "all" || r.type === filter) })).filter((g) => g.items.length);
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Archive</h1>
      <p className="mt-3 text-muted-foreground">All published reports, newest first. Times in IST.</p>
      <div className="mt-6 max-w-xs">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger aria-label="Filter reports"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All reports</SelectItem>{REPORT_TYPES.map((t) => <SelectItem key={t} value={t}>{REPORT_META[t].title}</SelectItem>)}</SelectContent>
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
