<script setup lang="ts">
import type { Component } from 'vue'
import { LucideTrendingDown, LucideTrendingUp } from 'lucide-vue-next'

defineProps<{
  label: string
  value: string | number
  change?: number
  icon: Component
}>()
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border bg-card p-6">
    <!-- Background Icon -->
    <component
      :is="icon"
      class="
        absolute -top-2 -right-2 size-20 rotate-12 text-muted-foreground/10
      "
      :stroke-width="1.5"
    />

    <!-- Content -->
    <div class="relative">
      <span class="text-sm font-medium text-muted-foreground">
        {{ label }}
      </span>

      <div class="mt-1 text-2xl font-bold">
        {{ typeof value === 'number' ? value.toLocaleString() : value }}
      </div>

      <!-- Change Indicator -->
      <div
        v-if="change !== undefined"
        class="mt-2 flex items-center gap-1 text-sm font-medium"
        :class="change >= 0 ? 'text-emerald-600' : 'text-red-600'"
      >
        <LucideTrendingUp v-if="change >= 0" class="size-4" />
        <LucideTrendingDown v-else class="size-4" />
        <span>{{ change >= 0 ? '+' : '' }}{{ change }}%</span>
        <span class="font-normal text-muted-foreground">vs last month</span>
      </div>
    </div>
  </div>
</template>
