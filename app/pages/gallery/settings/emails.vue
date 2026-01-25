<script setup lang="ts">
definePageMeta({
  title: 'Email Templates - Gallery Settings',
})

const collectionTemplates = ref([
  { id: 1, name: 'Wedding Sample Email' },
  { id: 2, name: 'Newborn Sample Email' },
])

const expiryTemplates = ref([
  { id: 1, name: 'Auto Expiry Reminder' },
])
</script>

<template>
  <div class="max-w-xl space-y-12">
    <!-- Collection Sharing Email -->
    <section>
      <h3 class="font-semibold">
        Collection Sharing Email
      </h3>
      <div class="mt-4 divide-y divide-border border-t border-border">
        <button
          v-for="template in collectionTemplates"
          :key="template.id"
          class="
            flex w-full cursor-pointer items-center justify-between px-3 py-4
            transition-colors
            hover:bg-muted/50
          "
        >
          <span class="text-sm">{{ template.name }}</span>
          <LucideMoreHorizontal class="size-4 text-muted-foreground" />
        </button>
      </div>
      <button
        class="
          mt-4 flex items-center gap-2 text-sm font-medium text-emerald-500
          hover:text-emerald-600
        "
      >
        <LucidePlus class="size-4" />
        Add Email Template
      </button>
      <p class="mt-4 text-sm/relaxed text-muted-foreground">
        Create a custom email template and save time when sharing collections with your clients.
        <a
          class="
            text-emerald-500
            hover:underline
          " href="#"
        >Learn more</a>
      </p>
    </section>

    <!-- Auto Expiry Email -->
    <section>
      <h3 class="font-semibold">
        Auto Expiry Email
      </h3>
      <div class="mt-4 divide-y divide-border border-t border-border">
        <button
          v-for="template in expiryTemplates"
          :key="template.id"
          class="
            flex w-full cursor-pointer items-center justify-between px-3 py-4
            transition-colors
            hover:bg-muted/50
          "
        >
          <span class="text-sm">{{ template.name }}</span>
          <LucideMoreHorizontal class="size-4 text-muted-foreground" />
        </button>
      </div>
      <p class="mt-4 text-sm/relaxed text-muted-foreground">
        You can send reminder emails to individual email addresses and/or to client emails that
        belong to an activity list.
        <a
          class="
            text-emerald-500
            hover:underline
          " href="#"
        >Learn more</a>
      </p>
    </section>
  </div>
</template>
