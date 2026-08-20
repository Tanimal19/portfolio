<script lang="ts">
  import { asset } from "$app/paths";

  let {
    src,
    alt,
    width = 400,
    caption,
  }: { src: string; alt: string; width: number; caption: string } = $props();

  const resolvedSrc = $derived.by(() => {
    if (!src || !src.startsWith("/")) return src;
    return asset(src);
  });
</script>

<figure class="my-6 flex w-full flex-col items-center">
  <img class="rounded-md object-cover" src={resolvedSrc} {alt} {width} />
  {#if caption}
    <figcaption class="mt-2 text-sm text-(--fd-secondary-foreground)">
      {caption}
    </figcaption>
  {/if}
</figure>
