import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { getDirectoryUiPreset } from '@/design/directory-ui'

export function DirectoryTaskDetailPage({
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
        <section className={`${ui.detailHero}`}>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm font-semibold opacity-85 transition hover:opacity-100">
              <ArrowLeft className="h-4 w-4" />
              Back to {taskLabel}
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>
                  <ShieldCheck className="h-4 w-4" />
                  {ui.label}
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
                {location ? (
                  <p className="mt-5 flex items-start gap-2 text-sm leading-7 opacity-85">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    {location}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-2">
                  {stats.map((item) => (
                    <span key={item} className="border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[16/11] overflow-hidden border border-white/16 bg-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 ? (
          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
              {images.slice(1, 8).map((image) => (
                <div key={image} className="relative h-24 w-40 shrink-0 overflow-hidden border border-black/10 bg-white shadow-sm sm:h-28 sm:w-48">
                  <ContentImage src={image} alt={`${post.title} additional photo`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <article className={`p-6 sm:p-8 ${ui.detailPanel}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Profile summary</p>
            <h2 className={`mt-3 text-2xl font-semibold ${ui.title}`}>Details, context, and what to expect</h2>
            <p className={`mt-5 max-w-4xl text-sm leading-8 ${ui.muted}`}>{description}</p>
            {highlights.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.slice(0, 6).map((item) => (
                  <div key={item} className={`px-4 py-3 text-sm ${ui.chip}`}>{item}</div>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className={`p-5 ${ui.detailAside}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Contact</p>
              <div className="mt-5 grid gap-3 text-sm">
                {location ? <div className={`flex items-start gap-3 px-3 py-2 ${ui.chip}`}><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{location}</div> : null}
                {phone ? <div className={`flex items-center gap-3 px-3 py-2 ${ui.chip}`}><Phone className="h-4 w-4 shrink-0" />{phone}</div> : null}
                {email ? <div className={`flex items-center gap-3 px-3 py-2 ${ui.chip}`}><Mail className="h-4 w-4 shrink-0" />{email}</div> : null}
                {website ? <div className={`flex items-center gap-3 px-3 py-2 ${ui.chip}`}><Globe className="h-4 w-4 shrink-0" />{website}</div> : null}
              </div>
              {website ? (
                <a href={website} target="_blank" rel="noreferrer" className={`mt-5 inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold ${ui.primaryButton}`}>
                  Visit website
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            {mapEmbedUrl ? (
              <div className={`overflow-hidden ${ui.detailPanel}`}>
                <div className="px-5 py-4">
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </aside>
        </div>

        {related.length ? (
          <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Recommended</p>
                <h2 className={`mt-2 text-2xl font-semibold ${ui.title}`}>More nearby matches</h2>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${ui.chip}`}>
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
