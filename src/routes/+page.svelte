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
      <div class="w-fit flex flex-row items-start mt-2 gap-8">
        <img class="w-40" src="/head.jpg" alt="Me" />
        <div class="max-w-2xl text-left flex flex-col gap-2">
          <p>
            Hi, I'm Bob Cheng (mandarin: 鄭博允, Po-Yun Cheng), a recent
            Computer Science graduate from <AnimateExternalLink
              href="https://www.csie.ntu.edu.tw/"
              text="National Taiwan University"
            />, currently preparing for PhD applications in Software Engineering
            and Human-Computer Interaction.
          </p>
          <p>
            My broad research goal is to make software development effortless
            and sustainable, specifically, 1) concentrating human attention on
            the judgments only humans can be accountable for and 2) reducing the
            rework that accumulates as systems evolve.
          </p>
          <p>
            Please contact me at
            <AnimateExternalLink
              href="mailto:poyuncheng.bob@gmail.com"
              text="poyuncheng.bob@gmail.com"
            />.
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-start gap-4 md:gap-20">
        <SectionBlock title="WHERE">
          <p>Taipei, Taiwan</p>
        </SectionBlock>

        <SectionBlock title="SOCIALS">
          <div class="flex flex-row gap-2 justify-center">
            {#each socialLinks as link (link.href)}
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
          {#each projectItems as item (item.link)}
            {#if item.showOnLanding}
              <ShowcaseBlock {item} />
            {/if}
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
          {#each pageLinksWithBase as link (link.href)}
            <a href={link.href} class="underline">{link.text}</a>
          {/each}
        </div>
      </div>
    </div>

    <div class="w-fit hidden lg:flex flex-col items-start mt-2">
      {#each pageLinksWithBase as link (link.href)}
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
      class={`flex flex-col items-end justify-center gap-1 text-fd-secondary-foreground font-mono text-xs ${showColophon ? "block" : "hidden"}`}
    >
      <p>BOBCHENG 2026</p>
      <p>INTER, NOTOSANS, JETBRAINS_MONO</p>
      <p>
        Design inspired from
        <a href="https://www.seyityilmaz.com/" class="underline">Seyit Yilmaz</a
        >,
        <a href="https://www.alexchantastic.com/" class="underline">Alex Chan</a
        >,
        <a href="https://antfu.me/" class="underline">Anthony Fu</a>
      </p>
    </div>
  </div>
</main>
