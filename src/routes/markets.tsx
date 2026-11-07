import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";

export const Route = createFileRoute("/markets")({
  component: MarketsLayout,
});

const tabs = [
  { to: "/markets", label: "Overview" },
  { to: "/markets/opening-bell", label: "Opening Bell" },
  { to: "/markets/mid-market-review", label: "Mid-Market" },
  { to: "/markets/daily-study", label: "Daily Study" },
  { to: "/markets/risk-monitor", label: "Risk Monitor" },
  { to: "/markets/archive", label: "Archive" },
] as const;

function MarketsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname.replace(/\/$/, "") || "/" });
  const active = (to: string) => (to === "/markets" ? pathname === to : pathname === to || pathname.startsWith(to + "/"));
  return (
    <SiteChrome>
      <div className="pt-24 sm:pt-28">
        <div className="container-x">
          <nav aria-label="Markets sections" className="-mx-4 overflow-x-auto border-b border-border px-4 sm:mx-0 sm:px-0">
            <ul className="flex min-w-max gap-1">
              {tabs.map((t) => (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    aria-current={active(t.to) ? "page" : undefined}
                    className={`-mb-px inline-block border-b-2 px-3 py-3 text-sm transition-colors ${
                      active(t.to)
                        ? "border-[color:var(--royal)] text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="container-x pb-24 pt-10 sm:pt-14">
          <Outlet />
        </div>
      </div>
    </SiteChrome>
  );
}
