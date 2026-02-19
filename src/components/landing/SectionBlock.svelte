<script>
  let props = $props();
</script>

<div class="w-fit flex flex-col items-start mt-2">
  <div class="w-fit mb-1">
    <p
      class="text-[0.7em] font-bold text-(--fd-secondary-foreground) font-mono"
    >
      {props.title}
    </p>
  </div>
  {@render props.children()}
</div>
