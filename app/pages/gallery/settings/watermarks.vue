<script setup lang="ts">
useHead({
  title: 'Watermarks | Piczel',
})

const applyToWebSize = ref(false)
</script>

<template>
  <div class="max-w-xl space-y-12">
    <!-- Watermark -->
    <section>
      <h3 class="text-sm font-medium">
        Watermark
      </h3>
      <button
        class="
          mt-4 flex h-44 w-48 items-center justify-center rounded-lg bg-muted/50
          text-muted-foreground/40 transition-all duration-200
          hover:bg-muted hover:text-muted-foreground/60
        "
      >
        <LucidePlus class="size-8 stroke-[1.5]" />
      </button>
      <p class="mt-4 text-sm/relaxed text-muted-foreground">
        Protect your photos with custom watermarks. Watermarks will not appear on prints ordered
        through Store.
        <a
          class="
            text-emerald-500
            hover:underline
          " href="#"
        >Learn more</a>
      </p>
    </section>

    <!-- Apply watermark to web size downloads -->
    <section>
      <h3 class="text-sm font-medium">
        Apply watermark to web size downloads
      </h3>
      <div class="mt-4 flex items-center gap-3">
        <ShadSwitch
          v-model:checked="applyToWebSize"
          class="data-[state=checked]:bg-emerald-500"
        />
        <span class="text-sm text-muted-foreground">{{ applyToWebSize ? 'On' : 'Off' }}</span>
      </div>
      <p class="mt-4 text-sm/relaxed text-muted-foreground">
        Enable to apply watermark to web size downloads from your collections and web size
        downloads sold through Store.
      </p>
    </section>
  </div>
</template>
