import { describe, expect, it } from "vitest";
import { computeChange, reportSchema } from "./schema";
import { REQUIRED_TOPICS } from "./requirements";
import { validatePublication } from "./publishing";
import { REPORT_META } from "./schema";

const base = {
  type: "opening-bell",
  date: "2026-11-09",
  asOf: "2026-11-09T09:45:00+05:30",
  generatedAt: "2026-11-09T09:46:00+05:30",
  conclusion: "Test conclusion.",
  session: { status: "open", note: "Calendar checked", calendarSourceId: "s1", checkedAt: "2026-11-09T09:44:00+05:30" },
  sections: REQUIRED_TOPICS["opening-bell"].map((topic) => ({ topic, kind: "fact", status: "unavailable", title: topic, body: "Not verifiable in this test", asOf: "2026-11-09T09:44:00+05:30", sourceIds: ["s1"] })),
  scenarios: ["3M", "6M", "12M"].map((horizon) => ({ horizon, subject: "Market", status: "unavailable", confidence: "unavailable", outlook: "Unavailable", alternative: "Unavailable", confirmation: "Unavailable", invalidation: "Unavailable", sourceIds: ["s1"] })),
  sources: [{ id: "s1", name: "Exchange", url: "https://www.nseindia.com", accessedAt: "2026-11-09T09:44:00+05:30" }],
};
const metric = { label: "Index", scope: "india-session", baseline: 100, baselineAt: "2026-11-06T15:30:00+05:30", latest: 101, status: "confirmed", sourceId: "s1", capturedAt: "2026-11-09T09:44:00+05:30" };

describe("report schema", () => {
  it("accepts a valid report", () => expect(reportSchema.safeParse({ ...base, metrics: [metric] }).success).toBe(true));
  it("rejects a report with no sources", () => expect(reportSchema.safeParse({ ...base, sources: [] }).success).toBe(false));
  it("rejects a metric citing an unknown source", () =>
    expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, sourceId: "nope" }] }).success).toBe(false));
  it("rejects a metric without a timestamp", () => {
    const { capturedAt: _c, ...noTs } = metric;
    expect(reportSchema.safeParse({ ...base, metrics: [noTs] }).success).toBe(false);
  });
  it("rejects timestamps without a timezone offset", () =>
    expect(reportSchema.safeParse({ ...base, asOf: "2026-11-09T09:45:00" }).success).toBe(false));
  it("rejects an unknown report type", () => expect(reportSchema.safeParse({ ...base, type: "weekly" }).success).toBe(false));
  it("accepts an unavailable value with no number", () =>
    expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, latest: null, status: "unavailable", note: "Source unavailable" }] }).success).toBe(true));
  it("rejects a missing value that is not marked unavailable", () =>
    expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, latest: null }] }).success).toBe(false));
});

