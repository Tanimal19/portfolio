<script lang="ts">
  import type { PageData } from "./$types";
  import { getContext, onDestroy } from "svelte";
  import { childNavsContext, type ChildNavSetter } from "$lib/child-navs";

  const setChildNavs = getContext<ChildNavSetter | undefined>(childNavsContext);
  const clearChildNavs = setChildNavs?.([{ title: "", url: "" }]);
  onDestroy(() => {
    clearChildNavs?.();
  });

  let { data }: { data: PageData } = $props();

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
              data.activeTag
                ? "text-(--fd-secondary-foreground)"
                : "text-(--fd-primary)"
            }`}
            href="/blog"
          >
            All
          </a>
          {#each data.tags as tag}
            <a
              class={`hover:text-(--fd-primary) ${
                data.activeTag?.toLowerCase() === tag.tag.toLowerCase()
                  ? "text-(--fd-primary)"
                  : "text-(--fd-secondary-foreground)"
              }`}
              href={`/blog?tags=${encodeURIComponent(tag.tag)}`}
            >
              {tag.tag}[{tag.count}]
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </header>

  <div class="mt-10 space-y-6">
    {#if data.posts.length === 0}
      <p class="text-(--fd-secondary-foreground)">
        {data.activeTag ? "No posts for this tag yet." : "No posts yet."}
      </p>
    {:else}
      {#each data.posts as post}
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
            class="text-lg font-semibold hover:underline hover:text-(--fd-primary) font-serif -translate-y-0.5"
            href={`/blog/${post.slug}`}
          >
            {post.title}
          </a>
        </article>
      {/each}
    {/if}
  </div>
</section>
