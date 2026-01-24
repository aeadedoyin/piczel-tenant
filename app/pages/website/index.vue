<script setup lang="ts">
definePageMeta({
  title: 'Website',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Website
      </h1>
      <p class="text-muted-foreground">
        Manage your portfolio website and online presence.
      </p>
    </div>

    <!-- Website Preview -->
    <div class="bg-card overflow-hidden rounded-xl border">
      <div class="bg-muted flex aspect-video items-center justify-center">
        <div class="text-center">
          <LucideGlobe class="text-muted-foreground mx-auto size-12" />
          <p class="text-muted-foreground mt-2">
            Website Preview
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between p-4">
        <div>
          <h3 class="font-medium">
            yourname.piczel.app
          </h3>
          <p class="text-muted-foreground text-sm">
            Last updated 2 days ago
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="
              hover:bg-accent
              inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm
              font-medium
            "
          >
            <LucideExternalLink class="size-4" />
            Visit Site
          </button>
          <button
            class="
              bg-primary text-primary-foreground
              hover:bg-primary/90
              inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm
              font-medium
            "
          >
            <LucidePencil class="size-4" />
            Edit Site
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div
      class="
        grid gap-4
        md:grid-cols-3
      "
    >
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideEye class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Page Views</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          1,234
        </div>
        <p class="text-muted-foreground text-xs">
          This month
        </p>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideUsers class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Visitors</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          456
        </div>
        <p class="text-muted-foreground text-xs">
          Unique this month
        </p>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideMessageSquare class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Inquiries</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          12
        </div>
        <p class="text-muted-foreground text-xs">
          This month
        </p>
      </div>
    </div>
  </div>
</template>
