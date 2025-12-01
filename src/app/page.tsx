import { Banner } from "~/core/components/Banner";
import { Video } from "~/core/components/Video";
import { Title } from "~/core/components/Title";
import {LightningIcon} from "~/core/components/LightningIcon";

export default function HomePage() {
  return (
    <main className="mt-[120px] flex w-full flex-col max-w-[1980px]">
      <section className="flex w-full xl:justify-around justify-center lg:gap-12">
        <div className="flex flex-col gap-4">
          <Title>The Fastest<br/>
              Pizza <LightningIcon/> Delivery</Title>
          <p className={"w-100 text-l text-gray-400"}>We will deliver juicy pizza for your
              family in 30 minutes, if the courier is late - <span className={"text-white"}>pizza is free!</span></p>
          <Video
            src="https://www.youtube.com/embed/F_UmiKMwRwA"
            preview="/img/video-preview.png"
          />
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
