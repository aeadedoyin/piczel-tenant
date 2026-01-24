<script setup lang="ts">
definePageMeta({
  title: 'Product Catalog',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Product Catalog
        </h1>
        <p class="text-muted-foreground">
          Manage your products and pricing.
        </p>
      </div>
      <button
        class="
          inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm
          font-medium text-primary-foreground
          hover:bg-primary/90
        "
      >
        <LucidePlus class="size-4" />
        Add Product
      </button>
    </div>

    <!-- Product Grid -->
    <div
      class="
        grid gap-4
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      <div
        v-for="i in 6" :key="i" class="
          overflow-hidden rounded-xl border bg-card
        "
      >
        <div class="aspect-square bg-muted" />
        <div class="p-4">
          <h3 class="font-medium">
            Product {{ i }}
          </h3>
          <p class="text-sm text-muted-foreground">
            Print - 8x10
          </p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-medium">${{ 25 * i }}</span>
            <span class="text-sm text-muted-foreground">12 sold</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
