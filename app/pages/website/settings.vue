<script setup lang="ts">
definePageMeta({
  title: 'Website Settings',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Website Settings
      </h1>
      <p class="text-muted-foreground">
        Configure your website domain, SEO, and other settings.
      </p>
    </div>

    <div class="max-w-2xl space-y-6">
      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          Domain
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          yourname.piczel.app
        </p>
        <button
          class="
            hover:bg-accent
            mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2
            text-sm font-medium
          "
        >
          Connect Custom Domain
        </button>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          SEO Settings
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Search engine optimization settings coming soon...
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          Analytics
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Connect Google Analytics or other tracking...
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <h3 class="font-medium">
          Social Links
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Social media links configuration coming soon...
        </p>
      </div>
    </div>
  </div>
</template>
