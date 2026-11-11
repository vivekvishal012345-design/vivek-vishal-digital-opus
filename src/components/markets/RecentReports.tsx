import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatDate, reportsByDate } from "@/lib/markets/reports";
import { recentGroups } from "@/lib/markets/recent";
import { ReportListItem } from "./Report";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RecentReports() {
  const groups = recentGroups(reportsByDate());
  const [day, setDay] = useState("all");
  const shown = day === "all" ? groups : groups.filter((g) => g.date === day);
  return (
    <section className="mt-16 rounded-lg border border-border bg-muted/15 p-5 sm:p-7" aria-labelledby="recent-reports">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Archive · last 7 days</div>
          <h2 id="recent-reports" className="font-display text-2xl font-medium">Recent reports</h2>
          <p className="mt-1 text-sm text-muted-foreground">The latest seven days of publication, by report date.</p>
        </div>
        {groups.length > 0 && (
          <div className="w-full sm:w-56">
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger aria-label="Filter recent reports by date"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All recent</SelectItem>
                {groups.map((g) => <SelectItem key={g.date} value={g.date}>{formatDate(g.date)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {shown.length === 0 ? (
        <p className="mt-6 border-y border-border py-8 text-center text-sm text-muted-foreground">No reports published yet.</p>
      ) : (
        <div className="mt-6 space-y-5">
          {shown.map((g) => (
            <div key={g.date} className="grid gap-1 border-t border-border pt-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="tabular pt-3 font-sans text-xs font-medium uppercase tracking-[0.14em] text-foreground/75">{formatDate(g.date)}</h3>
              <div className="divide-y divide-border/60">{g.items.map((r) => <ReportListItem key={r.type} report={r} />)}</div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-6 border-t border-border pt-4 text-sm">
        <Link to="/markets/archive" className="text-muted-foreground hover:text-foreground">Full archive →</Link>
      </p>
    </section>
  );
}
