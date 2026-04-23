import Link from "next/link";
import {
  EcMarketingPage,
  EcMutedLink,
  EcSectionCard,
  ecOutlineButtonClass,
  ecPrimaryButtonClass,
} from "@/components/marketing/ec-marketing-page";
import { SITE_CONFIG } from "@/lib/site-config";

const trustCommitments = [
  {
    title: "Verification mindset",
    body: "We review submissions for completeness and authenticity signals. That does not guarantee outcomes—always do your own diligence—but it keeps the directory closer to real operators than scraper dumps.",
  },
  {
    title: "Clear ownership",
    body: "You retain rights to content you upload. By publishing on the platform you grant us a license to host, display, and promote that content in connection with the service.",
  },
  {
    title: "Fair play",
    body: "Misleading categories, fake locations, review manipulation, and illegal activity are prohibited. We may remove content or suspend accounts that undermine trust.",
  },
];

export default function TermsPage() {
  return (
    <EcMarketingPage
      eyebrow="Trust & terms"
      title="The standards behind every listing—and the agreement that keeps the community healthy."
      description={`These terms apply to your use of ${SITE_CONFIG.name}. They work together with our privacy policy and listing guidelines to set expectations for businesses and visitors.`}
      actions={
        <>
          <Link href="/privacy" className={ecOutlineButtonClass}>
            Privacy policy
          </Link>
          <Link href="/contact" className={ecPrimaryButtonClass}>
            Report an issue
          </Link>
        </>
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Last updated: April 13, 2026</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {trustCommitments.map((item) => (
          <EcSectionCard key={item.title} title={item.title}>
            <p>{item.body}</p>
          </EcSectionCard>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <EcSectionCard title="Acceptable use">
          <ul className="list-inside list-disc space-y-2 marker:text-[#0d4f9a]">
            <li>No harassment, hate speech, or threats toward users or staff.</li>
            <li>No spam, malware, phishing, or attempts to scrape the site at scale without permission.</li>
            <li>No impersonation of another business or individual.</li>
            <li>Comply with applicable laws, including consumer protection and advertising rules in your region.</li>
          </ul>
        </EcSectionCard>
        <EcSectionCard title="Accounts & security">
          <p>
            You are responsible for safeguarding login credentials and for activity under your account. Notify us promptly
            through <EcMutedLink href="/contact">contact</EcMutedLink> if you suspect unauthorized access.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Listings & accuracy">
          <p>
            Business information should be current and truthful. Featured claims (certifications, warranties, specialties)
            should reflect what you can substantiate. We may edit formatting for consistency or request documentation for
            sensitive badges.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Disclaimers">
          <p>
            The directory is provided “as is.” We do not endorse any particular shop and are not liable for third-party
            services, pricing disputes, or workmanship. Use listings as a starting point and confirm details directly with
            the business.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Limitation of liability">
          <p>
            To the fullest extent permitted by law, {SITE_CONFIG.name} and its affiliates are not liable for indirect or
            consequential damages arising from your use of the platform. Our aggregate liability for claims relating to the
            service is limited to the greater of amounts you paid us in the prior twelve months or one hundred dollars.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Changes">
          <p>
            We may update these terms to reflect new features or legal requirements. Material changes will be highlighted
            on the site or via email where appropriate. Continued use after updates constitutes acceptance.
          </p>
        </EcSectionCard>
      </div>

      <EcSectionCard title="Questions" className="mt-8">
        <p>
          For trust, safety, or legal questions, reach out via our <EcMutedLink href="/contact">contact page</EcMutedLink>.
        </p>
      </EcSectionCard>
    </EcMarketingPage>
  );
}
