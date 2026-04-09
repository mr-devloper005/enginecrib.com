import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Businesses listed", value: "8.6k" },
  { label: "Category searches", value: "180k" },
  { label: "Local visitors served", value: "12k+" },
];

const values = [
  { title: "Reviewed for trust", description: "We focus on clearer business profiles and stronger listing quality." },
  { title: "Designed for discovery", description: "Visitors can browse categories, compare providers, and act quickly." },
  { title: "Built for local growth", description: "The platform helps businesses stay visible and easier to contact." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a business listing platform built for cleaner local discovery.`}
      actions={
        <>
          <Button
            variant="outline"
            className="h-11 rounded-full border-slate-300 bg-white px-5 text-slate-700 hover:bg-slate-50"
            asChild
          >
            <Link href="/listings">Browse Listings</Link>
          </Button>
          <Button
            className="h-11 rounded-full bg-[#0d4f9a] px-5 text-white shadow-[0_12px_24px_rgba(13,79,154,0.24)] hover:bg-[#0b4385]"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[1.8rem] border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
          <CardContent className="space-y-4 p-6">
            <Badge className="rounded-full bg-[#e7f1ff] px-3 py-1 text-[#0d4f9a] hover:bg-[#e7f1ff]">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-slate-950">
              A simpler way to discover trusted local businesses.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              {SITE_CONFIG.name} is focused on directory-style browsing so customers can search categories, compare services,
              and contact the right business without digging through cluttered pages.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border border-slate-200 bg-[#f8fbff] p-4">
                  <div className="text-2xl font-semibold text-slate-950">{item.value}</div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0d4f9a]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="rounded-[1.6rem] border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card
            key={member.id}
            className="rounded-[1.6rem] border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#0d4f9a]">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{member.bio}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
