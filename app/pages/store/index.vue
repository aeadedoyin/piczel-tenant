<script setup lang="ts">
definePageMeta({
  title: 'Store',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Store
      </h1>
      <p class="text-muted-foreground">
        Manage your product catalog and orders.
      </p>
    </div>

    <!-- Stats -->
    <div
      class="
        grid gap-4
        md:grid-cols-4
      "
    >
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucidePackage class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Products</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          24
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideShoppingCart class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Orders</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          156
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideDollarSign class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Revenue</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          $12,450
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideTruck class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Pending</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          8
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div class="bg-muted/50 rounded-xl border p-12 text-center">
      <LucideShoppingBag class="text-muted-foreground mx-auto size-12" />
      <h3 class="mt-4 font-medium">
        Store Overview
      </h3>
      <p class="text-muted-foreground mt-2 text-sm">
        Quick access to orders and products.
      </p>
    </div>
  </div>
</template>
