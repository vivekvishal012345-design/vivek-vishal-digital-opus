import { createFileRoute } from "@tanstack/react-router";
import { formatDate, reportsByDate } from "@/lib/markets/reports";
import { ReportListItem } from "@/components/markets/Report";
import { marketsHead } from "@/lib/markets/head";

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
  const groups = reportsByDate();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Archive</h1>
      <p className="mt-3 text-muted-foreground">All published reports, newest first. Times in IST.</p>
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
