<script setup lang="ts">
definePageMeta({
  title: 'Payments',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Payments
      </h1>
      <p class="text-muted-foreground">
        Track invoices and payment status.
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
          <LucideCheckCircle class="size-4 text-green-500" />
          <span class="text-muted-foreground text-sm font-medium">Received</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          $8,250
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideClock class="size-4 text-yellow-500" />
          <span class="text-muted-foreground text-sm font-medium">Pending</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          $4,200
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideAlertCircle class="size-4 text-red-500" />
          <span class="text-muted-foreground text-sm font-medium">Overdue</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          $1,500
        </div>
      </div>
    </div>

    <!-- Payments List -->
    <div>
      <h2 class="mb-4 text-lg font-medium">
        Recent Transactions
      </h2>
      <div class="space-y-4">
        <div
          v-for="i in 5" :key="i" class="
            bg-card flex items-center justify-between rounded-xl border p-4
          "
        >
          <div>
            <h3 class="font-medium">
              Invoice #{{ 1000 + i }}
            </h3>
            <p class="text-muted-foreground text-sm">
              Client Name - Wedding Package
            </p>
          </div>
          <div class="text-right">
            <div class="font-medium">
              ${{ 500 * i }}
            </div>
            <span
              class="rounded-full px-2 py-1 text-xs font-medium" :class="[
                i % 3 === 0 ? 'bg-red-100 text-red-700' : i % 2 === 0 ? `
                  bg-yellow-100 text-yellow-700
                ` : `bg-green-100 text-green-700`,
              ]"
            >
              {{ i % 3 === 0 ? 'Overdue' : i % 2 === 0 ? 'Pending' : 'Paid' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
