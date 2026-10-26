import type { ExperienceDetails } from "@/data/mockResponse";
import { dayLabel, fill, fillWith } from "./fill";

// Experience card: tall grey strip on the left, experience title as the biggest text, purple day label.
export default function ExperienceCard({ details: d }: { details: ExperienceDetails }) {
  const day = dayLabel(d.date);
  return (
    <article
      aria-label="Experience"
      className="flex w-full max-w-card overflow-hidden rounded-lg border border-cardline bg-white"
    >
      <div className="w-[30%] shrink-0 bg-placeholder" aria-hidden />
      <div className="flex-1 space-y-1.5 p-4">
        <p className="text-xl font-bold leading-tight text-neutral-900">{fill(d.title)}</p>
        <p className="text-sm text-neutral-900">
          <span className="mr-2 inline-block rounded bg-purple px-1.5 py-0.5 text-xs font-bold text-white">
            {day ? day.weekday : "DAY"}
          </span>
          {day ? day.day : fill(undefined)} · {fill(d.startTime)} · {fillWith(d.durationHours, (v) => `${v} hrs`)}
        </p>
        <p className="text-sm text-muted">
          {fill(d.category)} · Host {fill(d.hostFirstName)} · ★ {fill(d.rating)}
        </p>
        <p className="text-sm text-muted">Meet: {fill(d.meetingPoint)}</p>
        <p className="text-sm">
          <span className="font-semibold text-neutral-900">{fillWith(d.pricePerGuestUsd, (v) => `$${v}`)}</span>
          <span className="text-muted"> / guest · {fill(d.availability)}</span>
        </p>
      </div>
    </article>
  );
}
