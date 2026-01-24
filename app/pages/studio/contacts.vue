<script setup lang="ts">
definePageMeta({
  title: 'Contacts',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Contacts
        </h1>
        <p class="text-muted-foreground">
          Manage your client contacts and leads.
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
        Add Contact
      </button>
    </div>

    <!-- Contacts List -->
    <div class="space-y-4">
      <div
        v-for="i in 6" :key="i" class="
          bg-card flex items-center justify-between rounded-xl border p-4
        "
      >
        <div class="flex items-center gap-4">
          <div
            class="
              bg-muted flex size-10 items-center justify-center rounded-full
            "
          >
            <LucideUser class="text-muted-foreground size-5" />
          </div>
          <div>
            <h3 class="font-medium">
              Contact {{ i }}
            </h3>
            <p class="text-muted-foreground text-sm">
              contact{{ i }}@example.com
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-muted-foreground text-sm">3 projects</span>
          <LucideMoreHorizontal class="text-muted-foreground size-4" />
        </div>
      </div>
    </div>
  </div>
</template>
