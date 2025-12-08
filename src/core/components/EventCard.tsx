"use client";

import { Button } from "~/core/components/Button";

interface EventCardProps {
  title: string;
  img: string;
  gridArea: string;
}

export function EventCard({ title, img, gridArea }: EventCardProps) {
  return (
    <div
      className="relative flex h-[280px] z-0 flex-col justify-between gap-12 rounded-xl bg-cover bg-center p-[100px_32px_24px]"
      style={{
        backgroundImage: `url("${img}")`,
        gridArea,
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-black/40" />

      <p className="relative z-10 w-[200px] text-2xl font-medium text-white">
        {title}
      </p>

      <Button
        type="button"
        buttonStyle="colored"
        onClick={() => console.log("todo")}
        className="relative z-10 w-[200px]"
      >
        More
      </Button>
    </div>
  );
}
