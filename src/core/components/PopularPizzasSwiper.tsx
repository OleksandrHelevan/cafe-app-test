"use client";

import { PizzaCard } from "~/core/components/PizzaCard";
import { useGetPopularPizzas } from "~/domains/pizza/useGetPopularPizzas";
import { Loader } from "~/core/components/Loader";
import type { Pizza } from "~/domains/pizza/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PopularPizzasSwiperProps {
  onOrderClick: (pizza: Pizza) => void;
}

export function PopularPizzasSwiper({ onOrderClick }: PopularPizzasSwiperProps) {
  const { data, loading } = useGetPopularPizzas();

  if (loading || !data) return <Loader />;
  if (data.length < 3) return null;

  const ordered: Pizza[] = [data[1], data[0], data[2]].filter(
    (p): p is Pizza => !!p,
  );

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 40 },
      }}
      className="relative w-full"
    >
      {ordered.map((pizza, index) => (
        <SwiperSlide
          key={pizza.name}
          className="mb-10 h-full w-full overflow-visible pt-24"
        >
          <PizzaCard
            pizza={pizza}
            position={index === 0 ? 2 : index === 1 ? 1 : 3}
            onBtnClick={() => onOrderClick(pizza)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
