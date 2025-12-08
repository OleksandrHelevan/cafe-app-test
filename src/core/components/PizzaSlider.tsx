"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Pizza } from "~/domains/pizza/types";
import { useGetPizzas } from "~/domains/pizza/useGetPizzas";
import { PizzaCard } from "~/core/components/PizzaCard";
import { Button } from "~/core/components/Button";
import type { Swiper as SwiperType } from "swiper";
import { PizzaType } from "~/core/types/pizzaType";
import { useSearchParams } from "next/navigation";
import { Loader } from "~/core/components/Loader";

export function PizzaSlider() {
  const pageSize = 10;
  const searchParams = useSearchParams();

  const initialType = (searchParams.get("type") as PizzaType) ?? "MEAT";
  const [pizzaType, setPizzaType] = useState<PizzaType>(initialType);

  const [allPizzas, setAllPizzas] = useState<Pizza[]>([]);
  const [page, setPage] = useState(0);

  const { data, loading } = useGetPizzas({
    page,
    size: pageSize,
    pizzaType,
  });

  useEffect(() => {
    if (data) {
      setAllPizzas((prev) =>
        page === 0 ? data.content : [...prev, ...data.content],
      );
    }
  }, [data, page]);

  const handleSlideChange = (swiper: SwiperType) => {
    if (
      data &&
      !data.last &&
      swiper.activeIndex + Number(swiper.params.slidesPerView) >=
        allPizzas.length
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [pizzaType]);

  const pizzaTypes: [PizzaType, string][] = [
    [PizzaType.MEAT, "Meat"],
    [PizzaType.MUSHROOMS, "Mushrooms"],
    [PizzaType.SEA_PRODUCTS, "Seafood"],
    [PizzaType.VEGETARIAN, "Vegetarian"],
  ];

  const handleTypeChange = (type: PizzaType) => {
    setPizzaType(type);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("type", type);
      window.history.replaceState({}, "", url.toString());
    }
  };

  if (loading && allPizzas.length === 0) return <Loader />;

  return (
    <div className="z-0 w-full">
      <div className="mb-8 flex flex-col justify-center gap-2 text-xl sm:grid sm:grid-cols-2 sm:grid-rows-2 md:flex md:flex-row">
        {pizzaTypes.map(([type, name]) => (
          <Button
            key={type}
            type="button"
            buttonStyle={pizzaType === type ? "colored" : "menuButton"}
            onClick={() => handleTypeChange(type)}
          >
            {name}
          </Button>
        ))}
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        onSlideChange={handleSlideChange}
        observer
        observeParents
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="relative w-full"
      >
        {allPizzas.map((pizza) => (
          <SwiperSlide
            key={pizza.name}
            className="mb-10 h-full w-full overflow-visible pt-24"
          >
            <PizzaCard pizza={pizza} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
