<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import { resolve } from "$app/paths";
  import { setContext } from "svelte";
  import {
    childNavsContext,
    type ChildNav,
    type ChildNavSetter,
  } from "$lib/child-navs";
  import { SunIcon, MoonIcon } from "@lucide/svelte";

  let { children } = $props();

  const rootNav = {
    title: "Bob Cheng",
    url: resolve("/"),
  };

  let childNavs: ChildNav[] = $state([]);

  let childNavsToken = 0;

  let isDark = $state(false);

  const applyTheme = (dark: boolean) => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.classList.toggle("dark", dark);
  };

  const setTheme = (dark: boolean) => {
    isDark = dark;
    applyTheme(dark);
  };

  const setChildNavs: ChildNavSetter = (navs) => {
    childNavsToken += 1;
    const token = childNavsToken;
    childNavs = navs;

    return () => {
      if (childNavsToken === token) {
        childNavs = [];
      }
    };
  };

  setContext(childNavsContext, setChildNavs);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main
  id="nd-home-layout"
  class={"flex flex-1 flex-col px-4 lg:px-48 xl:px-72 bg-(--fd-background) text-(--fd-foreground) min-h-screen"}
>
  <header
    class="mb-4 border-(--fd-border) mt-10 flex items-center justify-between"
  >
    <nav
      class="flex items-center gap-2 text-base font-bold text-(--fd-secondary-foreground)"
    >
      {#if childNavs.length}
        <a href={rootNav.url} class="hover:text-(--fd-primary)">
          {rootNav.title}
        </a>
        <span>/</span>
        {#each childNavs as nav, i}
          <a href={nav.url} class="hover:text-(--fd-primary)">
            {nav.title}
          </a>
          {#if i !== childNavs.length - 1}
            <span>/</span>
          {/if}
        {/each}
      {:else}
        <a
          href={rootNav.url}
          class="text-(--fd-foreground) hover:text-(--fd-primary)"
        >
          {rootNav.title}
        </a>
      {/if}
    </nav>
    <button
      type="button"
      class="inline-flex items-center p-1 text-(--fd-foreground) transition hover:text-(--fd-primary)"
      aria-pressed={isDark}
      onclick={() => setTheme(!isDark)}
    >
      {#if isDark}
        <MoonIcon class="size-5" />
      {:else}
        <SunIcon class="size-5" />
      {/if}
    </button>
  </header>
  {@render children()}
</main>
