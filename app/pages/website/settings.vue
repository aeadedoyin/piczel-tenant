<script setup lang="ts">
useHead({
  title: 'Website Settings | Piczel',
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
      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          Domain
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          yourname.piczel.app
        </p>
        <button
          class="
            mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2
            text-sm font-medium
            hover:bg-accent
          "
        >
          Connect Custom Domain
        </button>
      </div>

      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          SEO Settings
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Search engine optimization settings coming soon...
        </p>
      </div>

      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          Analytics
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Connect Google Analytics or other tracking...
        </p>
      </div>

      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-medium">
          Social Links
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Social media links configuration coming soon...
        </p>
      </div>
    </div>
  </div>
</template>
