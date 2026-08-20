<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { resolve } from "$app/paths";
  import { getContext, onDestroy } from "svelte";
  import { childNavsContext, type ChildNavSetter } from "$lib/child-navs";

  const setChildNavs = getContext<ChildNavSetter | undefined>(childNavsContext);
  const clearChildNavs = setChildNavs?.([{ title: "", url: "" }]);
  onDestroy(() => {
    clearChildNavs?.();
  });

  let { data }: { data: PageData } = $props();

  const activeTag = $derived.by(() =>
    browser ? (page.url.searchParams.get("tags") ?? "").trim() : "",
  );
  const filteredPosts = $derived.by(() => {
    if (!activeTag) return data.posts;
    const activeLower = activeTag.toLowerCase();
    return data.posts.filter((post) =>
      post.tags?.some((tag) => tag.toLowerCase() === activeLower),
    );
  });

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
</script>

<section>
  <header class="space-y-3">
    <h1 class="text-3xl font-semibold">Writings</h1>
    <div class="flex flex-col items-start gap-2">
      {#if data.tags.length}
        <div class="flex flex-wrap gap-3 text-sm font-medium">
          <a
            class={`hover:text-(--fd-primary) ${
              activeTag
                ? "text-(--fd-secondary-foreground)"
                : "text-(--fd-primary)"
            }`}
            href={resolve("/blog")}
          >
            All
          </a>
          {#each data.tags as tag}
            <a
              class={`hover:text-(--fd-primary) ${
                activeTag.toLowerCase() === tag.tag.toLowerCase()
                  ? "text-(--fd-primary)"
                  : "text-(--fd-secondary-foreground)"
              }`}
              href={`${resolve("/blog")}?tags=${encodeURIComponent(tag.tag)}`}
            >
              {tag.tag}[{tag.count}]
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </header>

  <div class="mt-10 space-y-6">
    {#if filteredPosts.length === 0}
      <p class="text-(--fd-secondary-foreground)">
        {activeTag ? "No posts for this tag yet." : "No posts yet."}
      </p>
    {:else}
      {#each filteredPosts as post}
        <article class="flex flex-row items-center relative">
          {#if post.language !== "en"}
            <div
              class="hidden absolute -left-20 top-1/2 -translate-y-1/2 w-16 pointer-events-none lg:flex justify-end"
            >
              <span
                class="px-1 text-xs font-mono w-fit h-fit text-(--fd-secondary-foreground) bg-(--fd-secondary) rounded"
                >{post.language}</span
              >
            </div>
          {/if}
          <div class="text-sm text-(--fd-secondary-foreground) w-20">
            {formatDate(post.date)}
          </div>
          <a
            class="text-lg font-medium hover:underline hover:text-(--fd-primary) font-sans -translate-y-0.5"
            href={`${resolve("/blog")}/${post.slug}`}
          >
            {post.title}
          </a>
        </article>
      {/each}
    {/if}
  </div>
</section>
