'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'

export const FOOTER_OVERRIDE_ENABLED = true

const footerLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Trust', href: '/terms' },
] as const

const categoryLinks = [
  'Auto Repair',
  'Car Wash',
  'Tire Shops',
  'Detailing',
  'Tow Services',
  'Body Shops',
  'Engine Diagnostics',
  'Fleet Services',
  'EV Support',
  'Wrap & Tint',
] as const

export function FooterOverride() {
  const { isAuthenticated } = useAuth()
  const links = isAuthenticated ? footerLinks : [...footerLinks, { label: 'Login', href: '/login' as const }]

  return (
    <footer className="mt-0">
      <section className="bg-[#0d3870] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-100">Popular Categories</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {categoryLinks.map((item) => (
              <Link
                key={item}
                href={`/listings?category=${encodeURIComponent(item.toLowerCase())}`}
                className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 transition hover:bg-white/16"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#b53030] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3 text-sm leading-7 text-red-50">
            <p className="text-2xl font-semibold text-white">{SITE_CONFIG.name}</p>
            <p>Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
            <p>Business directory for garages, workshops, detailing experts, and automotive service providers.</p>
            <p>Built to help visitors discover trustworthy local businesses through cleaner listings and category-led browsing.</p>
          </div>
          <div className="flex flex-wrap content-start gap-x-5 gap-y-3 text-sm font-medium text-red-50 lg:justify-end">
            {links.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </footer>
  )
}
