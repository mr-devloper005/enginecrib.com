import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Star, Clock, CheckCircle } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { getDirectoryUiPreset } from '@/design/directory-ui'
import { notFound } from 'next/navigation'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG } from '@/lib/site-config'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const taskConfig = getTaskConfig(task)
  let post: SitePost | null = null
  try {
    post = await fetchTaskPostBySlug(task, slug)
  } catch (error) {
    console.warn("Failed to load post detail", error)
  }

  if (!post) {
    notFound()
  }

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const category = (content.category as string) || post.tags?.[0] || taskConfig?.label || task
  const description = (content.description as string) || post.summary || "Details coming soon."
  const location = (content.address as string) || (content.location as string) || ''
  const website = (content.website as string) || ''
  const phone = (content.phone as string) || ''
  const email = (content.email as string) || ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => typeof url === 'string' && (url.startsWith('/') || /^https?:\/\//i.test(url)))
  const contentImages = Array.isArray(content.images)
    ? (content.images as string[]).filter((url): url is string => typeof url === 'string' && (url.startsWith('/') || /^https?:\/\//i.test(url)))
    : []
  const images = [...mediaImages, ...contentImages]
  const logo = (content.logo as string) || ''
  const finalImages = images.length ? images : (logo && (logo.startsWith('/') || /^https?:\/\//i.test(logo)) ? [logo] : ['/placeholder.svg?height=900&width=1400'])

  const toNumber = (value?: number | string) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const parsed = Number(value)
      return Number.isFinite(parsed) ? parsed : null
    }
    return null
  }

  const buildMapEmbedUrl = (latitude?: number | string, longitude?: number | string, address?: string) => {
    const lat = toNumber(latitude)
    const lon = toNumber(longitude)
    const normalizedAddress = typeof address === 'string' ? address.trim() : ''
    const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim()

    if (googleMapsEmbedApiKey) {
      const query = lat !== null && lon !== null ? `${lat},${lon}` : normalizedAddress
      if (!query) return null
      return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(googleMapsEmbedApiKey)}&q=${encodeURIComponent(query)}`
    }

    if (lat !== null && lon !== null) {
      const delta = 0.01
      const left = lon - delta
      const right = lon + delta
      const bottom = lat - delta
      const top = lat + delta
      const bbox = `${left},${bottom},${right},${top}`
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`
    }

    if (normalizedAddress) {
      return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`
    }

    return null
  }

  const mapEmbedUrl = buildMapEmbedUrl(content.latitude as number | string | undefined, content.longitude as number | string | undefined, location)

  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!content.category) return true
      const itemContent = item.content && typeof item.content === 'object' ? (item.content as Record<string, unknown>) : {}
      return itemContent.category === content.category
    })
    .slice(0, 3)

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)

  if (productKind === 'directory' && (task === 'listing' || task === 'classified' || task === 'profile')) {
    return (
      <div className="min-h-screen bg-[#f8fbff]">
        <NavbarShell />
        <DirectoryTaskDetailPageOverride
          task={task}
          taskLabel={taskConfig?.label || task}
          taskRoute={taskConfig?.route || '/'}
          post={post}
          description={description}
          category={category}
          images={finalImages}
          mapEmbedUrl={mapEmbedUrl}
          related={related}
        />
        <Footer />
      </div>
    )
  }

  return null
}

export function DirectoryTaskDetailPageOverride({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const ui = getDirectoryUiPreset()
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }
  const stats = [category || taskLabel, location ? 'Mapped' : 'Directory', website ? 'Website' : 'Profile']

  return (
    <div className={`min-h-screen ${ui.shell}`}>
      <SchemaJsonLd data={schemaPayload} />
      <main className="pb-16">
        {/* Enhanced Hero Section */}
        <section className={`${ui.detailHero}`}>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm font-semibold opacity-85 transition hover:opacity-100">
              <ArrowLeft className="h-4 w-4" />
              Back to {taskLabel}
            </Link>
            
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.chip}`}>
                      <ShieldCheck className="h-4 w-4" />
                      {ui.label}
                    </span>
                    {category && (
                      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.chip}`}>
                        <Tag className="h-3.5 w-3.5" />
                        {category}
                      </span>
                    )}
                  </div>
                  <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
                  {location && (
                    <div className="flex items-center gap-2 text-lg opacity-85">
                      <MapPin className="h-5 w-5" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>

                {/* Quick Stats Bar */}
                <div className="flex flex-wrap gap-3">
                  {stats.map((item) => (
                    <div key={item} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${ui.detailPanel}`}>
                      <CheckCircle className="h-4 w-4" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${ui.primaryButton}`}
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className={`inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold ${ui.chip}`}
                    >
                      <Phone className="h-4 w-4" />
                      {phone}
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className={`inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold ${ui.chip}`}
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </a>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/16 bg-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.22)] lg:sticky lg:top-8">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    +{images.length - 1} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Image Gallery */}
        {images.length > 1 ? (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" />
              <p className={`text-sm font-semibold ${ui.title}`}>Gallery</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.slice(1, 5).map((image, idx) => (
                <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-transform hover:scale-[1.02]">
                  <ContentImage src={image} alt={`${post.title} photo ${idx + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Main Content Grid */}
        <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          {/* Left Column - Description & Highlights */}
          <div className="space-y-8">
            <article className={`rounded-3xl p-8 ${ui.detailPanel}`}>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-5 w-5" />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>About</p>
              </div>
              <h2 className={`text-3xl font-semibold ${ui.title}`}>Overview</h2>
              <p className={`mt-6 text-base leading-8 ${ui.muted}`}>{description}</p>
            </article>

            {highlights.length ? (
              <article className={`rounded-3xl p-8 ${ui.detailPanel}`}>
                <div className="flex items-center gap-3 mb-6">
                  <Star className="h-5 w-5" />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Features</p>
                </div>
                <h2 className={`text-3xl font-semibold ${ui.title}`}>Highlights</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 8).map((item) => (
                    <div key={item} className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm ${ui.chip}`}>
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>

          {/* Right Column - Contact & Map */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Contact Card */}
            <div className={`rounded-3xl p-6 ${ui.detailAside}`}>
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-5 w-5" />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Contact Info</p>
              </div>
              <div className="space-y-4">
                {location && (
                  <div className={`rounded-xl px-4 py-3 ${ui.chip}`}>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      <span className="text-sm">{location}</span>
                    </div>
                  </div>
                )}
                {phone && (
                  <div className={`rounded-xl px-4 py-3 ${ui.chip}`}>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0" />
                      <a href={`tel:${phone}`} className="text-sm font-semibold hover:underline">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}
                {email && (
                  <div className={`rounded-xl px-4 py-3 ${ui.chip}`}>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0" />
                      <a href={`mailto:${email}`} className="text-sm font-semibold hover:underline">
                        {email}
                      </a>
                    </div>
                  </div>
                )}
                {website && (
                  <div className={`rounded-xl px-4 py-3 ${ui.chip}`}>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 shrink-0" />
                      <a href={website} target="_blank" rel="noreferrer" className="text-sm font-semibold hover:underline truncate">
                        {website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map Card */}
            {mapEmbedUrl ? (
              <div className={`overflow-hidden rounded-3xl ${ui.detailPanel}`}>
                <div className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Location</p>
                  </div>
                </div>
                <iframe 
                  src={mapEmbedUrl} 
                  title={`${post.title} map`} 
                  className="h-[320px] w-full border-0" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                />
              </div>
            ) : null}
          </aside>
        </div>

        {/* Related Listings */}
        {related.length ? (
          <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5" />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Discover More</p>
                </div>
                <h2 className={`text-3xl font-semibold ${ui.title}`}>Similar {taskLabel}</h2>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${ui.chip}`}>
                <Tag className="h-3.5 w-3.5" />
                {taskLabel}
              </span>
            </div>
            <div className={ui.relatedGrid}>
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} compact />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
