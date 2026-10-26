// Mock response: fake data that stands in for the assistant's real answer.
// mockResponse.json holds three items, one row copied from each sheet of the
// "Kyoto Weekend Prototype Content Pack" workbook: Stays S1, Experiences E1, Food F1.
// Every field is optional on purpose: a missing value shows a filler line, never a blank.
import rows from "./mockResponse.json";

export type StayDetails = {
  optionId?: string;
  listingTitle?: string;
  propertyType?: string;
  neighbourhood?: string;
  nights?: number;
  pricePerNightUsd?: number;
  totalUsd?: number;
  guestRating?: number;
  reviewCount?: number;
  hostFirstName?: string;
  highlight?: string;
  checkIn?: string; // YYYY-MM-DD
  checkOut?: string; // YYYY-MM-DD
};

export type ExperienceDetails = {
  optionId?: string;
  title?: string;
  category?: string;
  hostFirstName?: string;
  date?: string; // YYYY-MM-DD
  startTime?: string; // HH:MM
  durationHours?: number;
  pricePerGuestUsd?: number;
  totalUsd?: number;
  rating?: number;
  meetingPoint?: string;
  availability?: string;
};

export type FoodDetails = {
  optionId?: string;
  placeName?: string;
  cuisine?: string;
  neighbourhood?: string;
  meal?: string;
  priceLevel?: string;
  estCostUsd?: number;
  walkFromStayMin?: number;
  bookingNote?: string;
};

export type TripCard =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

const ORDER = ["stay", "experience", "food"] as const;

// Always stay -> experience -> food, whatever order the file is in.
export const mockResponse: TripCard[] = [...(rows as TripCard[])].sort(
  (a, b) => ORDER.indexOf(a.cardType) - ORDER.indexOf(b.cardType),
);

export const THINKING_MS = 2000;

// Happy path: any message resolves to the same three cards after the thinking delay.
// Error handling (error bubble, Try again, forced failure) comes in the next stage.
export function getTripPlan(): Promise<TripCard[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockResponse), THINKING_MS));
}
