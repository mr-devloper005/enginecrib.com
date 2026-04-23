import Link from "next/link";
import { Megaphone, BarChart3, Target, Layers } from "lucide-react";
import {
  EcMarketingPage,
  EcSectionCard,
  ecOutlineButtonClass,
  ecPrimaryButtonClass,
} from "@/components/marketing/ec-marketing-page";
import { SITE_CONFIG } from "@/lib/site-config";

const placements = [
  {
    icon: Target,
    title: "Category spotlight",
    body: "Own the narrative in a high-intent lane—brakes, tires, detailing, fleet, EV, and more—with a sponsored module adjacent to organic results.",
  },
  {
    icon: Layers,
    title: "Featured listings",
    body: "Elevate a verified shop with richer visuals, priority placement in relevant searches, and optional promotional copy reviewed by our team.",
  },
  {
    icon: Megaphone,
    title: "Brand stories",
    body: "Long-form partner features, case studies, and seasonal campaigns that sit alongside editorial content without mimicking unpaid articles.",
  },
  {
    icon: BarChart3,
    title: "Performance reporting",
    body: "Transparent delivery metrics: impressions, clicks, and downstream actions so you can align spend with real pipeline—not vanity counts.",
  },
];

const packages = [
  {
    name: "Launch",
    price: "From $899 / mo",
    bullets: ["Single metro or category focus", "Featured listing + basic reporting", "Quarterly creative refresh"],
  },
  {
    name: "Scale",
    price: "Custom",
    bullets: ["Multi-region or multi-category", "Category spotlight rotation", "Dedicated partner manager"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Let’s talk",
    bullets: ["OEM, insurer, or franchise programs", "APIs & co-branded landing pages", "Custom measurement frameworks"],
  },
];

export default function AdvertisePage() {
  return (
    <EcMarketingPage
      eyebrow="Advertise"
      title={`Put your brand in front of buyers who are already searching on ${SITE_CONFIG.name}.`}
      description="We pair premium inventory with strict relevance rules—so sponsor placements feel native, not noisy. Ideal for parts brands, shop groups, insurers, and national programs that need local precision."
      actions={
        <>
          <Link href="/listings" className={ecOutlineButtonClass}>
            See the directory
          </Link>
          <Link href="/contact" className={ecPrimaryButtonClass}>
            Request a media kit
          </Link>
        </>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {placements.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="flex gap-4 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-7"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#cfe3fc] bg-[#e7f1ff] text-[#0d4f9a]">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <EcSectionCard title="Brand safety" className="mt-12">
        <p>
          Sponsored units are labeled, frequency-capped, and excluded from misleading adjacencies. We decline categories
          that conflict with driver safety or platform trust. Creative is reviewed before flight to match our automotive
          audience and editorial tone.
        </p>
      </EcSectionCard>

      <div className="mt-14">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">Packages</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          Start with a focused pilot, then expand into additional markets or categories as performance proves out.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex flex-col rounded-[1.6rem] border p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${
                pkg.highlight
                  ? "border-[#0d4f9a]/35 bg-[linear-gradient(180deg,#e7f1ff_0%,#ffffff_45%)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d4f9a]">{pkg.name}</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">{pkg.price}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
                {pkg.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d4f9a]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`mt-8 ${pkg.highlight ? ecPrimaryButtonClass : ecOutlineButtonClass}`}>
                Plan a call
              </Link>
            </div>
          ))}
        </div>
      </div>
    </EcMarketingPage>
  );
}
