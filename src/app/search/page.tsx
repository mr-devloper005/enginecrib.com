import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { getDirectoryUiPreset } from '@/design/directory-ui'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const ui = getDirectoryUiPreset()
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  )
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((taskConfig) => getMockPostsForTask(taskConfig.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <div className={`min-h-screen ${ui.shell}`}>
      <NavbarShell />
      <main>
        <section className={`${ui.hero}`}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-14">
            <div>
              <div className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${ui.eyebrow}`}>
                <Search className="h-4 w-4" />
                {ui.label}
              </div>
              <h1 className={`mt-4 text-4xl font-semibold leading-tight sm:text-5xl ${ui.title}`}>Search the directory</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>
                {query ? `Showing results for "${query}".` : 'Filter the live catalog with a search surface tuned to this site.'}
              </p>
            </div>
            <form action="/search" className={`p-4 ${ui.panel}`}>
              <input type="hidden" name="master" value="1" />
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${ui.muted}`} />
                <Input name="q" defaultValue={query} placeholder="Search listings..." className={`h-12 pl-9 ${ui.input}`} />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input name="category" defaultValue={category} placeholder="Category" className={`h-11 px-3 text-sm ${ui.input}`} />
                <select name="task" defaultValue={task} className={`h-11 px-3 text-sm ${ui.input}`}>
                  <option value="">All types</option>
                  {enabledTasks.map((item) => (
                    <option key={item.key} value={item.key}>{item.label}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className={`mt-3 h-11 w-full ${ui.primaryButton}`}>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Apply search
              </Button>
            </form>
          </div>
        </section>

        <section className={`mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8 ${ui.searchLayout}`}>
          <aside className={`h-fit p-5 lg:sticky lg:top-24 ${ui.softPanel}`}>
            <div className={`flex items-center gap-2 text-sm font-semibold ${ui.title}`}>
              <Filter className="h-4 w-4" />
              Result controls
            </div>
            <div className="mt-5 grid gap-3 text-sm">
              <div className={`flex items-center justify-between px-3 py-2 ${ui.chip}`}>
                <span>Total results</span>
                <strong>{results.length}</strong>
              </div>
              <div className={`px-3 py-2 ${ui.chip}`}>{category || 'All categories'}</div>
              <div className={`px-3 py-2 ${ui.chip}`}>{task || 'All content types'}</div>
            </div>
          </aside>

          <div>
            {results.length ? (
              <div className={ui.listGrid}>
                {results.map((post) => {
                  const postTask = getPostTaskKey(post)
                  const href = postTask ? buildPostUrl(postTask, post.slug) : `/posts/${post.slug}`
                  return <TaskPostCard key={post.id} post={post} href={href} taskKey={postTask || 'listing'} />
                })}
              </div>
            ) : (
              <div className={`p-12 text-center text-sm ${ui.softPanel} ${ui.muted}`}>
                No matching posts yet.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
