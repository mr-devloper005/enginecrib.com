import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, CircleDollarSign, Heart, Mail, Plus, Search, Share2, Sparkles, Users } from 'lucide-react'
import { AuthAwareCreateLink } from '@/components/shared/auth-aware-create-link'
import { ContentImage } from '@/components/shared/content-image'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const quickActions = [
  { title: 'Add Your Website', description: 'Submit a new business listing', href: '/create/listing', icon: Plus },
  { title: 'Browse Categories', description: 'Explore services by category', href: '/listings', icon: Users },
  { title: 'Spread the Word', description: 'Share your listing with customers', href: '/contact', icon: Share2 },
  { title: 'Listing Support', description: 'Get help improving visibility', href: '/contact', icon: CircleDollarSign },
  { title: 'Support Local', description: 'Promote verified businesses', href: '/listings', icon: Heart },
  { title: 'Contact Us', description: 'Get help with your listing', href: '/contact', icon: Mail },
] as const

const categoryGroups = [
  { title: 'Auto Repair', subtitle: 'Garages & diagnostics', accent: 'bg-[#1f6ff2]', href: '/listings?category=auto-repair', icon: 'Wrench' },
  { title: 'Car Dealerships', subtitle: 'New & used vehicles', accent: 'bg-[#00a8e8]', href: '/listings?category=car-dealerships', icon: 'Car' },
  { title: 'Body Shops', subtitle: 'Collision & paint work', accent: 'bg-[#1f6ff2]', href: '/listings?category=body-shops', icon: 'Shield' },
  { title: 'Detailing', subtitle: 'Cleaning & protection', accent: 'bg-[#00a8e8]', href: '/listings?category=detailing', icon: 'Sparkles' },
  { title: 'Tires & Wheels', subtitle: 'Replacement & balancing', accent: 'bg-[#1f6ff2]', href: '/listings?category=tires', icon: 'Circle' },
  { title: 'Tow Services', subtitle: 'Emergency roadside support', accent: 'bg-[#00a8e8]', href: '/listings?category=towing', icon: 'Truck' },
  { title: 'Car Wash', subtitle: 'Exterior & interior care', accent: 'bg-[#1f6ff2]', href: '/listings?category=car-wash', icon: 'Droplets' },
  { title: 'Parts Suppliers', subtitle: 'OEM & aftermarket stock', accent: 'bg-[#00a8e8]', href: '/listings?category=parts', icon: 'Package' },
  { title: 'Wrap & Tint', subtitle: 'Styling and privacy films', accent: 'bg-[#1f6ff2]', href: '/listings?category=wrap-tint', icon: 'Palette' },
  { title: 'EV Services', subtitle: 'Charging & battery support', accent: 'bg-[#00a8e8]', href: '/listings?category=ev-services', icon: 'Zap' },
  { title: 'Fleet Services', subtitle: 'Commercial vehicle upkeep', accent: 'bg-[#1f6ff2]', href: '/listings?category=fleet', icon: 'Briefcase' },
  { title: 'Inspection', subtitle: 'Compliance & safety checks', accent: 'bg-[#00a8e8]', href: '/listings?category=inspection', icon: 'ClipboardCheck' },
] as const

const whyChoose = [
  {
    title: 'Human-Curated Quality',
    body: 'Every listing is reviewed for clarity, trust, and fit so visitors land on real local businesses instead of low-value clutter.',
    cta: 'Submit Your Website',
    href: '/create/listing',
    icon: BadgeCheck,
  },
  {
    title: 'Search Built for Listings',
    body: 'Category-first discovery, city-based browsing, and strong business metadata help visitors compare services quickly.',
    cta: 'Explore Categories',
    href: '/listings',
    icon: Search,
  },
  {
    title: 'Conversion-Focused Layout',
    body: 'The pages are tuned around listing trust, category discovery, and direct contact actions instead of filler sections.',
    cta: 'Contact Our Team',
    href: '/contact',
    icon: Users,
  },
] as const

const communityCards = [
  { title: 'Browse Listings', subtitle: 'See trusted businesses faster', href: '/listings', icon: Users },
  { title: 'Support Businesses', subtitle: 'Help trusted local services grow', href: '/listings', icon: Heart },
  { title: 'Spread the Word', subtitle: 'Promote a company you trust', href: '/contact', icon: Share2 },
  { title: 'Talk to Us', subtitle: 'Get listing guidance and support', href: '/contact', icon: CircleDollarSign },
] as const

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as Record<string, unknown>).images)
    ? (((post.content as Record<string, unknown>).images as unknown[]).find((url) => typeof url === 'string' && url) as string | undefined)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as Record<string, unknown>).logo === 'string'
    ? (post.content as Record<string, unknown>).logo as string
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getListingMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { category: 'Featured listing', location: 'Local market' }
  const content = post.content as Record<string, unknown>
  return {
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : 'Featured listing',
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : 'Local market',
  }
}

function SearchBar() {
  return (
    <form action="/search" className="mx-auto w-full max-w-3xl">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <Search className="h-5 w-5 text-[#0d4f9a]" />
        <input
          type="search"
          name="q"
          placeholder="Find a category, service, or business..."
          className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0d4f9a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b407d]"
        >
          Search
        </button>
      </div>
    </form>
  )
}

