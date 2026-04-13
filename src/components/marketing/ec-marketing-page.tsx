import type { ReactNode } from "react";
import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

/** Light directory shell — matches the original `PageShell` palette (no dark hero / grid / logo tile). */
export function EcMarketingPage({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main>
        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ff_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">{eyebrow}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h1>
                <p className="mt-3 max-w-2xl text-slate-500">{description}</p>
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  );
}

export function EcMutedLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`font-medium text-[#0d4f9a] underline decoration-[#0d4f9a]/35 underline-offset-4 transition hover:text-[#0b4385] hover:decoration-[#0b4385]/45 ${className}`}
    >
      {children}
    </Link>
  );
}

export function EcSectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8 ${className}`}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d4f9a]">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-slate-600">{children}</div>
    </section>
  );
}

export function EcStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[1.2rem] border border-slate-200 bg-[#f8fbff] p-4 text-center">
      <div className="text-2xl font-semibold text-slate-950">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#0d4f9a]">{label}</div>
    </div>
  );
}

export const ecPrimaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-full bg-[#0d4f9a] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(13,79,154,0.24)] transition hover:bg-[#0b4385]";

export const ecOutlineButtonClass =
  "inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
