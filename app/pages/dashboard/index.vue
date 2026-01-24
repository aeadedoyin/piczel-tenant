<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Dashboard
      </h1>
      <p class="text-muted-foreground">
        Welcome back! Here's an overview of your photography business.
      </p>
    </div>

    <!-- Stats Grid -->
    <div
      class="
        grid gap-4
        md:grid-cols-2
        lg:grid-cols-4
      "
    >
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideDollarSign class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Revenue</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          $12,450
        </div>
        <p class="text-muted-foreground text-xs">
          +12% from last month
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideUsers class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Clients</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          48
        </div>
        <p class="text-muted-foreground text-xs">
          +3 new this month
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideImage class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Photos</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          2,340
        </div>
        <p class="text-muted-foreground text-xs">
          +180 uploaded this week
        </p>
      </div>

      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideShoppingBag class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Orders</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          24
        </div>
        <p class="text-muted-foreground text-xs">
          8 pending delivery
        </p>
      </div>
    </div>

    <!-- Placeholder Content -->
    <div
      class="
        grid gap-4
        md:grid-cols-2
      "
    >
      <div class="bg-muted/50 rounded-xl border p-6">
        <h3 class="font-medium">
          Recent Activity
        </h3>
        <p class="text-muted-foreground mt-2 text-sm">
          Activity feed coming soon...
        </p>
      </div>
      <div class="bg-muted/50 rounded-xl border p-6">
        <h3 class="font-medium">
          Quick Actions
        </h3>
        <p class="text-muted-foreground mt-2 text-sm">
          Quick actions coming soon...
        </p>
      </div>
    </div>
  </div>
</template>
