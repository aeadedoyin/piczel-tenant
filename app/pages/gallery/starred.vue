<script setup lang="ts">
definePageMeta({
  title: 'Starred',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Starred Photos
      </h1>
      <p class="text-muted-foreground">
        Your favorite and highlighted photos.
      </p>
    </div>

    <!-- Placeholder Grid -->
    <div
      class="
        grid grid-cols-2 gap-4
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      <div
        v-for="i in 8" :key="i" class="
          group relative aspect-square overflow-hidden rounded-lg bg-muted
        "
      >
        <div class="absolute top-2 right-2">
          <LucideStar class="size-5 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    </div>
  </div>
</template>
