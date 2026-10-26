import type { TripCard } from "@/data/mockResponse";
import StayCard from "./StayCard";
import ExperienceCard from "./ExperienceCard";
import FoodCard from "./FoodCard";
import { buildDayPlan } from "./dayPlan";

// Picks the right component for each item using cardType. Order follows the mock: stay, experience, food.
export default function TripCards({ cards }: { cards: TripCard[] }) {
  const plan = buildDayPlan(cards);
  return (
    <div className="flex flex-col gap-3">
      {cards.map((card) => {
        switch (card.cardType) {
          case "stay":
            return <StayCard key="stay" details={card.details} />;
          case "experience":
            return <ExperienceCard key="experience" details={card.details} plan={plan} />;
          case "food":
            return <FoodCard key="food" details={card.details} />;
        }
      })}
    </div>
  );
}
