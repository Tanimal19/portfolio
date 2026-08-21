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
    Interests: music, video games, basketball, building software toys,
    organizing my computer files.
  </p>

  <p>
    New things I try recently: cooking, drum kit, bjj (brazilian jiu-jitsu),
    applying for PhD.
  </p>
</section>
