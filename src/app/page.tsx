import { Banner } from "~/core/components/Banner";
import { Video } from "~/core/components/Video";
import { Title } from "~/core/components/Title";
import { LightningIcon } from "~/core/components/LightningIcon";
import { SwitchButton } from "~/core/components/SwitchButton";
import { PizzaSlider } from "~/core/components/PizzaSlider";
import { Suspense } from "react";
import { Loader } from "~/core/components/Loader";

export default function HomePage() {
  return (
    <main className="mt-[120px] flex w-full max-w-[1980px] flex-col">
      <section className="flex w-full flex-col-reverse items-center justify-center gap-28 lg:flex-row lg:gap-12 xl:justify-around">
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
        />
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-12 p-16 px-32">
        <Title>Menu</Title>
        <Suspense fallback={<Loader/>}>
          <PizzaSlider />
        </Suspense>
      </section>
    </main>
  );
}
