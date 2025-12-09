import Image from "next/image";

export function PizzaImages() {
  const images = [
    "/pizzas/pizza_1.png",
    "/pizzas/pizza_2.png",
    "/pizzas/pizza_3.png",
    "/pizzas/pizza_4.png",
    "/pizzas/pizza_5.png",
  ];

  return (
    <div className="flex">
      {images.map((src, i) => (
        <Image
          width={419}
          height={414}
          key={i}
          src={src}
          alt="pizza"
          className={`
            w-[140px] sm:w-[200px]  
            ${i === 0 ? "ml-[-32px]" : "ml-[-100px] md:ml-[-120px]"}
            ${i % 2 === 0 ? "z-[1] mt-[20px]" : "z-[2] mb-[20px]"}
          `}
        />
      ))}
    </div>
  );
}
