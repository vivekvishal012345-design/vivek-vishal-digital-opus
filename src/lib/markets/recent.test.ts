import { describe, expect, it } from "vitest";
import { recentGroups } from "./recent";

describe("recentGroups", () => {
  it("keeps only the 7 calendar days ending on the newest report date", () => {
    const g = ["2026-11-10", "2026-11-04", "2026-11-03", "2026-11-07"].map((date) => ({ date }));
    expect(recentGroups(g).map((x) => x.date)).toEqual(["2026-11-10", "2026-11-07", "2026-11-04"]);
  });
  it("returns nothing when there are no reports", () => {
    expect(recentGroups([])).toEqual([]);
  });
});
