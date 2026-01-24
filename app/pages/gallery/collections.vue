<script setup lang="ts">
definePageMeta({
  title: 'Collections',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Collections
        </h1>
        <p class="text-muted-foreground">
          Organize your photos into collections.
        </p>
      </div>
      <button
        class="
          inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm
          font-medium text-primary-foreground
          hover:bg-primary/90
        "
      >
        <LucidePlus class="size-4" />
        New Collection
      </button>
    </div>

    <!-- Placeholder Grid -->
    <div
      class="
        grid gap-4
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      <div
        v-for="i in 6" :key="i" class="
          group overflow-hidden rounded-xl border bg-card
        "
      >
        <div class="aspect-video bg-muted" />
        <div class="p-4">
          <h3 class="font-medium">
            Collection {{ i }}
          </h3>
          <p class="text-sm text-muted-foreground">
            24 photos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
