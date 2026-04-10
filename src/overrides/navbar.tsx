'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, ChevronLeft, ChevronRight, Menu, Plus, Search, X } from 'lucide-react'
import { AuthAwareCreateLink } from '@/components/shared/auth-aware-create-link'
import { Button } from '@/components/ui/button'
import { NavbarAuthControls } from '@/components/shared/navbar-auth-controls'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const primaryLinks = [
  { label: 'Listings', href: '/listings' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export function NavbarOverride() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [isSidebarCompact, setIsSidebarCompact] = useState(false)

  useEffect(() => {
    const savedPreference = window.localStorage.getItem('enginecrib.sidebar.compact')
    if (savedPreference === 'true') {
      setIsSidebarCompact(true)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('enginecrib.sidebar.compact', String(isSidebarCompact))
  }, [isSidebarCompact])

  useEffect(() => {
    document.body.dataset.sidebarCompact = isSidebarCompact ? 'true' : 'false'

    return () => {
      delete document.body.dataset.sidebarCompact
    }
  }, [isSidebarCompact])

  return (
    <>
      <header data-mobile-nav="true" className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d4f9a] text-white shadow-[0_14px_28px_rgba(13,79,154,0.18)]">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-lg font-semibold text-slate-950">{SITE_CONFIG.name}</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.22em] text-slate-500">Trusted business directory</span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
              <Search className="h-4 w-4 text-[#0d4f9a]" />
              Search businesses, categories, or cities
            </div>
            {primaryLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  pathname.startsWith(item.href) ? 'bg-[#edf5ff] text-[#0d4f9a]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <NavbarAuthControls compact />
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden rounded-full text-slate-600 hover:bg-slate-100 lg:inline-flex">
                  <Link href="/login">Login</Link>
                </Button>
                <AuthAwareCreateLink
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d4f9a] px-5 py-2 text-sm font-medium text-white hover:bg-[#0b407d]"
                  loggedInLabel={<><Plus className="h-4 w-4" />Add Listing</>}
                  loggedOutLabel={<><Plus className="h-4 w-4" />Login to Add Listing</>}
                />
              </>
            )}
            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen((value) => !value)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Search className="h-4 w-4 text-[#0d4f9a]" />
              Find a business or service
            </div>
            <div className="mt-4 grid gap-2">
              {primaryLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm font-semibold transition',
                    pathname.startsWith(item.href) ? 'bg-[#edf5ff] text-[#0d4f9a]' : 'border border-slate-200 bg-white text-slate-700',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {!isAuthenticated ? (
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  Login
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      <div className="pointer-events-none fixed right-6 top-5 z-[60] hidden xl:block">
        <div className="pointer-events-auto">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/92 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <Button variant="outline" asChild className="rounded-full border-slate-200 bg-white">
                <Link href="/login">Login</Link>
              </Button>
              <AuthAwareCreateLink
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d4f9a] px-4 py-2 text-sm font-medium text-white hover:bg-[#0b407d]"
                loggedInLabel={<><Plus className="h-4 w-4" />Add Listing</>}
                loggedOutLabel={<><Plus className="h-4 w-4" />Login to Add Listing</>}
              />
            </div>
          )}
        </div>
      </div>

      <aside
        className={cn(
          'hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:flex xl:flex-col xl:overflow-y-auto xl:border-r xl:border-slate-200 xl:bg-white xl:py-7 xl:transition-all xl:duration-300',
          isSidebarCompact ? 'xl:w-24 xl:px-3' : 'xl:w-80 xl:px-6',
        )}
      >
        <div className="flex min-h-full flex-col">
          <div className={cn('flex flex-col', isSidebarCompact ? 'items-center' : 'items-stretch')}>
            <div className={cn('flex items-center gap-3', isSidebarCompact && 'justify-center')}>
              <Link href="/" className={cn('flex items-center gap-3', isSidebarCompact && 'justify-center')}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d4f9a] text-white shadow-[0_14px_28px_rgba(13,79,154,0.18)]">
                  <Building2 className="h-6 w-6" />
                </div>
                {!isSidebarCompact ? (
                  <div className="min-w-0">
                    <span className="block truncate text-xl font-semibold text-slate-950">{SITE_CONFIG.name}</span>
                    <span className="block truncate text-[10px] uppercase tracking-[0.24em] text-slate-500">Trusted business directory</span>
                  </div>
                ) : null}
              </Link>
            </div>

            {!isSidebarCompact ? (
              <div className="mt-4 flex justify-start">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-slate-600 shadow-sm hover:bg-white"
                  onClick={() => setIsSidebarCompact(true)}
                  aria-label="Compact sidebar"
                  title="Compact sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Compact
                </Button>
              </div>
            ) : null}
          </div>

          {isSidebarCompact ? (
            <Button
              type="button"
              variant="ghost"
              className="mt-6 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-0 text-slate-600 hover:bg-slate-100"
              onClick={() => setIsSidebarCompact(false)}
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : null}

          {!isSidebarCompact ? (
            <form action="/search" className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <label htmlFor="sidebar-quick-find" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Search className="h-4 w-4 text-[#0d4f9a]" />
                Quick Find
              </label>
              <p className="mt-2 text-sm leading-6 text-slate-500">Search by category, city, or service type to surface the best listing matches faster.</p>
              <input
                id="sidebar-quick-find"
                name="q"
                type="search"
                placeholder="Search businesses or services"
                className="mt-4 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#0d4f9a]"
              />
              <Button type="submit" className="mt-3 w-full rounded-full bg-[#0d4f9a] text-white hover:bg-[#0b407d]">
                Search
              </Button>
            </form>
          ) : (
            <form action="/search" className="mt-6">
              <Button
                type="submit"
                variant="ghost"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-0 text-slate-600 hover:bg-slate-100"
                aria-label="Search listings"
                title="Search listings"
              >
                <Search className="h-4 w-4 text-[#0d4f9a]" />
              </Button>
            </form>
          )}

          <nav className="mt-8 space-y-2">
            {primaryLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                className={cn(
                  'flex items-center rounded-2xl text-sm font-semibold transition',
                  isSidebarCompact ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3',
                  pathname.startsWith(item.href) ? 'bg-[#0d4f9a] text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-[#0d4f9a]/20 hover:bg-[#f7fbff]',
                )}
              >
                {isSidebarCompact ? item.label.charAt(0) : item.label}
              </Link>
            ))}
          </nav>

          {!isSidebarCompact ? (
            <div className="mt-8 rounded-[1.6rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">For Businesses</p>
              <h3 className="mt-3 text-xl font-semibold">Create a stronger listing presence</h3>
              <p className="mt-2 text-sm leading-7 text-blue-50/85">Add your business, highlight services, and stay discoverable across directory searches.</p>
              <AuthAwareCreateLink
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0d4f9a] hover:bg-blue-50"
                loggedInLabel={<><Plus className="h-4 w-4" />Add Listing</>}
                loggedOutLabel={<><Plus className="h-4 w-4" />Login to Add Listing</>}
              />
            </div>
          ) : (
            <AuthAwareCreateLink
              title="Add Listing"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#0d4f9a] text-white hover:bg-[#0b407d]"
              loggedInLabel={<Plus className="h-4 w-4" />}
              loggedOutLabel={<Plus className="h-4 w-4" />}
            />
          )}

          <div className="mt-auto pt-8" />
        </div>
      </aside>
    </>
  )
}
