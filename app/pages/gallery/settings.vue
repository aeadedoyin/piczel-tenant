<script setup lang="ts">
useHead({
  title: 'Gallery Settings | Piczel',
})

const route = useRoute()

const tabs = [
  { label: 'Branding', value: 'branding', to: '/gallery/settings/branding' },
  { label: 'Watermark Presets', value: 'watermarks', to: '/gallery/settings/watermarks' },
  { label: 'Email Templates', value: 'emails', to: '/gallery/settings/emails' },
  { label: 'Preferences', value: 'preferences', to: '/gallery/settings/preferences' },
  { label: 'Integrations', value: 'integrations', to: '/gallery/settings/integrations' },
]

const activeTab = computed(() => {
  const path = route.path
  const tab = tabs.find(t => path.startsWith(t.to))
  return tab?.value || 'branding'
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Gallery Settings
      </h1>
      <p class="text-muted-foreground">
        Configure your gallery preferences and defaults.
      </p>
    </div>

    <ShadTabs :model-value="activeTab">
      <ShadTabsList>
        <ShadTabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          as-child
          :value="tab.value"
        >
          <NuxtLink :to="tab.to">
            {{ tab.label }}
          </NuxtLink>
        </ShadTabsTrigger>
      </ShadTabsList>
    </ShadTabs>

    <div class="max-w-2xl">
      <NuxtPage />
    </div>
  </div>
</template>
