<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type {
  Collection,
  CreateCollectionData,
} from '@/types/gallery'
import {
  CalendarDate,

  getLocalTimeZone,
} from '@internationalized/date'

const props = defineProps<{
  open: boolean
  collection?: Collection | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'save': [data: CreateCollectionData]
}>()

const isEditing = computed(() => !!props.collection)
const sheetTitle = computed(() =>
  isEditing.value ? 'Edit Collection' : 'New Collection',
)

// Form state
const formData = reactive<CreateCollectionData>({
  title: '',
  description: '',
  category: 'other',
  eventDate: undefined,
  password: '',
})

// Date picker state
const selectedDate = ref<DateValue>()

const isSubmitting = ref(false)
const errors = ref<Partial<Record<keyof CreateCollectionData, string>>>({})

// Parse ISO string to CalendarDate
function parseDate(dateString?: string): DateValue | undefined {
  if (!dateString)
    return undefined
  const date = new Date(dateString)
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  )
}

// Format DateValue to ISO string
function formatDateToISO(date?: DateValue): string | undefined {
  if (!date)
    return undefined
  return date.toDate(getLocalTimeZone()).toISOString()
}

// Format date for display
function formatDateDisplay(date?: DateValue): string {
  if (!date)
    return 'Select event date'
  return date.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Reset form when modal opens/closes or collection changes
watch(
  () => props.open,
  (open) => {
    if (open) {
      if (props.collection) {
        formData.title = props.collection.title
        formData.description = props.collection.description || ''
        formData.category = props.collection.category
        formData.eventDate = props.collection.eventDate
        formData.password = props.collection.password || ''
        selectedDate.value = parseDate(props.collection.eventDate)
      }
      else {
        formData.title = ''
        formData.description = ''
        formData.category = 'other'
        formData.eventDate = undefined
        formData.password = ''
        selectedDate.value = undefined
      }
      errors.value = {}
    }
  },
)

// Sync selected date to form data
watch(selectedDate, (date) => {
  formData.eventDate = formatDateToISO(date)
})

function validate(): boolean {
  errors.value = {}

  if (!formData.title.trim()) {
    errors.value.title = 'Title is required'
  }
  else if (formData.title.length > 100) {
    errors.value.title = 'Title must be 100 characters or less'
  }

  if (formData.description && formData.description.length > 500) {
    errors.value.description = 'Description must be 500 characters or less'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate())
    return

  isSubmitting.value = true
  try {
    emit('save', { ...formData })
    emit('update:open', false)
  }
  finally {
    isSubmitting.value = false
  }
}

function handleClose() {
  emit('update:open', false)
}
</script>

<template>
  <ShadSheet :open="open" @update:open="emit('update:open', $event)">
    <ShadSheetContent class="flex flex-col sm:max-w-xl">
      <div class="flex flex-1 flex-col justify-center overflow-y-auto px-6">
        <!-- Header -->
        <div class="space-y-2">
          <h2 class="text-xl font-semibold tracking-tight">
            {{ sheetTitle }}
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ isEditing ? 'Update the collection details below.' : 'Fill in the details to create a new collection.' }}
          </p>
        </div>

        <!-- Form -->
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <!-- Title -->
          <div class="space-y-2">
            <ShadLabel for="title">
              Title
            </ShadLabel>
            <ShadInput
              id="title"
              v-model="formData.title"
              :class="{ 'border-destructive': errors.title }"
              placeholder="e.g. Summer Wedding 2024"
            />
            <p v-if="errors.title" class="text-sm text-destructive">
              {{ errors.title }}
            </p>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <ShadLabel for="description">
              Description
            </ShadLabel>
            <ShadTextarea
              id="description"
              v-model="formData.description"
              :class="{ 'border-destructive': errors.description }"
              placeholder="Add a brief description (optional)"
              rows="5"
            />
            <p v-if="errors.description" class="text-sm text-destructive">
              {{ errors.description }}
            </p>
          </div>

          <!-- Category and Event Date -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Category -->
            <div class="space-y-2">
              <ShadLabel>Category</ShadLabel>
              <ShadSelect v-model="formData.category">
                <ShadSelectTrigger class="w-full">
                  <ShadSelectValue placeholder="Select category" />
                </ShadSelectTrigger>
                <ShadSelectContent>
                  <ShadSelectItem
                    v-for="option in collectionCategoryOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </ShadSelectItem>
                </ShadSelectContent>
              </ShadSelect>
            </div>

            <!-- Event Date -->
            <div class="space-y-2">
              <ShadLabel>Event Date</ShadLabel>
              <ShadPopover>
                <ShadPopoverTrigger as-child>
                  <ShadButton
                    class="w-full justify-start text-left font-normal"
                    :class="{ 'text-muted-foreground': !selectedDate }"
                    variant="outline"
                  >
                    <LucideCalendar class="mr-2 size-4" />
                    {{ formatDateDisplay(selectedDate) }}
                  </ShadButton>
                </ShadPopoverTrigger>
                <ShadPopoverContent align="start" class="w-auto p-0">
                  <ShadCalendar v-model="selectedDate" initial-focus />
                </ShadPopoverContent>
              </ShadPopover>
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <ShadLabel for="password">
              Password Protection
            </ShadLabel>
            <ShadInput
              id="password"
              v-model="formData.password"
              placeholder="Enter password (optional)"
              type="password"
            />
            <p class="text-sm text-muted-foreground">
              Viewers will need this password to access the collection.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3 pt-2">
            <ShadButton class="w-full" :disabled="isSubmitting" type="submit">
              <LucideLoader2
                v-if="isSubmitting"
                class="mr-2 size-4 animate-spin"
              />
              {{ isEditing ? 'Save Changes' : 'Create Collection' }}
            </ShadButton>
            <ShadButton
              class="w-full"
              :disabled="isSubmitting"
              type="button"
              variant="outline"
              @click="handleClose"
            >
              Cancel
            </ShadButton>
          </div>
        </form>
      </div>
    </ShadSheetContent>
  </ShadSheet>
</template>
