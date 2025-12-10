"use client";

import { Banner } from "~/core/components/Banner";
import { Video } from "~/core/components/Video";
import { Title } from "~/core/components/Title";
import { LightningIcon } from "~/core/components/LightningIcon";
import { SwitchButton } from "~/core/components/SwitchButton";
import { PizzaSlider } from "~/core/components/PizzaSlider";
import { Suspense } from "react";
import { Loader } from "~/core/components/Loader";
import { PopularPizzaBanner } from "~/core/components/PopularPizzaBanner";
import { PopularPizzasSwiper } from "~/core/components/PopularPizzasSwiper";
import { Events } from "~/core/components/Events";
import { PizzaImages } from "~/core/components/PizzaImages";
import { usePizzaModal } from "~/domains/pizza/useModal";
import { ModalContainer } from "~/core/components/ModalContainer";
import { PizzaModal } from "~/core/components/PizzaModal";

export default function HomePage() {
  const { open, isOpen, close, pizza } = usePizzaModal();
  return (
    <>
      <main className="mt-[120px] flex w-full max-w-[1980px] flex-col">
        <section
          id={"home"}
          className="flex w-full flex-col-reverse items-center justify-center gap-28 lg:flex-row lg:gap-12 xl:justify-around"
        >
          <div className="flex flex-col gap-6 px-4">
            <Title>
              The Fastest
              <br />
              Pizza <LightningIcon /> Delivery
            </Title>
            <p className={"text-l w-60 text-gray-400 sm:w-100"}>
              We will deliver juicy pizza for your family in 30 minutes, if the
              courier is late -{" "}
              <span className={"text-white"}>pizza is free!</span>
            </p>
            <Video
              src="https://www.youtube.com/embed/F_UmiKMwRwA"
              preview="/img/video-preview.png"
            />
            <SwitchButton first={"To order"} second={"Pizza menu"} />
          </div>
          <Banner
            bannerSrc="/banners/pizza-banner.png"
            topEmoji="/emoji/pizza.png"
            bottomEmoji="/emoji/potatoes-free.png"
            bannerStyle={"hero"}
          />
        </section>
        <section
          id={"menu"}
          className="z-0 flex w-full flex-col items-center justify-center gap-8 px-8 py-16 xl:px-32"
        >
          <Title>Menu</Title>
          <PizzaSlider onOrderClick={open} />

          <PopularPizzaBanner />
          <PopularPizzasSwiper onOrderClick={open} />
        </section>
        <section
          id={"events"}
          className={"relative w-full overflow-hidden px-8 xl:px-32"}
        >
          <Events />
        </section>
        <section
          id="about"
          className="z-0 flex w-full flex-col-reverse items-center gap-24 pt-24 text-gray-400 lg:flex-row lg:justify-between lg:gap-2 lg:px-16 xl:px-32"
        >
          <div className="flex flex-col gap-4 lg:items-start">
            <Title>About us</Title>
            <p className="w-64 sm:w-128">
              In just a couple of years, we have opened 6 outlets in different
              cities: Lviv, Kyiv, Odesa, Chernivtsi, Kharkiv, and in the future
              we plan to develop the network in other major cities of Ukraine.
            </p>
            <PizzaImages />
            <p className="w-64 sm:w-128">
              The kitchen of each point is at least: 400-500 sq. m. meters,
              hundreds of employees, smoothly performing work in order to
              receive / prepare / form / deliver customer orders on time.
            </p>
          </div>
          <Banner
            bannerSrc="/banners/about-us-banner.jpg"
            topEmoji="/emoji/pizza.png"
            bottomEmoji="/emoji/potatoes-free.png"
            bannerStyle="about"
          />
        </section>
      </main>
      <ModalContainer open={isOpen}>
        {pizza && <PizzaModal pizza={pizza} onClose={close} />}
      </ModalContainer>
    </>
  );
}
