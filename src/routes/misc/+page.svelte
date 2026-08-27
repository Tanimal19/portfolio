<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { resolve } from "$app/paths";
  import { childNavsContext, type ChildNavSetter } from "$lib/child-navs";

  const setChildNavs = getContext<ChildNavSetter | undefined>(childNavsContext);
  const clearChildNavs = setChildNavs?.([
    { title: "Misc", url: resolve("/misc") },
  ]);
  onDestroy(() => {
    clearChildNavs?.();
  });
</script>

<section class="flex flex-col gap-8 mb-20">
  <p>
    Always: music, video games, basketball, building software, cleaning my room,
    and organizing my computer.
    <br />
    Recently: cooking, drum kit, BJJ (brazilian jiu-jitsu), applying for PhD.
  </p>
</section>
