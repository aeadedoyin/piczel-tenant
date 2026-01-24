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
          bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm
          font-medium
        "
      >
        All
      </button>
      <button
        class="
          hover:bg-accent
          rounded-md border px-3 py-1.5 text-sm font-medium
        "
      >
        Pending
      </button>
      <button
        class="
          hover:bg-accent
          rounded-md border px-3 py-1.5 text-sm font-medium
        "
      >
        Processing
      </button>
      <button
        class="
          hover:bg-accent
          rounded-md border px-3 py-1.5 text-sm font-medium
        "
      >
        Completed
      </button>
    </div>

    <!-- Orders List -->
    <div class="space-y-4">
      <div
        v-for="i in 6" :key="i" class="
          bg-card flex items-center justify-between rounded-xl border p-4
        "
      >
        <div class="flex items-center gap-4">
          <div class="bg-muted size-12 rounded-lg" />
          <div>
            <h3 class="font-medium">
              Order #{{ 10000 + i }}
            </h3>
            <p class="text-muted-foreground text-sm">
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
          <LucideMoreHorizontal class="text-muted-foreground size-4" />
        </div>
      </div>
    </div>
  </div>
</template>
