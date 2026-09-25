import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { formatDate } from "@/components/sections/Journal";
import { articles, getArticle } from "@/content/journal";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  return (
    <>
      <PageHero image={a.image} title={a.title}>
        <time dateTime={a.date} className="mt-5 block text-paper/75">{formatDate(a.date)}</time>
      </PageHero>
      <article className="bg-paper py-[var(--spacing-section)]">
        <div className="container-page">
          <div className="mx-auto max-w-[38rem] space-y-6 text-lg leading-[1.75]">
            <p className="font-display text-2xl leading-snug">{a.excerpt}</p>
            {a.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="pt-8">
              <ArrowLink href="/journal">All planning notes</ArrowLink>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
