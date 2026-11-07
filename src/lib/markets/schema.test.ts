import { describe, expect, it } from "vitest";
import { computeChange, reportSchema } from "./schema";

const base = {
  type: "opening-bell",
  date: "2026-11-09",
  asOf: "2026-11-09T09:45:00+05:30",
  generatedAt: "2026-11-09T09:46:00+05:30",
  conclusion: "Test conclusion.",
  sources: [{ id: "s1", name: "Exchange", accessedAt: "2026-11-09T09:44:00+05:30" }],
};
const metric = { label: "Index", baseline: 100, latest: 101, status: "confirmed", sourceId: "s1", capturedAt: "2026-11-09T09:44:00+05:30" };

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
    expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, latest: null, status: "unavailable" }] }).success).toBe(true));
  it("rejects a missing value that is not marked unavailable", () =>
    expect(reportSchema.safeParse({ ...base, metrics: [{ ...metric, latest: null }] }).success).toBe(false));
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
