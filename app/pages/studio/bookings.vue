<script setup lang="ts">
definePageMeta({
  title: 'Bookings',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Bookings
        </h1>
        <p class="text-muted-foreground">
          Manage your photography sessions and appointments.
        </p>
      </div>
      <button
        class="
          bg-primary text-primary-foreground
          hover:bg-primary/90
          inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm
          font-medium
        "
      >
        <LucidePlus class="size-4" />
        New Booking
      </button>
    </div>

    <!-- Calendar Placeholder -->
    <div class="bg-muted/50 rounded-xl border p-12 text-center">
      <LucideCalendar class="text-muted-foreground mx-auto size-12" />
      <h3 class="mt-4 font-medium">
        Booking Calendar
      </h3>
      <p class="text-muted-foreground mt-2 text-sm">
        Calendar view coming soon...
      </p>
    </div>

    <!-- Upcoming Bookings -->
    <div>
      <h2 class="mb-4 text-lg font-medium">
        Upcoming Sessions
      </h2>
      <div class="space-y-4">
        <div
          v-for="i in 3" :key="i" class="
            bg-card flex items-center justify-between rounded-xl border p-4
          "
        >
          <div class="flex items-center gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold">
                {{ 15 + i }}
              </div>
              <div class="text-muted-foreground text-xs">
                Jan
              </div>
            </div>
            <div>
              <h3 class="font-medium">
                Wedding Photography Session
              </h3>
              <p class="text-muted-foreground text-sm">
                Client Name - 2:00 PM
              </p>
            </div>
          </div>
          <span
            class="
              rounded-full bg-blue-100 px-2 py-1 text-xs font-medium
              text-blue-700
            "
          >Confirmed</span>
        </div>
      </div>
    </div>
  </div>
</template>
