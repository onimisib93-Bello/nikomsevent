import { Suspense } from "react";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Journal } from "@/components/sections/Journal";
import { Marquee } from "@/components/sections/Marquee";
import { Moments } from "@/components/sections/Moments";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { Occasions } from "@/components/sections/Occasions";
import { PackageFinder } from "@/components/sections/PackageFinder";
import { Services } from "@/components/sections/Services";
import { Spaces } from "@/components/sections/Spaces";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { ViewingBand } from "@/components/sections/ViewingBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Spaces />
      <Occasions />
      <Suspense>
        <PackageFinder />
      </Suspense>
      <Services />
      <About />
      <Team />
      <Moments />
      <ViewingBand />
      <Testimonials />
      <Journal />
      <NewsletterBand />
    </>
  );
}
