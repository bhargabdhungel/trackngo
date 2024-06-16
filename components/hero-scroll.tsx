import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";
import tracknGoFull from "@/public/trackngoFull1.png";

export default function HeroScroll() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">
            Presenting you the best tracking app
            <br />
            <span className="text-4xl text-black dark:text-white md:text-[6rem] font-bold mt-1 leading-none">
              TracknGo
            </span>
          </h1>
        </>
      }
    >
      <Image
        src={tracknGoFull}
        alt="hero"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-left-top"
        draggable={false}
      />
    </ContainerScroll>
  );
}
