<script setup lang="ts">
useHead({
  title: 'Edit Site | Piczel',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Edit Site
      </h1>
      <p class="text-muted-foreground">
        Customize your portfolio.
      </p>
    </div>

    <!-- Editor Placeholder -->
    <div class="rounded-xl border bg-muted/50 p-12 text-center">
      <LucidePencil class="mx-auto size-12 text-muted-foreground" />
      <h3 class="mt-4 font-medium">
        Portfolio Editor
      </h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Drag-and-drop portfolio editor coming soon...
      </p>
    </div>

    <!-- Quick Settings -->
    <div class="max-w-2xl space-y-6">
      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          Site Information
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Basic site configuration coming soon...
        </p>
      </div>

      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          Theme & Colors
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Theme customization coming soon...
        </p>
      </div>

      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          Pages & Sections
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Page management coming soon...
        </p>
      </div>
    </div>
  </div>
</template>
