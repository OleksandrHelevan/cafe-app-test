"use client";

import { Emoji } from "~/core/components/Emoji";
import { EventCard } from "./EventCard";

const eventsData = [
  { title: "HOW WE COOKING", img: "/events/cooking.jpg", gridArea: "cooking" },
  { title: "OUR BLOG", img: "/events/blog.jpg", gridArea: "blog" },
  { title: "TWO PIZZA FOR 1 PRICE", img: "/events/pizza.jpg", gridArea: "pizza" },
  { title: "KITCHEN TOUR", img: "/events/tour.jpg", gridArea: "tour" },
  { title: "FREE COFFEE FOR 3 PIZZA", img: "/events/coffee.jpg", gridArea: "coffee" },
  { title: "OUR INSTAGRAM", img: "/events/instagram.jpg", gridArea: "instagram" },
  { title: "WHERE ARE YOU CHOOSE US?", img: "/events/place.jpg", gridArea: "place" },
];

export function Events() {
  return (
    <div className="z-0 w-full  text-white lg:w-full overflow-x-auto overflow-y-hidden">
        <div
          className="relative w-full min-w-[960px] grid grid-cols-6 gap-5"
          style={{
            gridTemplateAreas: `
              "cooking cooking blog blog title title"
              "pizza pizza pizza tour tour tour"
              "coffee coffee instagram instagram place place"
            `,
          }}
        >
          {eventsData.map((ev) => (
            <EventCard
              key={ev.gridArea}
              title={ev.title}
              img={ev.img}
              gridArea={ev.gridArea}
            />
          ))}

          <div
            className="z-0 col-span-2 flex flex-col items-end justify-end gap-2 p-8"
            style={{ gridArea: "title" }}
          >
            <h2 className="relative z-10 text-4xl font-extrabold text-white">
              Events
            </h2>
            <p className="relative z-10 text-lg font-light text-gray-300">
              There are regular events in our pizzeria that will allow you to eat
              delicious food for a lower price!
            </p>
          </div>

          <Emoji
            width={513}
            height={597}
            className="pointer-events-none absolute top-[160px] left-[-120px] opacity-0 xl:h-[280px] xl:w-[280px] xl:opacity-100"
            src="/emoji/eggs.png"
          />
          <Emoji
            width={588}
            height={706}
            className="pointer-events-none absolute top-[30%] right-[-128] opacity-0 xl:h-[320px] xl:w-[320px] xl:opacity-100"
            src="/emoji/roll.png"
          />
          <Emoji
            width={542}
            height={542}
            className="pointer-events-none absolute bottom-[-120px] left-[-128] opacity-0 xl:h-[320px] xl:w-[320px] xl:opacity-100"
            src="/emoji/coffee.png"
          />
        </div>
      </div>
  );
}
