import Link from "next/link";
import {
  EcMarketingPage,
  EcMutedLink,
  EcSectionCard,
  ecOutlineButtonClass,
} from "@/components/marketing/ec-marketing-page";
import { SITE_CONFIG } from "@/lib/site-config";

export default function PrivacyPage() {
  return (
    <EcMarketingPage
      eyebrow="Privacy policy"
      title="How we collect, use, and protect your information."
      description="This policy explains what data we handle when you use the site, create an account, submit a listing, or interact with our forms—and the choices you have at every step."
      actions={
        <Link href="/contact" className={ecOutlineButtonClass}>
          Privacy questions
        </Link>
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Last updated: April 13, 2026</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <EcSectionCard title="Summary">
          <p>
            {SITE_CONFIG.name} processes personal data only to operate the directory, secure accounts, improve discovery,
            and communicate with you when you opt in. We do not sell your personal information. Where we rely on partners
            (e.g. hosting or analytics), we choose vendors with strong security practices and limit data to what they need
            to perform their role.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Information we collect">
          <ul className="list-inside list-disc space-y-2 marker:text-[#0d4f9a]">
            <li>Account details such as name, email, and authentication identifiers when you register.</li>
            <li>Business and listing content you submit—descriptions, categories, media, and contact channels you choose to publish.</li>
            <li>Usage signals like pages viewed, search queries, device type, and approximate region (via standard logs).</li>
            <li>Support messages and form submissions you send to our team.</li>
          </ul>
        </EcSectionCard>
        <EcSectionCard title="How we use information">
          <ul className="list-inside list-disc space-y-2 marker:text-[#0d4f9a]">
            <li>Provide core features: profiles, listings, saved items, and authenticated dashboards.</li>
            <li>Maintain safety, prevent abuse, and enforce our terms.</li>
            <li>Measure performance, fix bugs, and improve ranking and relevance in search.</li>
            <li>Send transactional emails (verification, security alerts) and optional product updates if you subscribe.</li>
          </ul>
        </EcSectionCard>
        <EcSectionCard title="Cookies & similar tech">
          <p>
            We use cookies and local storage where necessary for sessions, preferences, and fraud prevention. Optional
            analytics cookies may help us understand aggregate traffic. You can control cookies through your browser; some
            features may not work if strict blocking is enabled.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Sharing">
          <p>
            We share data with service providers under confidentiality terms, when required by law, or to protect rights and
            safety. Public listing fields are visible as designed when you publish a profile or business page.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Retention">
          <p>
            We keep information as long as your account is active or as needed to operate the service. After deletion
            requests, we remove or anonymize personal data within a reasonable period, except where law requires longer
            retention.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Your rights">
          <p>
            Depending on where you live, you may request access, correction, export, or deletion of personal data we hold.
            Contact us through <EcMutedLink href="/contact">the contact page</EcMutedLink> and we will verify your request
            before acting.
          </p>
        </EcSectionCard>
        <EcSectionCard title="Children">
          <p>
            The platform is not directed at children under 16. If you believe a minor has provided personal data, please
            reach out so we can remove it promptly.
          </p>
        </EcSectionCard>
      </div>

      <EcSectionCard title="Contact" className="mt-8">
        <p>
          For privacy-specific requests, email the address listed on our <EcMutedLink href="/contact">contact page</EcMutedLink>{" "}
          with “Privacy” in the subject line. We aim to respond within a few business days.
        </p>
      </EcSectionCard>
    </EcMarketingPage>
  );
}
