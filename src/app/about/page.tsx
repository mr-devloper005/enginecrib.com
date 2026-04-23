import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EcMarketingPage,
  EcSectionCard,
  EcStat,
  ecOutlineButtonClass,
  ecPrimaryButtonClass,
} from "@/components/marketing/ec-marketing-page";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const pillars = [
  {
    title: "Precision in every listing",
    body: "We treat each garage, mobile tech, and specialty shop as a serious operation—not a placeholder card. Structured fields, honest service lines, and clear geography help drivers choose with confidence.",
  },
  {
    title: "Built for how people actually search",
    body: "Category-first browsing, fast filters, and scannable cards mean visitors spend less time hunting and more time booking. The interface stays quiet so your business stays loud.",
  },
  {
    title: "Trust as a product decision",
    body: "Verification cues, consistent review of submissions, and transparent policies are part of the roadmap—not an afterthought. We grow the directory without diluting quality.",
  },
];

const milestones = [
  { year: "2023", text: "Launched focused pilots with independent shops and regional chains." },
  { year: "2024", text: "Expanded category coverage across repair, detailing, fleet, and EV-adjacent services." },
  { year: "2025–26", text: "Doubled down on listing quality, partner tools, and clearer trust signals site-wide." },
];

export default function AboutPage() {
  return (
    <EcMarketingPage
      eyebrow="About us"
      title={`${SITE_CONFIG.name} is the directory built for serious automotive service businesses.`}
      description="We connect drivers and fleet managers with vetted local operators—repair, diagnostics, detailing, tires, and more—through a premium, low-noise discovery experience."
      actions={
        <>
          <Link href="/listings" className={ecOutlineButtonClass}>
            Browse listings
          </Link>
          <Link href="/contact" className={ecPrimaryButtonClass}>
            Talk to our team
          </Link>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <EcStat value="8.6k+" label="Active business profiles" />
        <EcStat value="180k+" label="Category-led searches" />
        <EcStat value="12k+" label="Cities & zones covered" />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <EcSectionCard key={p.title} title={p.title}>
            <p>{p.body}</p>
          </EcSectionCard>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <EcSectionCard title="Our story">
          <p>
            {SITE_CONFIG.name} started from a simple frustration: great shops were invisible online, buried under generic maps
            results and thin directory pages. We set out to build a surface that respects craft—whether you are rebuilding
            engines, calibrating ADAS, or running a high-volume detail bay.
          </p>
          <p className="mt-4">
            Today we partner with operators who want clarity, not clutter. Listings are designed to explain what you do,
            where you do it, and why customers should trust you—without forcing a novel-length bio.
          </p>
        </EcSectionCard>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="flex gap-5 rounded-[1.2rem] border border-slate-200 bg-[#f8fbff] px-5 py-4 sm:px-6 sm:py-5"
            >
              <span className="shrink-0 text-sm font-semibold tracking-wide text-[#0d4f9a]">{m.year}</span>
              <p className="text-sm leading-7 text-slate-600">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">People behind the platform</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">Team & editorial</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
            Product, partnerships, and listing quality are owned by a small crew obsessed with automotive operations and
            great UX.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <div
              key={member.id}
              className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 border border-slate-200">
                  <AvatarImage src={member.avatar} alt="" />
                  <AvatarFallback className="bg-slate-100 text-slate-700">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-950">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#0d4f9a]">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </EcMarketingPage>
  );
}
