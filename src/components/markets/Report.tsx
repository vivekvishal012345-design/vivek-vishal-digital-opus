import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { computeChange, REPORT_META, type Metric, type Report, type ReportType } from "@/lib/markets/schema";
import { formatDate, formatIST } from "@/lib/markets/reports";

const nf = (n: number, d = 2) => n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const signed = (n: number, d = 2, suffix = "") => `${n > 0 ? "+" : n < 0 ? "−" : ""}${nf(Math.abs(n), d)}${suffix}`;

export function StatusBadge({ status }: { status: Metric["status"] | "provisional-report" }) {
  if (status === "confirmed") return null;
  const label = status === "provisional-report" ? "Provisional" : status[0].toUpperCase() + status.slice(1);
  return (
    <span className="inline-flex items-center rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
      {label}
    </span>
  );
}

function Dir({ value, children }: { value: number | null; children: React.ReactNode }) {
  const cls = value === null || value === 0 ? "text-muted-foreground" : value > 0 ? "text-market-up" : "text-market-down";
  return <span className={cls}>{children}</span>;
}

export function MetricsTable({ report }: { report: Report }) {
  if (!report.metrics.length) return null;
  const src = new Map(report.sources.map((s, i) => [s.id, i + 1]));
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="tabular w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Measure</th>
            <th className="py-2 pr-4 text-right font-medium">Baseline</th>
            <th className="py-2 pr-4 text-right font-medium">Latest</th>
            <th className="py-2 pr-4 text-right font-medium">Change</th>
            <th className="py-2 text-right font-medium">%  / bps</th>
          </tr>
        </thead>
        <tbody>
          {report.metrics.map((m) => {
            const c = computeChange(m);
            const u = m.unit && m.unit !== "%" ? ` ${m.unit}` : m.unit === "%" ? "%" : "";
            return (
              <tr key={m.label} className="border-b border-border/60 align-top">
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap items-center gap-2 text-foreground">
                    {m.label}
                    <StatusBadge status={m.status} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {m.baselineLabel && <>Baseline: {m.baselineLabel} · </>}
                    <a href={`#src-${src.get(m.sourceId)}`} className="underline-offset-2 hover:underline">
                      [{src.get(m.sourceId)}]
                    </a>{" "}
                    {formatIST(m.capturedAt, false)}
                    {m.note && <> · {m.note}</>}
                  </div>
                </td>
                <td className="py-3 pr-4 text-right text-muted-foreground">{m.baseline === null ? "—" : nf(m.baseline) + u}</td>
                <td className="py-3 pr-4 text-right">{m.latest === null ? <span className="text-muted-foreground">Unavailable</span> : nf(m.latest) + u}</td>
                <td className="py-3 pr-4 text-right">{c.pts === null ? "—" : <Dir value={c.pts}>{signed(c.pts)}</Dir>}</td>
                <td className="py-3 text-right">
                  {c.bps !== null ? (
                    <Dir value={c.bps}>{signed(c.bps, 1, " bps")}</Dir>
                  ) : c.pct !== null ? (
                    <Dir value={c.pct}>{signed(c.pct, 2, "%")}</Dir>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const KIND_LABEL = { fact: "Fact", estimate: "Estimate", interpretation: "Interpretation" } as const;

export function ReportView({ report }: { report: Report }) {
  const meta = REPORT_META[report.type];
  const src = new Map(report.sources.map((s, i) => [s.id, i + 1]));
  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-border pb-6">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--royal)]">{meta.title}</div>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">{report.title ?? formatDate(report.date)}</h2>
        <dl className="tabular mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <div><dt className="inline">Data as of </dt><dd className="inline text-foreground/85">{formatIST(report.asOf)}</dd></div>
          <div><dt className="inline">Generated </dt><dd className="inline">{formatIST(report.generatedAt)}</dd></div>
          {report.provisional && <StatusBadge status="provisional-report" />}
        </dl>
      </header>

      <section className="py-8">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Conclusion</h3>
        <p className="whitespace-pre-line text-lg leading-relaxed text-foreground sm:text-xl">{report.conclusion}</p>
      </section>

      {report.metrics.length > 0 && (
        <section className="pb-8">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Key levels</h3>
          <MetricsTable report={report} />
        </section>
      )}

      {report.sections.length > 0 && (
        <section className="border-t border-border">
          {report.sections.map((s, i) => (
            <details key={i} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4">
                <span className="flex flex-wrap items-center gap-3">
                  <span className="w-28 shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{KIND_LABEL[s.kind]}</span>
                  <span className="text-foreground">{s.title}</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-5 sm:pl-[7.75rem]">
                <p className="whitespace-pre-line leading-relaxed text-foreground/85">{s.body}</p>
                {s.sourceIds?.length ? (
                  <p className="mt-2 text-xs text-muted-foreground">Sources: {s.sourceIds.map((id) => `[${src.get(id)}]`).join(" ")}</p>
                ) : null}
              </div>
            </details>
          ))}
        </section>
      )}

      <section className="pt-8">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Sources</h3>
        <ol className="space-y-1.5 text-sm text-muted-foreground">
          {report.sources.map((s, i) => (
            <li key={s.id} id={`src-${i + 1}`} className="tabular">
              [{i + 1}]{" "}
              {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-foreground/85 underline-offset-2 hover:underline">{s.name}</a> : <span className="text-foreground/85">{s.name}</span>}
              {" "}· accessed {formatIST(s.accessedAt)}
            </li>
          ))}
        </ol>
        {report.revisions.length > 0 && (
          <div className="mt-6 text-xs text-muted-foreground">
            {report.revisions.map((r, i) => <p key={i}>Revised {formatIST(r.at)}: {r.note}</p>)}
          </div>
        )}
        <p className="mt-8 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          Prepared with AI assistance from the cited sources. Figures may be delayed or revised; verify before relying on them. Not investment advice.
        </p>
      </section>
    </article>
  );
}

export function EmptyReport({ type }: { type: ReportType }) {
  const meta = REPORT_META[type];
  return (
    <div className="mx-auto max-w-3xl border-y border-border py-12 text-center">
      <p className="text-foreground">No {meta.title} published yet.</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {meta.schedule ? `Scheduled for ${meta.schedule} on trading days.` : "Published on an intraday basis when warranted."}
      </p>
    </div>
  );
}

export function ReportListItem({ report }: { report: Report }) {
  return (
    <Link
      to="/markets/archive/$date/$type"
      params={{ date: report.date, type: report.type }}
      className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-[color:var(--royal)]"
    >
      <span>{REPORT_META[report.type].title}</span>
      <span className="tabular shrink-0 text-xs text-muted-foreground">{formatIST(report.asOf, false)}</span>
    </Link>
  );
}
