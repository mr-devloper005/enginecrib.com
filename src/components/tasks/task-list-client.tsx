"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { cn } from "@/lib/utils";
import { getDirectoryUiPreset } from "@/design/directory-ui";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
  className?: string;
};

export function TaskListClient({ task, initialPosts, category, className }: Props) {
  const localPosts = getLocalPostsForTask(task);
  const ui = getDirectoryUiPreset();

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) bySlug.add(post.slug);
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    return (
      <div className={cn("rounded-md border-2 border-dashed p-10 text-center text-sm", ui.softPanel, ui.muted)}>
        No posts yet for this section.
      </div>
    );
  }

  const defaultGrid = task === "listing" ? ui.listGrid : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={cn(defaultGrid, className)}>
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
