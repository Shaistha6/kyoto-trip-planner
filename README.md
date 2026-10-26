# Kyoto Trip Planner Chat

A happy-path prototype of the Kyoto trip-planner chat. Send any message: the input locks, pulsing dots play for about 2 seconds, then the chat shows a stay, an Experience and a food card, in that order.

## How to run

Run `npm install && npm run dev`, then open http://localhost:3000

## Screenshots

**1. The thread with all three cards** (stay, Experience, food, in that order)

![Chat thread showing the stay, Experience and food cards](docs/screenshot.png)

**2. Thinking animation:** after Send, the input greys out ("Planning your weekend…") and three pulsing dots show in the reply bubble for about 2 seconds.

![Input locked and pulsing dots in the reply bubble](docs/thinking.png)

**3. Filler line:** with the food card's `bookingNote` emptied in the mock data, the card shows "Not listed yet" in that spot, not a blank or "undefined".

![Food card showing the filler line Not listed yet](docs/filler.png)

## What's inside

- `data/mockResponse.json`: the mock response. Three items, one row copied from each sheet of the *Kyoto Weekend Prototype Content Pack* (Stays S1, Experiences E1, Food F1). Each item has a `cardType` and its `details`.
- `components/StayCard.tsx`: full-width grey banner on top, travel dates as the biggest text, coral top border.
- `components/ExperienceCard.tsx`: tall grey strip on the left, experience title as the biggest text, purple day label.
- `components/FoodCard.tsx`: small round grey thumbnail top right, place name as the biggest text, amber meal label.
- `components/fill.ts`: any empty field shows the short filler line "Not listed yet", never a blank or "undefined".
- `app/page.tsx`: the chat page (Next.js + Tailwind CSS).

Error handling (error bubble, Try again, forced failure) comes in the next stage.
