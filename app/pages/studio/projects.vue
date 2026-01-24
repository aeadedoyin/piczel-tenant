<script setup lang="ts">
definePageMeta({
  title: 'Projects',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Projects
        </h1>
        <p class="text-muted-foreground">
          Track and manage your photography projects.
        </p>
      </div>
      <button
        class="
          bg-primary text-primary-foreground
          hover:bg-primary/90
          inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm
          font-medium
        "
      >
        <LucidePlus class="size-4" />
        New Project
      </button>
    </div>

    <!-- Projects List -->
    <div class="space-y-4">
      <div
        v-for="i in 5" :key="i" class="
          bg-card flex items-center justify-between rounded-xl border p-4
        "
      >
        <div class="flex items-center gap-4">
          <div class="bg-muted size-10 rounded-lg" />
          <div>
            <h3 class="font-medium">
              Project {{ i }}
            </h3>
            <p class="text-muted-foreground text-sm">
              Client Name - Wedding Photography
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span
            class="
              rounded-full bg-green-100 px-2 py-1 text-xs font-medium
              text-green-700
            "
          >Active</span>
          <LucideMoreHorizontal class="text-muted-foreground size-4" />
        </div>
      </div>
    </div>
  </div>
</template>
