import type { FoodDetails } from "@/data/mockResponse";
import { fill, fillWith } from "./fill";

// Food card: no banner, small round grey thumbnail top right, place name as the biggest text, amber meal label.
export default function FoodCard({ details: d }: { details: FoodDetails }) {
  return (
    <article
      aria-label="Food"
      className="relative w-full max-w-card space-y-1.5 rounded-lg border border-cardline bg-white p-4 pr-16"
    >
      <div className="absolute right-4 top-4 h-9 w-9 rounded-full bg-placeholder" aria-hidden />
      <p className="text-xl font-bold leading-tight text-neutral-900">{fill(d.placeName)}</p>
      <span className="inline-block rounded bg-amber px-1.5 py-0.5 text-xs font-bold text-white">
        {fill(d.meal)} · {fill(d.priceLevel)}
      </span>
      <p className="text-sm text-muted">
        {fill(d.cuisine)} · {fill(d.neighbourhood)} · {fillWith(d.walkFromStayMin, (v) => `${v} min walk`)}
      </p>
      <p className="text-sm text-neutral-900">{fillWith(d.estCostUsd, (v) => `About $${v} for 2`)}</p>
      <p className="text-sm text-muted">{fill(d.bookingNote)}</p>
    </article>
  );
}
