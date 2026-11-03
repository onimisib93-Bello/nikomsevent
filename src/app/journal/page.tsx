import type { Metadata } from "next";
import { Journal } from "@/components/sections/Journal";
import { PageHero } from "@/components/sections/PageHero";
import { media } from "@/content/media";

export const metadata: Metadata = { title: "Planning notes", description: "Practical guides for planning an event at Nikoms." };

export default function JournalIndex() {
  return (
    <>
      <PageHero image={media.journalC} title="Planning notes">
        <p className="mt-5 max-w-xl text-lg text-paper/85">Short, practical guides from the events desk.</p>
      </PageHero>
      <Journal />
    </>
  );
}
