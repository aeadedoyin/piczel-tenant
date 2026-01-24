<script setup lang="ts">
definePageMeta({
  title: 'Gallery',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Gallery
      </h1>
      <p class="text-muted-foreground">
        Manage your photo collections and client galleries.
      </p>
    </div>

    <!-- Stats -->
    <div
      class="
        grid gap-4
        md:grid-cols-3
      "
    >
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideFolderOpen class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Collections</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          12
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideStar class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Starred</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          48
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideImage class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Total Photos</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          2,340
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div class="rounded-xl border bg-muted/50 p-12 text-center">
      <LucideImage class="mx-auto size-12 text-muted-foreground" />
      <h3 class="mt-4 font-medium">
        Gallery Overview
      </h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Quick access to your collections and recent uploads.
      </p>
    </div>
  </div>
</template>
