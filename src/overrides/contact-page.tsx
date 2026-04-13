import Link from "next/link";
import { Building2, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  EcMarketingPage,
  EcSectionCard,
  ecPrimaryButtonClass,
} from "@/components/marketing/ec-marketing-page";
import { SITE_CONFIG } from "@/lib/site-config";

export const CONTACT_PAGE_OVERRIDE_ENABLED = true;

const lanes = [
  {
    icon: Building2,
    title: "Listings & onboarding",
    body: "New shop setup, category changes, media uploads, and help structuring services so customers understand what you offer at a glance.",
  },
  {
    icon: ShieldCheck,
    title: "Verification & trust",
    body: "Badges, proof of operation, and profile cleanup—we walk you through what we need and why it matters for discovery.",
  },
  {
    icon: MapPin,
    title: "Coverage & categories",
    body: "Request a new city, service lane, or taxonomy tweak when your market does not map cleanly to today’s filters.",
  },
  {
    icon: Phone,
    title: "Partnerships & ads",
    body: "Featured placements, sponsored categories, and co-marketing—see our advertise page for formats, then loop us in on goals and budget.",
  },
] as const;

export function ContactPageOverride() {
  return (
    <EcMarketingPage
      eyebrow="Contact us"
      title={`Reach ${SITE_CONFIG.name} for listings, verification, and partnerships.`}
      description="Use the form for the fastest first response. For legal or privacy topics, mention that in the topic line."
      actions={
        <span className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="h-4 w-4 text-[#0d4f9a]" aria-hidden />
          Typical reply within 1–2 business days
        </span>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] p-8 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">How we can help</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Built for directory operators</h2>
          <p className="mt-5 text-base leading-8 text-blue-50/90">
            Tell us whether you are fixing a listing, expanding coverage, or exploring ads—we route each request to the
            right lane.
          </p>
          <div className="mt-8 grid gap-4">
            {lanes.map((lane) => (
              <div key={lane.title} className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5">
                <lane.icon className="h-5 w-5" />
                <h3 className="mt-3 text-xl font-semibold">{lane.title}</h3>
                <p className="mt-2 text-sm leading-7 text-blue-50/85">{lane.body}</p>
              </div>
            ))}
          </div>
          <EcSectionCard title="Before you write" className="mt-6 border-white/20 bg-white/95 text-slate-950 shadow-none">
            <p className="text-slate-600">
              Include your business name, city, and a listing link if you have one. For advertising, see{" "}
              <Link
                href="/advertise"
                className="font-medium text-[#0d4f9a] underline decoration-[#0d4f9a]/35 underline-offset-4 hover:text-[#0b4385]"
              >
                Advertise
              </Link>{" "}
              first so we can move faster.
            </p>
          </EcSectionCard>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Send a message</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">We read every submission</h2>
          <form className="mt-8 grid gap-5">
            <input
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white"
              placeholder="Your name"
              name="name"
              autoComplete="name"
            />
            <input
              type="email"
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white"
              placeholder="Email address"
              name="email"
              autoComplete="email"
            />
            <input
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white"
              placeholder="Topic (listing, partnership, press…)"
              name="topic"
            />
            <textarea
              className="min-h-[180px] rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white"
              placeholder="Context, links, timelines—anything that helps us respond with a concrete next step."
              name="message"
            />
            <button type="submit" className={`${ecPrimaryButtonClass} w-full sm:w-auto`}>
              <Mail className="mr-2 inline h-4 w-4 align-text-bottom" aria-hidden />
              Send message
            </button>
            <p className="text-xs leading-6 text-slate-500">
              For urgent safety concerns about a listing, include “Safety” in the topic field.
            </p>
          </form>
        </section>
      </div>
    </EcMarketingPage>
  );
}
