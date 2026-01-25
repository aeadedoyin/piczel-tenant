<script setup lang="ts">
useHead({
  title: 'Starred | Piczel',
})

const route = useRoute()

const tabs = [
  { label: 'Collections', value: 'collections', to: '/gallery/starred/collections' },
  { label: 'Photos', value: 'photos', to: '/gallery/starred/photos' },
  { label: 'Videos', value: 'videos', to: '/gallery/starred/videos' },
]

const activeTab = computed(() => {
  const path = route.path
  const tab = tabs.find(t => path.startsWith(t.to))
  return tab?.value || 'collections'
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Starred
      </h1>
      <p class="text-muted-foreground">
        Your favorite photos and collections.
      </p>
    </div>

    <ShadTabs :model-value="activeTab">
      <ShadTabsList>
        <ShadTabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          as-child
          class="px-4 py-1"
          :value="tab.value"
        >
          <NuxtLink :to="tab.to">
            {{ tab.label }}
          </NuxtLink>
        </ShadTabsTrigger>
      </ShadTabsList>
    </ShadTabs>

    <NuxtPage />
  </div>
</template>
