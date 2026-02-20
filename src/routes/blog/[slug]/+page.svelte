<script lang="ts">
  import type { PageData } from "./$types";
  import { resolve } from "$app/paths";
  import { getContext, onDestroy } from "svelte";
  import { childNavsContext, type ChildNavSetter } from "$lib/child-navs";

  const setChildNavs = getContext<ChildNavSetter | undefined>(childNavsContext);
  const clearChildNavs = setChildNavs?.([
    { title: "Writings", url: resolve("/blog") },
  ]);
  onDestroy(() => {
    clearChildNavs?.();
  });

  let { data }: { data: PageData } = $props();

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
</script>

<article class="mb-10">
  <header class="space-y-3">
    <h1 class="text-3xl font-semibold">{data.post.title}</h1>
    <p class="text-sm text-(--fd-secondary-foreground)">
      {formatDate(data.post.date)}
    </p>
  </header>

  <div
    class="prose prose-neutral mt-10 max-w-none font-serif text-(--fd-foreground) prose-headings:text-(--fd-foreground)"
  >
    {@render data.post.component()}
  </div>
</article>
