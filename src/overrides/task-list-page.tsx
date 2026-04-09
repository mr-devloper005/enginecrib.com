import Link from 'next/link'
import { ArrowRight, Building2, Search, SlidersHorizontal } from 'lucide-react'
import { AuthAwareCreateLink } from '@/components/shared/auth-aware-create-link'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: `${SITE_CONFIG.name} Listings`,
                url: `${baseUrl}${taskConfig?.route || '/listings'}`,
              },
            ]}
          />
        ) : null}

        <div className="mx-auto max-w-7xl">
          <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)] sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">{taskConfig?.label || 'Directory Listings'}</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Explore trusted businesses through a cleaner category-led listing view.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50/90">
                  Search, filter, and compare companies with a consistent directory UI across the site.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AuthAwareCreateLink
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0d4f9a] hover:bg-blue-50"
                    loggedInLabel={<><span>Add your business</span><ArrowRight className="h-4 w-4" /></>}
                    loggedOutLabel={<><span>Login to add listing</span><ArrowRight className="h-4 w-4" /></>}
                  />
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
                    Need help?
                  </Link>
                </div>
              </div>

              <form action={taskConfig?.route || '#'} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter results
                </div>
                <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">Category</label>
                <div className="mt-2 rounded-2xl bg-white px-4">
                  <select name="category" defaultValue={normalizedCategory} className="h-12 w-full bg-transparent text-sm text-slate-700 outline-none">
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-[#0d4f9a] hover:bg-blue-50">
                  <Search className="h-4 w-4" />
                  Apply filters
                </button>
              </form>
            </div>
          </section>

          <section className="mt-10 rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Directory Results</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Browse listings with the same site-wide palette</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#edf5ff] px-4 py-2 text-sm font-medium text-[#0d4f9a]">
                <Building2 className="h-4 w-4" />
                {posts.length} results loaded
              </div>
            </div>

            <div className="mt-8">
              <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