function QuickActionCard({
  title,
  description,
  Icon,
}: {
  title: string
  description: string
  Icon: typeof Plus
}) {
  return (
    <>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#0d4f9a] transition group-hover:bg-[#0d4f9a] group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </>
  )
}

export async function HomePageOverride() {
  const listingPosts = await fetchTaskPosts('listing', 6, { allowMockFallback: true, fresh: true })

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main>
        <section className="px-4 pb-14 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(12,66,144,0.18)] sm:px-10 lg:px-14 lg:py-14">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Listing-first growth platform
                  </span>
                  <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                    Grow your business visibility with a cleaner local directory experience.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50/90">
                    {SITE_CONFIG.name} helps customers discover trusted businesses, compare services, and contact the right company faster.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <AuthAwareCreateLink
                      className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0d4f9a] transition hover:bg-blue-50"
                      loggedInLabel="Add Listing"
                      loggedOutLabel="Login to Add Listing"
                    />
                    <Link href="/listings" className="inline-flex items-center justify-center rounded-xl border border-white/24 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/16">
                      Upgrade Your Listing
                    </Link>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ['50,000+', 'active category paths'],
                      ['24/7', 'search-ready access'],
                      ['Verified', 'business details'],
                      ['Fast', 'listing submissions'],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-[1.25rem] border border-white/12 bg-white/10 p-4">
                        <p className="text-2xl font-semibold">{value}</p>
                        <p className="mt-1 text-sm text-blue-50/80">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SearchBar />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
              {quickActions.map((item) =>
                item.title === 'Add Your Website' ? (
                    <AuthAwareCreateLink
                      key={item.title}
                      className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[#0d4f9a]/25 hover:shadow-[0_18px_40px_rgba(13,79,154,0.12)]"
                      loggedInLabel={<QuickActionCard title={item.title} description={item.description} Icon={item.icon} />}
                      loggedOutLabel={<QuickActionCard title={item.title} description={item.description} Icon={item.icon} />}
                    />
                  ) : (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[#0d4f9a]/25 hover:shadow-[0_18px_40px_rgba(13,79,154,0.12)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#0d4f9a] transition group-hover:bg-[#0d4f9a] group-hover:text-white">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                    </Link>
                  )
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#0d4f9a]">Explore Categories</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Browse automotive services with less friction</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">Directory-style browsing, clear category names, and card layouts inspired by your references.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryGroups.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(15,23,42,0.08)]"
                >
                  <span className={`absolute left-8 top-0 h-1.5 w-16 rounded-full ${item.accent}`} />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                    {item.icon === 'Wrench' ? '🔧' : item.icon === 'Car' ? '🚗' : item.icon === 'Shield' ? '🛡️' : item.icon === 'Sparkles' ? '✨' : item.icon === 'Circle' ? '🛞' : item.icon === 'Truck' ? '🚚' : item.icon === 'Droplets' ? '💧' : item.icon === 'Package' ? '📦' : item.icon === 'Palette' ? '🎨' : item.icon === 'Zap' ? '⚡' : item.icon === 'Briefcase' ? '🧰' : '📋'}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f9a]">
                    Open category
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#0d4f9a]">Why Choose {SITE_CONFIG.name}?</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Built for business listing trust and faster local discovery</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-500">The design is intentionally cleaner, more directory-like, and focused on actions people actually take on listing websites.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {whyChoose.map((item) => (
                <div key={item.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0d4f9a] text-white">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-500">{item.body}</p>
                  {item.title === 'Human-Curated Quality' ? (
                    <AuthAwareCreateLink
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f9a]"
                      loggedInLabel={<><span>Submit Your Website</span><ArrowRight className="h-4 w-4" /></>}
                      loggedOutLabel={<><span>Login to Submit</span><ArrowRight className="h-4 w-4" /></>}
                    />
                  ) : (
                    <Link href={item.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f9a]">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)] sm:px-10 lg:px-14">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-100">Get Involved</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Discover more ways to connect and contribute</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50/85">Use the directory not just to browse, but to submit, support, and promote trusted automotive businesses.</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {communityCards.map((item) => (
                <Link key={item.title} href={item.href} className="rounded-[1.6rem] border border-white/12 bg-white/12 p-6 text-center backdrop-blur-sm transition hover:bg-white/18">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/16">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-blue-50/80">{item.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#0d4f9a]">Featured Listings</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Businesses people can actually act on</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-500">Cards are tuned for a listing site: category, location, brand image, and a direct path into the detail page.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {listingPosts.slice(0, 3).map((post) => {
                const meta = getListingMeta(post)
                return (
                  <Link key={post.id} href={`/listings/${post.slug}`} className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_26px_46px_rgba(15,23,42,0.08)]">
                    <div className="relative h-56 overflow-hidden">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0d4f9a]">
                          {meta.category}
                        </span>
                        <span className="text-xs font-medium text-slate-400">{meta.location}</span>
                      </div>
                      <h3 className="mt-4 line-clamp-2 text-2xl font-semibold">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{post.summary || 'Verified local business listing with clearer details and a stronger action path.'}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f9a]">
                        View listing
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
