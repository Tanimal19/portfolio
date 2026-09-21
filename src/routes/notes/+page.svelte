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

  let expanded = $state<Record<string, boolean>>({});

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

  <div class="mt-10 space-y-6 mb-10">
    {#if filteredNotes.length === 0}
      <p class="text-(--fd-secondary-foreground)">
        {activeTag ? "No notes for this tag yet." : "No notes yet."}
      </p>
    {:else}
      {#each filteredNotes as note (note.slug)}
        {@const NoteContent = note.component}
        <article
          class="relative border-l-2 border-(--fd-border) pl-4 transition-colors hover:border-(--fd-primary)"
        >
          <header
            class="relative -mx-2 -my-1.5 space-y-1 rounded-md px-2 py-1 transition-colors has-[button:hover]:bg-(--fd-secondary) has-[button:focus-visible]:bg-(--fd-secondary)"
          >
            <button
              type="button"
              aria-label={`Toggle ${note.title}`}
              aria-expanded={!!expanded[note.slug]}
              onclick={() => (expanded[note.slug] = !expanded[note.slug])}
              class="absolute inset-0 w-full cursor-pointer rounded-md outline-none"
            ></button>
            <h2 class="text-sm font-medium font-sans select-none">
              {note.title}
              {#if note.year}
                <span class="font-normal text-(--fd-secondary-foreground)"
                  >({note.year})</span
                >
              {/if}
            </h2>
            <p
              class="flex items-center gap-1.5 text-xs text-(--fd-secondary-foreground)"
            >
              <span>read {formatDate(note.date)}</span>
            </p>
          </header>

          {#if expanded[note.slug]}
            <div
              class="prose prose-neutral prose-sm mt-4 max-w-none font-sans text-(--fd-foreground) prose-headings:text-(--fd-foreground)"
            >
              <NoteContent />
            </div>
          {/if}
        </article>
      {/each}
    {/if}
  </div>
</section>
