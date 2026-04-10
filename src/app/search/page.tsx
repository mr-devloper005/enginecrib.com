import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search"
      description={
        query
          ? `Results for "${query}"`
          : "Browse the latest posts across every task."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-[22rem]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0d4f9a]" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search businesses, categories, or cities..."
              className="h-12 rounded-full border-slate-200 bg-white pl-11 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] placeholder:text-slate-400 focus-visible:ring-[#0d4f9a]/20"
            />
          </div>
          <Button
            type="submit"
            className="h-12 rounded-full bg-[#0d4f9a] px-6 text-white shadow-[0_12px_24px_rgba(13,79,154,0.24)] hover:bg-[#0b4385]"
          >
            Search
          </Button>
        </form>
      }
    >
      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Directory Search</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {query ? `Showing matches for "${query}"` : "Browse the latest listing results"}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Filtered results stay in the same directory-style card layout used across the site.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#edf5ff] px-4 py-2 text-sm font-medium text-[#0d4f9a]">
            <Building2 className="h-4 w-4" />
            {results.length} result{results.length === 1 ? "" : "s"}
          </div>
        </div>

        {results.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => {
              const task = getPostTaskKey(post);
              const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
              return <TaskPostCard key={post.id} post={post} href={href} />;
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.4rem] border border-dashed border-slate-300 bg-[#f8fbff] p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No matching posts yet.</p>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Try a different business name, service category, or city to broaden the results.
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
