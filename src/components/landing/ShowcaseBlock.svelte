<script lang="ts">
  import type { ProjectItem } from "$lib/config";

  let { item }: { item: ProjectItem } = $props();

  let hover = $state(false);
  let self: HTMLDivElement | null = $state(null);
  let contentTranslate = $state({ x: 0, y: 0 });

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
  <a href={item.link || "#"} target="_blank" class="flex flex-col">
    {item.title}
    <p class="text-sm text-(--fd-secondary-foreground)">{item.description}</p>
  </a>

  <div
    class={`flex items-center justify-center pointer-events-none mx-auto w-1/2 fixed inset-0 transition duration-300 z-50 ${
      hover ? "opacity-100 scale-100" : "opacity-0 scale-75"
    }`}
  >
    <div
      style={`transform: translateX(${contentTranslate.x}px) translateY(${contentTranslate.y}px); transition: transform 0.2s ease-out; will-change: transform;`}
    >
      {#if item.previewVideo}
        <video
          class="max-w-[80lvw] max-h-[80vh] 2xl:max-h-[60vh] inline-flex items-center rounded-md p-2 bg-black/50"
          preload="auto"
          autoplay
          loop
          muted
          playsinline
        >
          <source src={item.previewVideo} type="video/mp4" />
          Sorry, your browser does not support the video tag.
        </video>
      {/if}
      {#if item.previewImage}
        <img
          class="max-w-[60lvw] max-h-[80vh] 2xl:max-h-[60vh] rounded-md p-2 bg-black/50"
          src={item.previewImage}
          alt={item.title}
        />
      {/if}
    </div>
  </div>
</div>
