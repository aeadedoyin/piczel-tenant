<script setup lang="ts">
import type { Collection, CreateCollectionData } from '@/types/gallery'

const props = defineProps<{
  collection: Collection
}>()

const emit = defineEmits<{
  save: [data: CreateCollectionData]
}>()

const formData = reactive({
  title: props.collection.title,
  description: props.collection.description || '',
  category: props.collection.category,
  eventDate: props.collection.eventDate || '',
})

const isDirty = computed(() => {
  return (
    formData.title !== props.collection.title
    || formData.description !== (props.collection.description || '')
    || formData.category !== props.collection.category
    || formData.eventDate !== (props.collection.eventDate || '')
  )
})

function handleSave() {
  emit('save', { ...formData })
}

// Sync when collection changes
watch(() => props.collection, (c) => {
  formData.title = c.title
  formData.description = c.description || ''
  formData.category = c.category
  formData.eventDate = c.eventDate || ''
}, { deep: true })
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        General Settings
      </h3>
      <p class="text-sm text-muted-foreground">
        Basic information about this collection.
      </p>
    </div>

    <ShadSeparator />

    <div class="space-y-4 max-w-lg">
      <!-- Title -->
      <div class="space-y-2">
        <ShadLabel for="title">
          Collection Title
        </ShadLabel>
        <ShadInput
          id="title"
          v-model="formData.title"
          placeholder="Enter collection title"
        />
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <ShadLabel for="description">
          Description
        </ShadLabel>
        <ShadTextarea
          id="description"
          v-model="formData.description"
          placeholder="Add a description..."
          :rows="3"
        />
      </div>

      <!-- Category -->
      <div class="space-y-2">
        <ShadLabel for="category">
          Category
        </ShadLabel>
        <ShadSelect v-model="formData.category">
          <ShadSelectTrigger>
            <ShadSelectValue placeholder="Select category" />
          </ShadSelectTrigger>
          <ShadSelectContent>
            <ShadSelectItem
              v-for="opt in collectionCategoryOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </ShadSelectItem>
          </ShadSelectContent>
        </ShadSelect>
      </div>

      <!-- Event Date -->
      <div class="space-y-2">
        <ShadLabel for="event-date">
          Event Date
        </ShadLabel>
        <ShadInput
          id="event-date"
          v-model="formData.eventDate"
          type="date"
        />
      </div>

      <!-- Save Button -->
      <div class="pt-2">
        <ShadButton :disabled="!isDirty" @click="handleSave">
          Save Changes
        </ShadButton>
      </div>
    </div>
  </div>
</template>
