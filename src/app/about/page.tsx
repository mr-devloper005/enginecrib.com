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

    </EcMarketingPage>
  );
}
