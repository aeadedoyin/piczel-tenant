<script setup lang="ts">
useHead({
  title: 'Studio | Piczel',
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Studio Manager
      </h1>
      <p class="text-muted-foreground">
        Manage your projects, clients, bookings, and payments.
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
          <LucideFolderKanban class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Active Projects</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          8
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideUsers class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Contacts</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          156
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideCalendar class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Upcoming</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          5
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideCoins class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Pending</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          ₦840,000
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div class="rounded-xl border bg-muted/50 p-12 text-center">
      <LucideBriefcase class="mx-auto size-12 text-muted-foreground" />
      <h3 class="mt-4 font-medium">
        Studio Overview
      </h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Quick access to your studio management tools.
      </p>
    </div>
  </div>
</template>
