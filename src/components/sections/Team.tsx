import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/people";
import { site } from "@/content/site";

export function Team() {
  return (
    <section className="bg-chalk py-[var(--spacing-section)]" aria-labelledby="team-title">
      <div className="container-page">
        <SectionHeading id="team-title" title="Who you'll work with" lede="One team from your first viewing to the last guest out." />
        <RevealGroup as="li" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((m) => (
            <RevealItem as="li" key={m.role}>
              <article className="group">
                <div className="media-frame aspect-[3/4] rounded-[var(--radius-card)]">
                  <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="object-cover grayscale-[35%] transition-[filter] duration-500 group-hover:grayscale-0" />
                  {/* Contact actions: always visible on touch, fade up on hover for pointers */}
                  <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-[linear-gradient(180deg,transparent,rgb(40_16_42/0.8))] p-4 pt-12 transition-all duration-500 ease-out-soft md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                    <Contact href={`tel:${(m.phone ?? site.phone).replace(/\s/g, "")}`} label={`Call ${m.role}`} icon="phone" />
                    <Contact href={site.whatsapp} label={`WhatsApp ${m.role}`} icon="whatsapp" />
                    <Contact href={`mailto:${m.email ?? site.email}`} label={`Email ${m.role}`} icon="mail" />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-title">{m.role}</h3>
                <p className="mt-1 text-stone">{m.remit}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Contact({ href, label, icon }: { href: string; label: string; icon: "phone" | "whatsapp" | "mail" }) {
  return (
    <a href={href} aria-label={label} className="grid size-11 place-items-center rounded-full bg-paper text-plum-deep transition-colors hover:bg-gold">
      <Icon name={icon} />
    </a>
  );
}
