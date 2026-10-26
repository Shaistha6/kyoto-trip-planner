import type { ExperienceDetails } from "@/data/mockResponse";
import type { PlanDay } from "./dayPlan";
import { fill, fillWith, FILLER } from "./fill";

// Experience card: tall grey strip on the left, experience title as the biggest text,
// purple day labels on the weekend's day-by-day plan.
export default function ExperienceCard({ details: d, plan = [] }: { details: ExperienceDetails; plan?: PlanDay[] }) {
  return (
    <article
      aria-label="Experience"
      className="flex w-full max-w-card overflow-hidden rounded-lg border border-cardline bg-white"
    >
      <div className="w-[30%] shrink-0 bg-placeholder" aria-hidden />
      <div className="flex-1 space-y-1.5 p-4">
        <p className="text-xl font-bold leading-tight text-neutral-900">{fill(d.title)}</p>
        <p className="text-sm text-muted">
          {fill(d.category)} · Host {fill(d.hostFirstName)} · ★ {fill(d.rating)}
        </p>
        <p className="text-sm text-muted">Meet: {fill(d.meetingPoint)}</p>
        <p className="text-sm">
          <span className="font-semibold text-neutral-900">{fillWith(d.pricePerGuestUsd, (v) => `$${v}`)}</span>
          <span className="text-muted"> / guest · {fill(d.availability)}</span>
        </p>

        <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted">Your weekend, day by day</p>
        <ul className="space-y-2">
          {plan.length === 0 ? (
            <li className="text-sm text-muted">Day plan: {FILLER}</li>
          ) : (
            plan.map((p) => (
              <li key={p.weekday + p.day} className="flex gap-2 text-sm text-neutral-900">
                <span className="mt-0.5 h-fit shrink-0 rounded bg-purple px-1.5 py-0.5 text-xs font-bold text-white">
                  {p.weekday}
                </span>
                <span>
                  <span className="text-muted">{p.day} · </span>
                  {p.text}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </article>
  );
}
