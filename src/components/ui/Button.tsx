import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "solid" | "gold" | "outline" | "ghost-light";

const styles: Record<Variant, string> = {
  solid: "bg-plum text-paper hover:bg-plum-deep",
  gold: "bg-gold text-plum-deep hover:bg-gold-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "ghost-light": "border border-paper/40 text-paper hover:bg-paper hover:text-plum-deep",
};

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-[0.95rem] font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

type Common = { variant?: Variant; arrow?: boolean; children: ReactNode; className?: string };

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrowRight" className="transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-1" />}
    </>
  );
}

export function Button({ variant = "solid", arrow, children, className = "", ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({ variant = "solid", arrow, children, className = "", ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

/** Text link with an underline that draws in and an arrow that nudges. */
export function ArrowLink({ children, className = "", ...rest }: { children: ReactNode; className?: string } & ComponentProps<typeof Link>) {
  return (
    <Link className={`group/link inline-flex items-center gap-2 font-medium ${className}`} {...rest}>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-soft group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <Icon name="arrowRight" width={18} height={18} className="transition-transform duration-300 ease-out-soft group-hover/link:translate-x-1" />
    </Link>
  );
}
