<script lang="ts">
  import { ArrowRightIcon } from "@lucide/svelte";
  let props = $props();
</script>

<!-- href is already resolved by the caller (resolve()/asset()) -->
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={props.href}
  class="hover:underline hover:decoration-(--fd-foreground) group flex items-center"
>
  {props.text}<span class="overflow-hidden relative size-4 inline-block ml-2">
    <ArrowRightIcon
      class="absolute top-0 left-0 size-4 text-(--fd-foreground) animate-none group-hover:animate-(--animation-slide-right)"
    />
    <ArrowRightIcon
      class="absolute top-0 -left-6 size-4 text-(--fd-foreground) animate-none group-hover:animate-(--animation-slide-right)"
    />
  </span>
</a>
