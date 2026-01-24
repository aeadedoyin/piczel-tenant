<script setup lang="ts">
definePageMeta({
  title: 'Integrations - Gallery Settings',
})

const integrations = [
  {
    id: 'lightroom',
    name: 'Lightroom Plugin',
    description: 'Download the official Piczel Lightroom Plugin that allows you to upload directly from Lightroom Classic to Piczel, re-publish new edits easily and sync collections structure for easy organizing.',
    icon: resolveComponent('LucideCamera'),
    iconBg: 'bg-blue-900',
    action: 'Download Plugin',
    actionIcon: resolveComponent('LucideDownload'),
    learnMore: true,
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Enable Google Analytics on your collections by entering your Google Analytics Tracking ID.',
    icon: resolveComponent('LucideBarChart2'),
    iconBg: 'bg-amber-500',
    action: 'Connect Google Analytics',
    actionIcon: resolveComponent('LucidePlus'),
    learnMore: false,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Automatically backup your photos to Dropbox. Keep your originals safe and synced across all your devices.',
    icon: resolveComponent('LucideCloud'),
    iconBg: 'bg-blue-500',
    action: 'Connect Dropbox',
    actionIcon: resolveComponent('LucidePlus'),
    learnMore: false,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect Piczel to thousands of apps with Zapier. Automate workflows like adding new clients to your CRM or sending notifications.',
    icon: resolveComponent('LucideZap'),
    iconBg: 'bg-orange-500',
    action: 'Connect Zapier',
    actionIcon: resolveComponent('LucidePlus'),
    learnMore: true,
  },
]
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <div
      v-for="integration in integrations"
      :key="integration.id"
      class="flex gap-8 rounded-2xl bg-muted/40 p-8"
    >
      <!-- Logo Area -->
      <div class="flex w-40 shrink-0 items-center justify-center">
        <div class="flex items-center gap-3">
          <div
            class="
              flex size-12 items-center justify-center rounded-lg text-white
            "
            :class="integration.iconBg"
          >
            <component :is="integration.icon" class="size-6" />
          </div>
          <LucideArrowRight class="size-4 text-muted-foreground/50" />
          <div
            class="
              flex size-12 items-center justify-center rounded-lg border
              border-border bg-background
            "
          >
            <Icon name="piczel:piczel-logo-logomark" size="24" />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h3 class="font-semibold">
          {{ integration.name }}
        </h3>
        <p class="mt-2 text-sm/relaxed text-muted-foreground">
          {{ integration.description }}
          <a
            v-if="integration.learnMore" class="
              text-emerald-500
              hover:underline
            " href="#"
          >Learn more</a>
        </p>
        <button
          class="
            mt-4 flex items-center gap-2 text-sm font-medium text-emerald-500
            hover:text-emerald-600
          "
        >
          <component :is="integration.actionIcon" class="size-4" />
          {{ integration.action }}
        </button>
      </div>
    </div>
  </div>
</template>
