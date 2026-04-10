import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  { title: "Account Usage", body: "Keep your account secure and follow community guidelines." },
  {
    title: "Content Ownership",
    body: "You own the content you publish and grant the platform a license to display it.",
  },
  { title: "Acceptable Use", body: "No spam, harassment, or illegal content." },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules and guidelines for using ${SITE_CONFIG.name}.`}
    >
      <Card className="rounded-[1.8rem] border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <CardContent className="space-y-4 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Last updated: March 16, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.2rem] border border-slate-200 bg-[#f8fbff] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d4f9a]">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
