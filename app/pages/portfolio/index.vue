<script setup lang="ts">
useHead({
  title: 'Portfolio | Piczel',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Portfolio
      </h1>
      <p class="text-muted-foreground">
        Manage your portfolio and online presence.
      </p>
    </div>

    <!-- Portfolio Preview -->
    <div class="overflow-hidden rounded-xl border bg-card">
      <div class="flex aspect-video items-center justify-center bg-muted">
        <div class="text-center">
          <LucideGlobe class="mx-auto size-12 text-muted-foreground" />
          <p class="mt-2 text-muted-foreground">
            Portfolio Preview
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between p-4">
        <div>
          <h3 class="font-medium">
            yourname.piczel.app
          </h3>
          <p class="text-sm text-muted-foreground">
            Last updated 2 days ago
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="
              inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm
              font-medium
              hover:bg-accent
            "
          >
            <LucideExternalLink class="size-4" />
            Visit Site
          </button>
          <button
            class="
              inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2
              text-sm font-medium text-primary-foreground
              hover:bg-primary/90
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
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideEye class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Page Views</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          1,234
        </div>
        <p class="text-xs text-muted-foreground">
          This month
        </p>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideUsers class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Visitors</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          456
        </div>
        <p class="text-xs text-muted-foreground">
          Unique this month
        </p>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideMessageSquare class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Inquiries</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          12
        </div>
        <p class="text-xs text-muted-foreground">
          This month
        </p>
      </div>
    </div>
  </div>
</template>
