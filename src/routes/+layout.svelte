<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import { asset, resolve } from "$app/paths";
  import { pageLinks } from "$lib/config";
  import { setContext } from "svelte";
  import {
    childNavsContext,
    type ChildNav,
    type ChildNavSetter,
  } from "$lib/child-navs";
  import { SunIcon, MoonIcon, MenuIcon, XIcon } from "@lucide/svelte";

  let { children } = $props();

  const rootUrl = resolve("/");

  const pageLinksWithBase = pageLinks.map((link) => ({
    text: link.text,
    href: link.kind === "asset" ? asset(link.href) : resolve(link.href),
  }));

  const rootNav = {
    title: "Po-Yun Cheng",
    url: rootUrl,
  };

  let childNavs: ChildNav[] = $state([]);

  let childNavsToken = 0;

  let isDark = $state(false);

  let menuOpen = $state(false);

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
  class="flex flex-1 flex-col px-4 lg:px-48 xl:px-72 bg-(--fd-background) text-(--fd-foreground) min-h-screen"
>
  <header
    class="relative mb-8 border-(--fd-border) mt-10 flex items-center justify-between gap-4"
  >
    <nav
      class="flex min-w-0 items-center gap-2 truncate text-base font-bold text-(--fd-secondary-foreground)"
    >
      {#if childNavs.length}
        <a href={rootUrl} class="hover:text-(--fd-primary)">
          {rootNav.title}
        </a>
        <span>/</span>
        {#each childNavs as nav, i (nav.url)}
          <!-- nav.url comes pre-resolved from the page that sets it -->
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
          <a
            href={nav.url}
            class={`hover:text-(--fd-primary) ${
              i === childNavs.length - 1 ? "text-(--fd-foreground)" : ""
            }`}
          >
            {nav.title}
          </a>
          {#if i !== childNavs.length - 1}
            <span>/</span>
          {/if}
        {/each}
      {:else}
        <a
          href={rootUrl}
          class="text-(--fd-foreground) hover:text-(--fd-primary)"
        >
          {rootNav.title}
        </a>
      {/if}
    </nav>
    <div class="flex shrink-0 items-center gap-4">
      <nav
        class="hidden items-center gap-4 text-sm text-(--fd-secondary-foreground) sm:flex"
      >
        {#each pageLinksWithBase as link (link.href)}
          <!-- href is already resolved above -->
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
          <a href={link.href} class="hover:text-(--fd-primary) hover:underline">
            {link.text}
          </a>
        {/each}
      </nav>
      <details
        bind:open={menuOpen}
        class="sm:hidden"
      >
        <summary
          class="inline-flex cursor-pointer list-none items-center p-1 text-(--fd-foreground) transition hover:text-(--fd-primary) [&::-webkit-details-marker]:hidden"
          aria-label="Menu"
        >
          {#if menuOpen}
            <XIcon class="size-5" />
          {:else}
            <MenuIcon class="size-5" />
          {/if}
        </summary>
        <nav
          class="absolute right-0 top-full z-50 mt-2 flex min-w-36 flex-col gap-1 rounded-lg border border-(--fd-border) bg-(--fd-background) p-2 text-sm text-(--fd-secondary-foreground) shadow-lg"
        >
          {#each pageLinksWithBase as link (link.href)}
            <!-- href is already resolved above -->
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
            <a
              href={link.href}
              class="rounded px-2 py-1 hover:text-(--fd-primary) hover:underline"
              onclick={() => (menuOpen = false)}
            >
              {link.text}
            </a>
          {/each}
        </nav>
      </details>
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
    </div>
  </header>
  {@render children()}
</main>
