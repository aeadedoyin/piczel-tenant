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
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideFolderOpen class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Collections</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          12
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideStar class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Starred</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          48
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideImage class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Total Photos</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          2,340
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div class="bg-muted/50 rounded-xl border p-12 text-center">
      <LucideImage class="text-muted-foreground mx-auto size-12" />
      <h3 class="mt-4 font-medium">
        Gallery Overview
      </h3>
      <p class="text-muted-foreground mt-2 text-sm">
        Quick access to your collections and recent uploads.
      </p>
    </div>
  </div>
</template>
