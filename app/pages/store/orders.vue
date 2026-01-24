<script setup lang="ts">
definePageMeta({
  title: 'Orders',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Orders
      </h1>
      <p class="text-muted-foreground">
        Manage and fulfill customer orders.
      </p>
    </div>

    <!-- Filters -->
    <div class="flex gap-2">
      <button
        class="
          rounded-md bg-primary px-3 py-1.5 text-sm font-medium
          text-primary-foreground
        "
      >
        All
      </button>
      <button
        class="
          rounded-md border px-3 py-1.5 text-sm font-medium
          hover:bg-accent
        "
      >
        Pending
      </button>
      <button
        class="
          rounded-md border px-3 py-1.5 text-sm font-medium
          hover:bg-accent
        "
      >
        Processing
      </button>
      <button
        class="
          rounded-md border px-3 py-1.5 text-sm font-medium
          hover:bg-accent
        "
      >
        Completed
      </button>
    </div>

    <!-- Orders List -->
    <div class="space-y-4">
      <div
        v-for="i in 6" :key="i" class="
          flex items-center justify-between rounded-xl border bg-card p-4
        "
      >
        <div class="flex items-center gap-4">
          <div class="size-12 rounded-lg bg-muted" />
          <div>
            <h3 class="font-medium">
              Order #{{ 10000 + i }}
            </h3>
            <p class="text-sm text-muted-foreground">
              2 items - Client Name
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="font-medium">
              ${{ 150 * i }}
            </div>
            <span
              class="rounded-full px-2 py-1 text-xs font-medium" :class="[
                i % 3 === 0 ? 'bg-green-100 text-green-700' : i % 2 === 0 ? `
                  bg-blue-100 text-blue-700
                ` : `bg-yellow-100 text-yellow-700`,
              ]"
            >
              {{ i % 3 === 0 ? 'Completed' : i % 2 === 0 ? 'Processing' : 'Pending' }}
            </span>
          </div>
          <LucideMoreHorizontal class="size-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  </div>
</template>
