import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-plum-deep text-paper">
      <div className="container-page pt-24">
        <h1 className="font-display text-headline">This page isn&apos;t on the programme.</h1>
        <p className="mt-4 max-w-md text-paper/75">The link may be old or mistyped. Head back to the home page to find spaces, packages and dates.</p>
        <ButtonLink href="/" variant="gold" className="mt-8">Go to the home page</ButtonLink>
      </div>
    </section>
  );
}
