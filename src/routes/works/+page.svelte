<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { resolve } from "$app/paths";
  import { childNavsContext, type ChildNavSetter } from "$lib/child-navs";
  import {
    projectItems,
    projectCategories,
    type ProjectCategory,
  } from "$lib/config";

  import ShowcaseBlock from "../../components/landing/ShowcaseBlock.svelte";

  const setChildNavs = getContext<ChildNavSetter | undefined>(childNavsContext);
  const clearChildNavs = setChildNavs?.([
    { title: "Works", url: resolve("/works") },
  ]);
  onDestroy(() => {
    clearChildNavs?.();
  });

  const years = [...new Set(projectItems.map((item) => item.year))].sort(
    (a, b) => b - a,
  );
  const categories = projectCategories;

  let activeYear: number | null = $state(null);
  let activeCategory: ProjectCategory | null = $state(null);
  let showPreview = $state(true);

  const filteredItems = $derived.by(() =>
    projectItems
      .filter((item) => activeYear === null || item.year === activeYear)
      .filter(
        (item) => activeCategory === null || item.category === activeCategory,
      )
      .sort((a, b) => b.year - a.year),
  );

  /** Items grouped under a year separator, newest year first. */
  const groupedItems = $derived.by(() =>
    years
      .map((year) => ({
        year,
        items: filteredItems.filter((item) => item.year === year),
      }))
      .filter((group) => group.items.length > 0),
  );

  const filterClass = (active: boolean) =>
    `hover:text-(--fd-primary) ${
      active ? "text-(--fd-primary)" : "text-(--fd-secondary-foreground)"
    }`;
</script>

<section>
  <header class="space-y-3">
    <div class="flex flex-col items-start gap-2">
      <div class="flex flex-wrap items-baseline gap-3 text-sm font-medium">
        <span
          class="text-[0.7em] font-bold text-(--fd-secondary-foreground) font-mono w-14"
        >
          YEAR
        </span>
        <button
          type="button"
          class={filterClass(activeYear === null)}
          onclick={() => (activeYear = null)}
        >
          All
        </button>
        {#each years as year (year)}
          <button
            type="button"
            class={filterClass(activeYear === year)}
            onclick={() => (activeYear = activeYear === year ? null : year)}
          >
            {year}
          </button>
        {/each}
      </div>

      <div class="flex flex-wrap items-baseline gap-3 text-sm font-medium">
        <span
          class="text-[0.7em] font-bold text-(--fd-secondary-foreground) font-mono w-14"
        >
          TYPE
        </span>
        <button
          type="button"
          class={filterClass(activeCategory === null)}
          onclick={() => (activeCategory = null)}
        >
          All
        </button>
        {#each categories as category (category)}
          <button
            type="button"
            class={filterClass(activeCategory === category)}
            onclick={() =>
              (activeCategory = activeCategory === category ? null : category)}
          >
            {category}
          </button>
        {/each}
      </div>

      <div class="flex flex-wrap items-baseline gap-3 text-sm font-medium">
        <span
          class="text-[0.7em] font-bold text-(--fd-secondary-foreground) font-mono w-14"
        >
          PREVIEW
        </span>
        <button
          type="button"
          aria-pressed={showPreview}
          class={filterClass(showPreview)}
          onclick={() => (showPreview = !showPreview)}
        >
          {showPreview ? "On" : "Off"}
        </button>
      </div>
    </div>
  </header>

  <div class="mt-10 flex flex-col gap-6 mb-20">
    {#if filteredItems.length === 0}
      <p class="text-(--fd-secondary-foreground)">
        No works match this filter.
      </p>
    {:else}
      {#each groupedItems as group (group.year)}
        <div class="flex flex-row items-center gap-4 mt-4 first:mt-0">
          <span class="text-xs font-mono text-(--fd-secondary-foreground)">
            {group.year}
          </span>
          <hr class="grow border-t border-(--fd-border)" />
        </div>

        {#each group.items as item (item.link)}
          <div class="flex flex-row items-start gap-4">
            <ShowcaseBlock {item} preview={showPreview} />
          </div>
        {/each}
      {/each}
    {/if}
  </div>
</section>
