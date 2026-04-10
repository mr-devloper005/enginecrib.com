import { Building2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  { icon: Building2, title: 'Business onboarding', body: 'Add a new listing, refresh business details, or improve your category placement.' },
  { icon: ShieldCheck, title: 'Verification help', body: 'Need trust signals or profile updates? We can guide you through the listing requirements.' },
  { icon: MapPin, title: 'Location support', body: 'Request a city, service zone, or category path that better matches your business.' },
  { icon: Phone, title: 'Partnership questions', body: 'Talk to us about directory growth, featured placements, or affiliate opportunities.' },
] as const

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] p-8 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)] lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">Contact {SITE_CONFIG.name}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">A support page designed for a directory product</h2>
            <p className="mt-5 text-base leading-8 text-blue-50/90">
              Reach out for listing submissions, account help, verification, or directory partnerships. The UI now follows the same blue-and-white system as the rest of the site.
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
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Send a message</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">We will route your request to the right team</h2>
            <form className="mt-8 grid gap-5">
              <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white" placeholder="Your name" />
              <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white" placeholder="Email address" />
              <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white" placeholder="Tell us about your listing, business, or support request." />
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0d4f9a] px-6 text-sm font-semibold text-white hover:bg-[#0b407d]">
                <Mail className="h-4 w-4" />
                Send message
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
