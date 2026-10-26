import type { StayDetails } from "@/data/mockResponse";
import { dateRange, fill, fillWith, has } from "./fill";

// Stay card: full-width grey banner on top, travel dates as the biggest text, coral top border.
export default function StayCard({ details: d }: { details: StayDetails }) {
  const range = dateRange(d.checkIn, d.checkOut);
  const nights = has(d.nights) ? ` · ${d.nights} night${d.nights === 1 ? "" : "s"}` : "";
  return (
    <article
      aria-label="Stay"
      className="w-full max-w-card overflow-hidden rounded-lg border border-cardline border-t-4 border-t-coral bg-white"
    >
      <div className="aspect-[16/7] w-full bg-placeholder" aria-hidden />
      <div className="space-y-1 p-4">
        <p className="text-xl font-bold leading-tight text-neutral-900">
          {range ? `${range}${nights}` : "Dates: Not listed yet"}
        </p>
        <p className="text-sm font-medium text-neutral-900">{fill(d.listingTitle)}</p>
        <p className="text-sm text-muted">
          {fill(d.propertyType)} · {fill(d.neighbourhood)}, Kyoto
        </p>
        <p className="text-sm">
          {has(d.pricePerNightUsd) ? (
            <>
              <span className="font-semibold text-neutral-900">${d.pricePerNightUsd}</span>
              <span className="text-muted"> / night</span>
            </>
          ) : (
            <span className="text-muted">Price: {fill(undefined)}</span>
          )}
          <span className="text-muted"> · {fillWith(d.totalUsd, (v) => `$${v} total`)}</span>
        </p>
        <p className="text-sm text-muted">
          ★ {fill(d.guestRating)} ({fillWith(d.reviewCount, (v) => `${v} reviews`)}) · Host {fill(d.hostFirstName)}
        </p>
        <p className="text-sm text-neutral-900">{fill(d.highlight)}</p>
      </div>
    </article>
  );
}
