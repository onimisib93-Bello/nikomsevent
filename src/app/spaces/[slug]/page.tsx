import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/ui/Gallery";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SpaceCard } from "@/components/sections/SpaceCard";
import { SpaceEnquiry } from "@/components/sections/SpaceEnquiry";
import { getSpace, spaces } from "@/content/spaces";

export function generateStaticParams() {
  return spaces.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/spaces/[slug]">): Promise<Metadata> {
  const space = getSpace((await params).slug);
  return space ? { title: space.name, description: space.summary } : {};
}

export default async function SpacePage({ params }: PageProps<"/spaces/[slug]">) {
  const space = getSpace((await params).slug);
  if (!space) notFound();
  const others = spaces.filter((s) => s.slug !== space.slug).slice(0, 3);

  return (
    <>
      <PageHero image={space.image} title={space.name}>
        <p className="mt-5 max-w-xl text-lg text-paper/85">{space.summary}</p>
      </PageHero>

      <section className="bg-paper py-[var(--spacing-section)]">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <Reveal className="space-y-5 text-lg leading-relaxed text-stone">
            {space.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="border-t border-ink/15">
              <div className="flex justify-between gap-6 border-b border-ink/15 py-4">
                <dt className="text-stone">Capacity</dt>
                <dd className="text-right font-medium">{space.capacity}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-ink/15 py-4">
                <dt className="text-stone">Type</dt>
                <dd className="font-medium">{space.kind}</dd>
              </div>
            </dl>
            <ul className="mt-8 space-y-3">
              {space.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
            <SpaceEnquiry name={space.name} fromPrice={space.fromPrice} />
          </Reveal>
        </div>
      </section>

      <section className="bg-chalk py-[var(--spacing-section)]" aria-labelledby="gallery-title">
        <div className="container-page">
          <h2 id="gallery-title" className="mb-10 font-display text-headline">Photos</h2>
          <Gallery images={space.gallery} title={`${space.name} photos`} />
        </div>
      </section>

      <section className="bg-paper py-[var(--spacing-section)]" aria-labelledby="more-title">
        <div className="container-page">
          <h2 id="more-title" className="mb-10 font-display text-headline">Add another space</h2>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
            {others.map((s) => (
              <li key={s.slug}>
                <SpaceCard space={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
