import { describe, expect, it } from "vitest";
import { experienceItems } from "./Experience";

describe("owner-approved employment history", () => {
  it("preserves the current full-time role and dates", () => {
    expect(experienceItems[0]).toMatchObject({ role: "Deputy Manager", company: "Mahindra Manulife Mutual Fund", period: "Oct 2026–Present", employmentType: "Full-time", points: [] });
  });
  it("preserves the DSP Assistant Manager role and dates", () => {
    expect(experienceItems[1]).toMatchObject({ role: "Assistant Manager", company: "DSP Mutual Fund", period: "Jun 2025–Oct 2026", employmentType: "Full-time", points: [] });
  });
  it("preserves the DSP Management Trainee role and dates", () => {
    expect(experienceItems[2]).toMatchObject({ role: "Management Trainee", company: "DSP Mutual Fund", period: "Jun 2024–Jun 2025", employmentType: "Full-time", points: [] });
  });
});