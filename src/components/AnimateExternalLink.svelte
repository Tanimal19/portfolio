<script lang="ts">
  import { ArrowUpRightIcon } from "@lucide/svelte";
  let props = $props();
</script>

<a
  href={props.href}
  target="_blank"
  class="underline decoration-(--fd-accent-foreground)/50 hover:decoration-(--fd-accent-foreground) group"
>
  {props.text}<span class="overflow-hidden relative size-4 inline-block">
    <ArrowUpRightIcon
      class="absolute top-0 left-0 size-4 text-(--fd-accent-foreground)/50 group-hover:text-(--fd-accent-foreground) animate-none group-hover:animate-(--animation-slide-top-right)"
    />
    <ArrowUpRightIcon
      class="absolute top-6 -left-6 size-4 text-(--fd-accent-foreground)/50 group-hover:text-(--fd-accent-foreground) animate-none group-hover:animate-(--animation-slide-top-right)"
    />
  </span>
</a>
