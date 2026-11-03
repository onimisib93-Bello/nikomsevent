import { Suspense } from "react";
import { PackageFinder } from "@/components/sections/PackageFinder";
import { Arrival } from "@/components/story/Arrival";
import { ChapterRail } from "@/components/story/ChapterRail";
import { DayNight } from "@/components/story/DayNight";
import { Details } from "@/components/story/Details";
import { Finale } from "@/components/story/Finale";
import { Intro } from "@/components/story/Intro";
import { Nights } from "@/components/story/Nights";
import { SpacesTrack } from "@/components/story/SpacesTrack";
import { Stories } from "@/components/story/Stories";

/**
 * The home page is one story in seven chapters: the doors open, the hall
 * shows every kind of event, day turns to night, you walk the spaces, see
 * what's included and what hosts say, and end back at the doors with a date.
 * The package finder sits after the story for visitors ready to compare.
 */
export default function Home() {
  return (
    <div className="bg-night text-ivory">
      <Intro />
      <ChapterRail />
      <Arrival />
      <Stories />
      <DayNight />
      <SpacesTrack />
      <Details />
      <Nights />
      <Finale />
      <Suspense>
        <PackageFinder />
      </Suspense>
    </div>
  );
}
