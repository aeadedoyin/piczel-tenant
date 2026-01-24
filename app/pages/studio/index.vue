<script setup lang="ts">
definePageMeta({
  title: 'Studio',
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
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideFolderKanban class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Active Projects</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          8
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideUsers class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Contacts</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          156
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideCalendar class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Upcoming</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          5
        </div>
      </div>
      <div class="bg-card rounded-xl border p-6">
        <div class="flex items-center gap-2">
          <LucideDollarSign class="text-muted-foreground size-4" />
          <span class="text-muted-foreground text-sm font-medium">Pending</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          $4,200
        </div>
      </div>
    </div>

    <!-- Placeholder -->
    <div class="bg-muted/50 rounded-xl border p-12 text-center">
      <LucideBriefcase class="text-muted-foreground mx-auto size-12" />
      <h3 class="mt-4 font-medium">
        Studio Overview
      </h3>
      <p class="text-muted-foreground mt-2 text-sm">
        Quick access to your studio management tools.
      </p>
    </div>
  </div>
</template>
