<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { resolve } from "$app/paths";
  import { getContext, onDestroy } from "svelte";
  import { childNavsContext, type ChildNavSetter } from "$lib/child-navs";

  const setChildNavs = getContext<ChildNavSetter | undefined>(childNavsContext);
  const clearChildNavs = setChildNavs?.([
    { title: "Notes", url: resolve("/notes") },
  ]);
  onDestroy(() => {
    clearChildNavs?.();
  });

  let { data }: { data: PageData } = $props();

  const tags = $derived.by(() => {
    const counts = new Map<string, number>();
    data.notes.forEach((note) =>
      note.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
    );
    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => a.tag.localeCompare(b.tag));
  });

  const activeTag = $derived.by(() =>
    browser ? (page.url.searchParams.get("tags") ?? "").trim() : "",
  );
  const filteredNotes = $derived.by(() => {
    if (!activeTag) return data.notes;
    const activeLower = activeTag.toLowerCase();
    return data.notes.filter((note) =>
      note.tags.some((tag) => tag.toLowerCase() === activeLower),
    );
  });

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
</script>

<section>
  <header class="space-y-3">
    {#if tags.length}
      <div class="flex flex-wrap gap-3 text-sm font-medium">
        <a
          class={`hover:text-(--fd-primary) ${
            activeTag
              ? "text-(--fd-secondary-foreground)"
              : "text-(--fd-primary)"
          }`}
          href={resolve("/notes")}
        >
          All
        </a>
        {#each tags as tag (tag.tag)}
          <!-- resolve() cannot express a query string; the path itself is resolved -->
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
          <a
            href={`${resolve("/notes")}?tags=${encodeURIComponent(tag.tag)}`}
            class={`hover:text-(--fd-primary) ${
              activeTag.toLowerCase() === tag.tag.toLowerCase()
                ? "text-(--fd-primary)"
                : "text-(--fd-secondary-foreground)"
            }`}
          >
            {tag.tag}[{tag.count}]
          </a>
        {/each}
      </div>
    {/if}
  </header>

  <div class="mt-10 space-y-10 mb-10">
    {#if filteredNotes.length === 0}
      <p class="text-(--fd-secondary-foreground)">
        {activeTag ? "No notes for this tag yet." : "No notes yet."}
      </p>
    {:else}
      {#each filteredNotes as note (note.slug)}
        {@const NoteContent = note.component}
        <article class="border-l-2 border-(--fd-border) pl-4">
          <header class="space-y-1">
            <h2 class="text-lg font-medium font-sans">
              {#if note.link}
                <!-- external paper link -->
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
                <a
                  href={note.link}
                  target="_blank"
                  rel="noreferrer"
                  class="hover:underline hover:text-(--fd-primary)"
                >
                  {note.title}
                </a>
              {:else}
                {note.title}
              {/if}
              {#if note.year}
                <span class="font-normal text-(--fd-secondary-foreground)"
                  >({note.year})</span
                >
              {/if}
            </h2>
            <p class="text-xs text-(--fd-secondary-foreground)">
              read {formatDate(note.date)}
            </p>
          </header>

          <div
            class="prose prose-neutral prose-sm mt-4 max-w-none font-sans text-(--fd-foreground) prose-headings:text-(--fd-foreground)"
          >
            <NoteContent />
          </div>
        </article>
      {/each}
    {/if}
  </div>
</section>
