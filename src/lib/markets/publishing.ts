import { isLegacyType, PUBLISHABLE_TYPES, reportSchema, type Report } from "./schema";

export function validatePublication(raw: unknown, previous?: unknown): Report {
  const next = reportSchema.parse(raw);
  if (!previous) {
    if (isLegacyType(next.type)) throw new Error(`"${next.type}" is a legacy report type and can no longer be newly published; use ${PUBLISHABLE_TYPES.join(" or ")}`);
    if (next.revisions.length) throw new Error("A first publication must not claim revisions");
    return next;
  }
  const old = reportSchema.parse(previous);
  if (next.date !== old.date || next.type !== old.type) throw new Error("Correction must retain date and type");
  if (next.revisions.length !== old.revisions.length + 1 || JSON.stringify(next.revisions.slice(0, -1)) !== JSON.stringify(old.revisions)) throw new Error("Correction must preserve revision history and append one revision");
  const revision = next.revisions.at(-1);
  if (!revision || Date.parse(revision.at) <= Date.parse(old.generatedAt) || Date.parse(next.generatedAt) < Date.parse(revision.at)) throw new Error("Correction timestamps must advance and generatedAt must include the revision");
  return next;
}