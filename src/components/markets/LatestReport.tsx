import { Link } from "@tanstack/react-router";
import type { ReportType } from "@/lib/markets/schema";
import { latestByType } from "@/lib/markets/reports";
import { EmptyReport, ReportView } from "./Report";

export function LatestReport({ type }: { type: ReportType }) {
  const report = latestByType(type);
  if (!report) return <EmptyReport type={type} />;
  return (
    <>
      <ReportView report={report} />
      <div className="mx-auto mt-10 max-w-3xl text-sm">
        <Link to="/markets/archive" className="text-muted-foreground hover:text-foreground">
          Earlier reports in the archive →
        </Link>
      </div>
    </>
  );
}
