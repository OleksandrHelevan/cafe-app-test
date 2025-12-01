import {Banner} from "~/core/components/Banner";
import {Video} from "~/core/components/Video";

export default function HomePage() {
  return (
    <main className="mt-[80px] flex min-h-screen w-full flex-col items-center justify-center">

        <Banner
            bannerSrc="/banners/pizza-banner.png"
            pizzaEmoji="/emoji/pizza.png"
            potatoesEmoji="/emoji/potatoes-free.png"
        />
        <Video
            src="https://www.youtube.com/embed/F_UmiKMwRwA"
            preview="/img/video-preview.png"
        />

    </main>
  );
}
