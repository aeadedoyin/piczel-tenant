<script setup lang="ts">
definePageMeta({
  title: 'Edit Site',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Edit Site
      </h1>
      <p class="text-muted-foreground">
        Customize your portfolio website.
      </p>
    </div>

    <!-- Editor Placeholder -->
    <div class="bg-muted/50 rounded-xl border p-12 text-center">
      <LucidePencil class="text-muted-foreground mx-auto size-12" />
      <h3 class="mt-4 font-medium">
        Website Editor
      </h3>
      <p class="text-muted-foreground mt-2 text-sm">
        Drag-and-drop website editor coming soon...
      </p>
    </div>

    <!-- Quick Settings -->
    <div class="max-w-2xl space-y-6">
      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          Site Information
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Basic site configuration coming soon...
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          Theme & Colors
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Theme customization coming soon...
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          Pages & Sections
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Page management coming soon...
        </p>
      </div>
    </div>
  </div>
</template>
