<script setup lang="ts">
useHead({
  title: 'Shop | Piczel',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Shop
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
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucidePackage class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Products</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          24
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideShoppingCart class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Orders</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          156
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideCoins class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Revenue</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          ₦2,120,450
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideTruck class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Pending</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          8
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div class="rounded-xl border bg-muted/50 p-12 text-center">
      <LucideShoppingBag class="mx-auto size-12 text-muted-foreground" />
      <h3 class="mt-4 font-medium">
        Shop Overview
      </h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Quick access to orders and products.
      </p>
    </div>
  </div>
</template>