describe("desk requirements", () => {
  it("Opening Brief runs at 9:45 AM IST", () => expect(REPORT_META["opening-brief"].schedule).toBe("9:45 AM IST"));
  it("Opening Brief has its branded title", () => expect(REPORT_META["opening-brief"].title).toBe("The Opening Brief — India Market Opening & Global Signals"));
  it("Market Review has its branded title", () => expect(REPORT_META["market-review"].title).toBe("The Market Review — India Equities, Macro & Cross-Asset Intelligence"));
  it("legacy types are no longer scheduled", () => {
    for (const t of ["opening-bell", "daily-study", "risk-monitor"] as const) expect(REPORT_META[t].schedule).toBeNull();
  });
  it("legacy report files still validate", () => expect(reportSchema.safeParse(base).success).toBe(true));
  it("legacy types cannot be newly published", () => expect(() => validatePublication(base)).toThrow(/legacy/));
  it("Opening Brief can be newly published", () =>
    expect(validatePublication({ ...base, type: "opening-brief" }).type).toBe("opening-brief"));
  it("Market Review requires cross-asset coverage", () => {
    const sections = REQUIRED_TOPICS["market-review"].filter((t) => t !== "credit-spreads").map((topic) => ({ ...base.sections[0], topic, title: topic }));
    expect(reportSchema.safeParse({ ...base, type: "market-review", sections }).success).toBe(false);
  });
  it("Market Review with full coverage publishes", () => {
    const sections = REQUIRED_TOPICS["market-review"].map((topic) => ({ ...base.sections[0], topic, title: topic }));
    expect(validatePublication({ ...base, type: "market-review", sections }).type).toBe("market-review");
  });
  it("Mid-Market has no fixed automation", () => expect(REPORT_META["mid-market-review"].schedule).toBeNull());
  it("rejects missing baseline timestamps", () => expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, baselineAt: null }] }).success).toBe(false));
  it("rejects missing source links", () => expect(reportSchema.safeParse({ ...base, sources: [{ ...base.sources[0], url: undefined }] }).success).toBe(false));
  it("requires stale observation explanations", () => expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, status: "stale" }] }).success).toBe(false));
  it("accepts explicitly explained stale observations", () => expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, status: "stale", note: "Last verified session" }] }).success).toBe(true));
  it("rejects fabricated values labelled unavailable", () => expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, status: "unavailable", note: "Unavailable" }] }).success).toBe(false));
  it("requires calendar evidence", () => expect(reportSchema.safeParse({ ...base, session: { ...base.session, calendarSourceId: "missing" } }).success).toBe(false));
  it("rejects a weekend marked open", () => expect(reportSchema.safeParse({ ...base, date: "2026-11-08", asOf: "2026-11-08T09:45:00+05:30" }).success).toBe(false));
  it("accepts a sourced holiday note without Indian prices", () => expect(reportSchema.safeParse({ ...base, session: { ...base.session, status: "closed", note: "Holiday per calendar" }, sections: [], scenarios: [] }).success).toBe(true));
  it("rejects Indian session prices on no-session days", () => expect(reportSchema.safeParse({ ...base, session: { ...base.session, status: "closed" }, metrics: [metric] }).success).toBe(false));
  for (const [type, topics] of Object.entries(REQUIRED_TOPICS)) {
    it(`${type} requires every coverage topic`, () => {
      const sections = topics.map((topic) => ({ ...base.sections[0], topic }));
      expect(reportSchema.safeParse({ ...base, type, sections }).success).toBe(true);
      for (const topic of topics) expect(reportSchema.safeParse({ ...base, type, sections: sections.filter((s) => s.topic !== topic) }).success).toBe(false);
    });
  }
  for (const horizon of ["3M", "6M", "12M"]) it(`requires ${horizon} scenarios`, () => expect(reportSchema.safeParse({ ...base, scenarios: base.scenarios.filter((s) => s.horizon !== horizon) }).success).toBe(false));
  it("Risk Monitor excludes company attribution", () => expect(reportSchema.safeParse({ ...base, type: "risk-monitor", sections: [...REQUIRED_TOPICS["risk-monitor"].map((topic) => ({ ...base.sections[0], topic })), { ...base.sections[0], topic: "attribution" }] }).success).toBe(false));
});

describe("safe publication", () => {
  it("refuses silent overwrites", () => expect(() => validatePublication(base, base)).toThrow("append one revision"));
  it("accepts explicit advancing corrections", () => expect(validatePublication({ ...base, generatedAt: "2026-11-09T10:00:00+05:30", revisions: [{ at: "2026-11-09T10:00:00+05:30", note: "Corrected source" }] }, base).revisions).toHaveLength(1));
  it("preserves prior revision entries", () => {
    const previous = { ...base, revisions: [{ at: "2026-11-09T09:46:00+05:30", note: "First correction" }] };
    expect(() => validatePublication({ ...base, generatedAt: "2026-11-09T10:00:00+05:30", revisions: [{ at: "2026-11-09T09:46:00+05:30", note: "Changed history" }, { at: "2026-11-09T10:00:00+05:30", note: "Second correction" }] }, previous)).toThrow("preserve revision history");
  });
});

describe("computeChange", () => {
  it("computes points and percent", () => {
    const c = computeChange({ baseline: 24000, latest: 24240 });
    expect(c.pts).toBe(240);
    expect(c.pct).toBeCloseTo(1, 10);
  });
  it("computes bps for percent-unit values like yields", () => {
    const c = computeChange({ baseline: 6.5, latest: 6.55, unit: "%" });
    expect(c.bps).toBeCloseTo(5, 10);
  });
  it("returns nulls when data is unavailable", () =>
    expect(computeChange({ baseline: 100, latest: null })).toEqual({ pts: null, pct: null, bps: null }));
});
