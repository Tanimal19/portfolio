<script lang="ts">
  import AnimateExternalLink from "../components/AnimateExternalLink.svelte";
  import AnimatePageLink from "../components/AnimatePageLink.svelte";
  import SectionBlock from "../components/landing/SectionBlock.svelte";

  const socials = [
    {
      href: "https://github.com/Tanimal19",
      text: "Github",
      colorhex: "#6cc644",
    },
    {
      href: "https://www.linkedin.com/in/poyuncheng-bob/",
      text: "LinkedIn",
      colorhex: "#004182",
    },
    {
      href: "https://www.instagram.com/_tanimal_x/",
      text: "Instagram",
      colorhex: "#FF0069",
    },
  ];

  const pageLinks = [
    { href: "/blog", text: "Writings" },
    { href: "/poyuncheng_cv.pdf", text: "Resume" },
  ];
</script>

<main>
  <div class="relative flex flex-col lg:flex-row lg:gap-30">
    <div class="flex flex-col gap-4 lg:gap-8 mb-8">
      <div class="w-fit flex flex-col items-start mt-2">
        <div class="max-w-2xl text-left flex flex-col gap-2">
          <p>
            Welcome to my website! I'm Bob Cheng (鄭博允 Po-Yun Cheng),
            currently study
            <AnimateExternalLink
              href="https://www.csie.ntu.edu.tw/"
              text="computer science"
            />
            at National Taiwan University.
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
            {#each socials as social}
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                class="text-base group w-fit cursor-pointer flex flex-row items-center px-1 hover:underline"
              >
                <span
                  class="size-2 inline-block mr-2"
                  style={`background-color: ${social.colorhex}`}
                ></span>
                {social.text}
              </a>
            {/each}
          </div>
        </SectionBlock>
      </div>

      <div class="w-fit flex flex-col items-start mt-2 lg:hidden">
        <div class="w-fit mb-1">
          <p
            class="text-[0.7em] font-bold text-(--fd-secondary-foreground) font-mono"
          >
            MORE
          </p>
        </div>
        <div class="flex flex-row gap-6 justify-center">
          {#each pageLinks as link}
            <a href={link.href} class="underline">{link.text}</a>
          {/each}
        </div>
      </div>
    </div>

    <div class="w-fit hidden lg:flex flex-col items-start mt-2">
      {#each pageLinks as link}
        <AnimatePageLink href={link.href} text={link.text} />
      {/each}
    </div>
  </div>

  <div
    class="flex flex-col items-end justify-center gap-2 mt-10 mb-20 text-fd-secondary-foreground font-mono text-xs"
  >
    <span class="size-2 inline-block bg-fd-foreground"></span>
    <p>BOBCHENG 2025</p>
    <p>SVELTEKIT, TAILWINDCSS</p>
    <p>INTER, NOTOSERIF, JETBRAINS_MONO</p>
  </div>
</main>
