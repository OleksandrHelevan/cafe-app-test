import { Banner } from "~/core/components/Banner";
import { Video } from "~/core/components/Video";
import { Title } from "~/core/components/Title";
import {LightningIcon} from "~/core/components/LightningIcon";
import {SwitchButton} from "~/core/components/SwitchButton";

export default function HomePage() {
  return (
    <main className="mt-[120px] flex w-full flex-col max-w-[1980px]">
        <section className="flex w-full flex-col-reverse gap-28 lg:flex-row lg:gap-12 xl:justify-around justify-center items-center">
            <div className="flex flex-col gap-6 px-4">
          <Title>The Fastest<br/>
              Pizza <LightningIcon/> Delivery</Title>
          <p className={"w-60 sm:w-100 text-l text-gray-400"}>We will deliver juicy pizza for your
              family in 30 minutes, if the courier is late - <span className={"text-white"}>pizza is free!</span></p>
          <Video
            src="https://www.youtube.com/embed/F_UmiKMwRwA"
            preview="/img/video-preview.png"
          />
            <SwitchButton first={"To order"} second={"Pizza menu"}/>
        </div>
        <Banner
          bannerSrc="/banners/pizza-banner.png"
          topEmoji="/emoji/pizza.png"
          bottomEmoji="/emoji/potatoes-free.png"
        />
      </section>
    </main>
  );
}
