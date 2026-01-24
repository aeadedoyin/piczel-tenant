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
          inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm
          font-medium text-primary-foreground
          hover:bg-primary/90
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
          flex items-center justify-between rounded-xl border bg-card p-4
        "
      >
        <div class="flex items-center gap-4">
          <div
            class="
              flex size-10 items-center justify-center rounded-full bg-muted
            "
          >
            <LucideUser class="size-5 text-muted-foreground" />
          </div>
          <div>
            <h3 class="font-medium">
              Contact {{ i }}
            </h3>
            <p class="text-sm text-muted-foreground">
              contact{{ i }}@example.com
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-muted-foreground">3 projects</span>
          <LucideMoreHorizontal class="size-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  </div>
</template>
