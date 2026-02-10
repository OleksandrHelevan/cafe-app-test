"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

import { Banner } from "~/core/components/Banner";
import { Video } from "~/core/components/Video";
import { Title } from "~/core/components/Title";
import { LightningIcon } from "~/core/components/LightningIcon";
import { SwitchButton } from "~/core/components/SwitchButton";
import { PizzaSlider } from "~/core/components/PizzaSlider";
import { PopularPizzaBanner } from "~/core/components/PopularPizzaBanner";
import { PopularPizzasSwiper } from "~/core/components/PopularPizzasSwiper";
import { Events } from "~/core/components/Events";
import { PizzaImages } from "~/core/components/PizzaImages";
import { ModalContainer } from "~/core/components/ModalContainer";
import { PizzaModal } from "~/core/components/PizzaModal";
import { Loader } from "~/core/components/Loader";
import { AuthForm } from "~/core/components/AuthForm";
import { Logo } from "~/core/components/Logo";
import { Button } from "~/core/components/Button";
import BurgerMenu from "~/core/components/BurgerMenu";
import { Navigation } from "~/core/components/Navigation";

import { SOURCE } from "~/core/constants/source";
import { ModalProvider, useModalContext } from "~/core/components/ModalContext";
import { getCookie } from "~/core/util/cookies";
import { AdminPanel } from "~/core/components/AdminPanel";
import { AddPizzaModal } from "~/core/components/AddPizzaModal";

export default function HomePage() {
  return (
    <ModalProvider>
      <MainContent />
    </ModalProvider>
  );
}

function MainContent() {
  const { modal, isOpen, openLogin, openPizza, openAdminPanel, close } =
    useModalContext();

  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAdmin(getCookie("isAdmin") === "true");
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header className="fixed z-10 flex h-[80px] w-full max-w-[1980px] items-center justify-between bg-[#170A00]/90 px-6 backdrop-blur-[10px] transition-colors duration-300 lg:px-[80px]">
        <Logo />
        <Navigation className="hidden lg:flex" />

        <div className="flex items-center gap-8">
          {!isAdmin && (
            <Button
              onClick={openLogin}
              type="button"
              buttonStyle="colored"
              className="hidden lg:flex"
            >
              Log in
            </Button>
          )}

          {isAdmin && (
            <Button
              type="button"
              buttonStyle="colored"
              className="hidden lg:flex"
              onClick={openAdminPanel}
            >
              Dashboards
            </Button>
          )}

          <Button type="button" buttonStyle="circle">
            <Image src="/icons/bag.svg" alt="bag" width={24} height={24} />
          </Button>

          <BurgerMenu />
        </div>
      </header>

      <main className="mt-[120px] flex w-full max-w-[1980px] flex-col">
        <section
          id="home"
          className="flex w-full flex-col-reverse items-center justify-center gap-28 lg:flex-row lg:gap-12 xl:justify-around"
        >
          <div className="flex flex-col gap-6 px-4">
            <Title>
              The Fastest
              <br />
              Pizza <LightningIcon /> Delivery
            </Title>

            <p className="text-l w-60 text-gray-400 sm:w-100">
              We will deliver juicy pizza for your family in 30 minutes, if the
              courier is late –{" "}
              <span className="text-white">pizza is free!</span>
            </p>

            <Video
              src="https://www.youtube.com/embed/F_UmiKMwRwA"
              preview="/img/video-preview.png"
            />

            <SwitchButton first="To order" second="Pizza menu" />
          </div>

          <Banner
            bannerSrc="/banners/pizza-banner.png"
            topEmoji="/emoji/pizza.png"
            bottomEmoji="/emoji/potatoes-free.png"
            bannerStyle="hero"
          />
        </section>

        <section
          id="menu"
          className="z-0 flex w-full flex-col items-center justify-center gap-8 px-8 py-16 xl:px-32"
        >
          <Title>Menu</Title>

          <Suspense fallback={<Loader />}>
            <PizzaSlider onOrderClick={openPizza} />
          </Suspense>

          <PopularPizzaBanner source={SOURCE} />

          {SOURCE === "mock" && (
            <PopularPizzasSwiper onOrderClick={openPizza} />
          )}
        </section>

        <section id="events" className="relative w-full px-8 xl:px-32">
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
              cities: Lviv, Kyiv, Odesa, Chernivtsi, Kharkiv.
            </p>

            <PizzaImages />

            <p className="w-64 sm:w-128">
              The kitchen of each point is at least 400–500 sq. meters with
              hundreds of employees.
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
        {modal?.type === "login" && <AuthForm onClose={close} />}
        {modal?.type === "pizza" && (
          <PizzaModal pizza={modal.pizza} onClose={close} />
        )}
        {modal?.type === "adminPanel" && <AdminPanel onClose={close} />}
        {modal?.type === "addPizza" && <AddPizzaModal onClose={close} />}
      </ModalContainer>
    </>
  );
}
