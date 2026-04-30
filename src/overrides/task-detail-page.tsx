import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Star, Clock, CheckCircle } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { DirectoryTaskDetailPageOverride } from '@/overrides/task-detail-page-client'
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
