import type { TripCard, StayDetails, ExperienceDetails, FoodDetails } from "@/data/mockResponse";
import { dayLabel, fill, has } from "./fill";

export type PlanDay = { weekday: string; day: string; text: string };

// Builds the weekend day by day using only the three workbook rows in the mock:
// check-in and check-out come from the Stays row, the activity from the Experiences row,
// and dinner from the Food row (placed on the experience day). Nothing is made up.
export function buildDayPlan(cards: TripCard[]): PlanDay[] {
  const stay = cards.find((c) => c.cardType === "stay")?.details as StayDetails | undefined;
  const exp = cards.find((c) => c.cardType === "experience")?.details as ExperienceDetails | undefined;
  const food = cards.find((c) => c.cardType === "food")?.details as FoodDetails | undefined;

  const entries: { date: string; text: string }[] = [];

  if (stay && has(stay.checkIn)) {
    entries.push({ date: stay.checkIn!, text: `Check in to ${fill(stay.listingTitle)}` });
  }
  if (exp && has(exp.date)) {
    const time = has(exp.startTime) ? `${exp.startTime} ` : "";
    const hrs = has(exp.durationHours) ? ` (${exp.durationHours} hrs)` : "";
    const dinner = food && has(food.placeName) ? `, then ${fill(food.meal).toLowerCase()} at ${food.placeName}` : "";
    entries.push({ date: exp.date!, text: `${time}${fill(exp.title)}${hrs}${dinner}` });
  }
  if (stay && has(stay.checkOut)) {
    entries.push({ date: stay.checkOut!, text: `Check out of ${fill(stay.listingTitle)}` });
  }

  return entries
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => {
      const d = dayLabel(e.date);
      return { weekday: d?.weekday ?? "DAY", day: d?.day ?? fill(undefined), text: e.text };
    });
}
