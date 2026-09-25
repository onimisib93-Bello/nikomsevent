import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Icon } from "@/components/ui/Icon";
import { occasions } from "@/content/occasions";
import { site } from "@/content/site";
import { spaces } from "@/content/spaces";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-plum-deep text-paper">
      <div className="container-page grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <p className="font-display text-5xl leading-none">Nikoms</p>
          <p className="mt-3 max-w-xs text-paper/70">{site.description}</p>
          <div className="mt-8 flex gap-3">
            <Social href={site.socials.instagram} label="Nikoms on Instagram" icon="instagram" />
            <Social href={site.socials.facebook} label="Nikoms on Facebook" icon="facebook" />
            <Social href={site.whatsapp} label="Message Nikoms on WhatsApp" icon="whatsapp" />
          </div>
        </div>

        <FooterList title="Spaces" links={spaces.map((s) => ({ label: s.name, href: `/spaces/${s.slug}` }))} />
        <FooterList title="Occasions" links={occasions.map((o) => ({ label: o.label, href: `/?occasion=${o.id}#plan` }))} />

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-4 text-sm text-paper/55">Visit</h2>
            <address className="not-italic leading-relaxed">
              <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="hover:text-gold-soft">
                {site.address.line1}<br />{site.address.line2}
              </a>
              <br />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold-soft">{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-gold-soft">{site.email}</a>
            </address>
            <p className="mt-3 text-sm text-paper/55">{site.hours}</p>
          </div>
          <NewsletterForm label="Open dates, monthly" cta="Join" />
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}</p>
          <nav aria-label="Nikoms brands">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.brands.map((b) => (
                <li key={b.name}>
                  <Link href={b.href} className="hover:text-paper">{b.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 text-sm text-paper/55">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-gold-soft">{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: "instagram" | "facebook" | "whatsapp" }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-paper/25 transition-[transform,background-color,color] duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:text-plum-deep">
      <Icon name={icon} />
    </a>
  );
}
