<script lang="ts">
  import { authorSelf, type ProjectItem } from "$lib/config";
  import { asset } from "$app/paths";
  import { TrophyIcon } from "@lucide/svelte";

  let { item, preview = true }: { item: ProjectItem; preview?: boolean } =
    $props();

  const chipClass =
    "inline-block px-1 font-mono text-xs text-(--fd-secondary-foreground) bg-(--fd-secondary) rounded";

  const awardChipClass =
    "px-1 font-mono text-xs text-(--fd-gold) bg-(--fd-gold-background) rounded";

  let hover = $state(false);
  let self: HTMLDivElement | null = $state(null);
  let contentTranslate = $state({ x: 0, y: 0 });

  const resolvePath = (path?: string) => {
    if (!path || !path.startsWith("/")) return path;
    return asset(path);
  };

  const previewImage = $derived.by(() =>
    preview ? resolvePath(item.previewImage) : undefined,
  );
  const previewVideo = $derived.by(() =>
    preview ? resolvePath(item.previewVideo) : undefined,
  );

  function handleMouseMove(e: MouseEvent) {
    const rect = self?.getBoundingClientRect();
    if (rect) {
      const moveX = e.clientX - (rect.left + rect.width / 2);
      const moveY = e.clientY - (rect.top + rect.height / 2);
      contentTranslate = {
        x: moveX / 2,
        y: moveY,
      };
    }
  }
</script>

<div
  bind:this={self}
  class="relative hover:bg-(--fd-accent)/50 w-full"
  role="region"
  onmouseenter={() => (hover = true)}
  onmouseleave={() => (hover = false)}
  onmousemove={handleMouseMove}
>
  <a
    href={item.link || "#"}
    target="_blank"
    rel="noreferrer external"
    class="flex flex-col"
  >
    <span
      class="hidden absolute -left-20 top-1 w-16 pointer-events-none lg:flex justify-end"
    >
      <span class={chipClass}>{item.category}</span>
    </span>
    <span class="flex flex-wrap items-baseline gap-1 mb-1 lg:hidden">
      <span class={chipClass}>{item.category}</span>
      {#if item.award}
        <span class={`${awardChipClass} inline-block`}>
          <TrophyIcon class="size-3 inline-block mr-1 align-[-0.15em]" />{item.award}
        </span>
      {/if}
    </span>
    <span class="flex flex-row items-baseline gap-2">
      <span>{item.title}</span>
      {#if item.award}
        <span class={`${awardChipClass} hidden lg:inline-block`}>
          <TrophyIcon class="size-3 inline-block mr-1 align-[-0.15em]" />{item.award}
        </span>
      {/if}
    </span>
    {#if item.authors}
      <p class="text-sm text-(--fd-secondary-foreground)">
        {#each item.authors as author, i (author)}<span
            class={author === authorSelf ? "font-bold" : ""}>{author}</span
          >{i === item.authors.length - 1 ? "." : ", "}{/each}
      </p>
    {/if}
    <p class="text-sm text-(--fd-secondary-foreground) whitespace-pre-line">
      {item.description}
    </p>
  </a>

  <div
    class={`hidden lg:flex items-center justify-center pointer-events-none mx-auto w-1/2 fixed inset-0 transition duration-300 z-50 ${
      hover ? "opacity-100 scale-100" : "opacity-0 scale-75"
    }`}
  >
    <div
      style={`transform: translateX(${contentTranslate.x}px) translateY(${contentTranslate.y}px); transition: transform 0.2s ease-out; will-change: transform;`}
    >
      {#if previewVideo}
        <video
          class="max-w-[80lvw] max-h-[80vh] 2xl:max-h-[60vh] inline-flex items-center rounded-md p-2 bg-black/50"
          preload="auto"
          autoplay
          loop
          muted
          playsinline
        >
          <source src={previewVideo} type="video/mp4" />
          Sorry, your browser does not support the video tag.
        </video>
      {/if}
      {#if previewImage}
        <img
          class="max-w-[60lvw] max-h-[80vh] 2xl:max-h-[60vh] rounded-md p-2 bg-black/50"
          src={previewImage}
          alt={item.title}
        />
      {/if}
    </div>
  </div>
</div>
