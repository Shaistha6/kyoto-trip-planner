// Short filler line shown in place of any empty field, so a card never shows a blank or "undefined".
export const FILLER = "Not listed yet";

export function has(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  const text = String(value).trim();
  return text !== "" && text !== "undefined" && text !== "null" && text !== "NaN";
}

// Returns the value as text, or the filler line when it's empty.
export function fill(value: unknown): string {
  return has(value) ? String(value).trim() : FILLER;
}

// Same, but only formats the value when it's present: fillWith(168, (v) => `$${v}`) -> "$168".
export function fillWith<T>(value: T | undefined | null, format: (v: T) => string): string {
  return has(value) ? format(value as T) : FILLER;
}

function toDate(iso?: string) {
  if (!has(iso)) return null;
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

// "11–13 Apr 2025"
export function dateRange(checkIn?: string, checkOut?: string): string | null {
  const a = toDate(checkIn);
  const b = toDate(checkOut);
  if (!a || !b) return null;
  const mon = (d: Date) => d.toLocaleString("en-GB", { month: "short" });
  const start = mon(a) === mon(b) ? `${a.getDate()}` : `${a.getDate()} ${mon(a)}`;
  return `${start}–${b.getDate()} ${mon(b)} ${b.getFullYear()}`;
}

// { weekday: "SAT", day: "12 Apr" }
export function dayLabel(iso?: string): { weekday: string; day: string } | null {
  const d = toDate(iso);
  if (!d) return null;
  return {
    weekday: d.toLocaleString("en-GB", { weekday: "short" }).toUpperCase(),
    day: d.toLocaleString("en-GB", { day: "numeric", month: "short" }),
  };
}
