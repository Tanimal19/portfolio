<script lang="ts">
  import AnimateExternalLink from "../components/AnimateExternalLink.svelte";
  import AnimatePageLink from "../components/AnimatePageLink.svelte";
  import SectionBlock from "../components/landing/SectionBlock.svelte";
  import { pageLinks, socialLinks, projectItems } from "$lib/config";
  import ShowcaseBlock from "../components/landing/ShowcaseBlock.svelte";
  import { resolve } from "$app/paths";

  let showColophon = false;

  const pageLinksWithBase = pageLinks.map((link) => ({
    ...link,
    href: link.href.startsWith("/") ? resolve(link.href) : link.href,
  }));
</script>

<main>
  <div class="relative flex flex-col lg:flex-row lg:gap-30">
    <div class="flex flex-col gap-4 lg:gap-8 mb-8">
      <div class="w-fit flex flex-col items-start mt-2">
        <div class="max-w-2xl text-left flex flex-col gap-2">
          <p>
            Welcome to my website! I'm Bob Cheng (鄭博允 Po-Yun Cheng),
            currently study computer science at
            <AnimateExternalLink
              href="https://www.csie.ntu.edu.tw/"
              text="National Taiwan University"
            />.
          </p>
          <p>
            I love building things with quality code and nice design,
            interesting in human-computer interaction, software engineering and
            AI stuffs.
          </p>
          <p>
            Reach me at
            <AnimateExternalLink
              href="mailto:poyuncheng.bob@gmail.com"
              text="poyuncheng.bob@gmail.com"
            />
            if you have any ideas or suggestions.
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-start gap-4 md:gap-20">
        <SectionBlock title="WHERE">
          <p>Taipei, Taiwan</p>
        </SectionBlock>

        <SectionBlock title="SOCIALS">
          <div class="flex flex-row gap-2 justify-center">
            {#each socialLinks as link}
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                class="text-base group w-fit cursor-pointer flex flex-row items-center px-1 hover:underline"
              >
                <span
                  class="size-2 inline-block mr-2"
                  style={`background-color: ${link.colorhex}`}
                ></span>
                {link.text}
              </a>
            {/each}
          </div>
        </SectionBlock>
      </div>

      <SectionBlock title="WORKS.SELECTED">
        <div class="flex flex-col gap-4">
          {#each projectItems as item}
            <ShowcaseBlock {item} />
          {/each}
        </div>
      </SectionBlock>

      <div class="w-fit flex flex-col items-start mt-2 lg:hidden">
        <div class="w-fit mb-1">
          <p
            class="text-[0.7em] font-bold text-(--fd-secondary-foreground) font-mono"
          >
            MORE
          </p>
        </div>
        <div class="flex flex-row gap-6 justify-center">
          {#each pageLinksWithBase as link}
            <a href={link.href} class="underline">{link.text}</a>
          {/each}
        </div>
      </div>
    </div>

    <div class="w-fit hidden lg:flex flex-col items-start mt-2">
      {#each pageLinksWithBase as link}
        <AnimatePageLink href={link.href} text={link.text} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col items-end justify-center gap-2 mt-10 mb-20">
    <button
      type="button"
      aria-pressed={showColophon}
      aria-label="Toggle colophon info"
      on:click={() => (showColophon = !showColophon)}
    >
      <span
        class="size-2 inline-block bg-(--fd-foreground) transition-transform duration-200 hover:scale-110"
      ></span>
    </button>
    <div
      class={`flex flex-col items-end justify-center gap-2 text-fd-secondary-foreground font-mono text-xs ${showColophon ? "block" : "hidden"}`}
    >
      <p>BOBCHENG 2026</p>
      <p>W/ SVELTEKIT, TAILWIND</p>
      <p>INTER, NOTOSERIF, JETBRAINS_MONO</p>
    </div>
  </div>
</main>
