import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

/** Floating glass pill: most venue bookings in Lagos start on WhatsApp. */
export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Nikoms on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-ivory/15 bg-night/60 px-4 text-sm text-ivory shadow-lg backdrop-blur-xl transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-night/80 sm:px-5"
    >
      <span className="grid size-7 place-items-center rounded-full bg-[#25d366] text-night">
        <Icon name="whatsapp" width={16} height={16} />
      </span>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
