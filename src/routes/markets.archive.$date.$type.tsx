import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findReport, formatDate } from "@/lib/markets/reports";
import { REPORT_META } from "@/lib/markets/schema";
import { ReportView } from "@/components/markets/Report";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/archive/$date/$type")({
  loader: ({ params }) => {
    const report = findReport(params.date, params.type);
    if (!report) throw notFound();
    return { date: report.date, type: report.type };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Report unavailable — Vivek Vishal" }, { name: "robots", content: "noindex" }] };
    const title = `${REPORT_META[loaderData.type].title}, ${formatDate(loaderData.date)} — Vivek Vishal`;
    return marketsHead(`/markets/archive/${params.date}/${params.type}`, title, `${REPORT_META[loaderData.type].title} for ${formatDate(loaderData.date)}. Timestamped and sourced.`);
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-12 text-center text-muted-foreground">
      This report does not exist. <Link to="/markets/archive" className="text-foreground underline">Back to the archive</Link>
    </div>
  ),
  component: ArchivedReport,
});

function ArchivedReport() {
  const { date, type } = Route.useLoaderData();
  const report = findReport(date, type)!;
  return <ReportView report={report} />;
}
