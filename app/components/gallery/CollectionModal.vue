<script setup lang="ts">
import type {
  Collection,
  CollectionCategory,
  CollectionStatus,
  CreateCollectionData,
} from '@/types/gallery'
import { LucideLoader2 } from 'lucide-vue-next'

const props = defineProps<{
  open: boolean
  collection?: Collection | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'save': [data: CreateCollectionData]
}>()

const isEditing = computed(() => !!props.collection)
const modalTitle = computed(() =>
  isEditing.value ? 'Edit Collection' : 'New Collection',
)

// Form state
const formData = reactive<CreateCollectionData>({
  title: '',
  description: '',
  status: 'draft',
  category: 'other',
  password: '',
})

const isSubmitting = ref(false)
const errors = ref<Partial<Record<keyof CreateCollectionData, string>>>({})

// Status options
const statusOptions: { value: CollectionStatus, label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'hidden', label: 'Hidden' },
]

// Category options
const categoryOptions: { value: CollectionCategory, label: string }[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'event', label: 'Event' },
  { value: 'nature', label: 'Nature' },
  { value: 'other', label: 'Other' },
]

// Reset form when modal opens/closes or collection changes
watch(
  () => props.open,
  (open) => {
    if (open) {
      if (props.collection) {
        formData.title = props.collection.title
        formData.description = props.collection.description || ''
        formData.status = props.collection.status
        formData.category = props.collection.category
        formData.password = props.collection.password || ''
      }
      else {
        formData.title = ''
        formData.description = ''
        formData.status = 'draft'
        formData.category = 'other'
        formData.password = ''
      }
      errors.value = {}
    }
  },
)

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
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ modalTitle }}</DialogTitle>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input
            id="title"
            v-model="formData.title"
            :class="{ 'border-destructive': errors.title }"
            placeholder="Enter collection title"
          />
          <p v-if="errors.title" class="text-sm text-destructive">
            {{ errors.title }}
          </p>
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="formData.description"
            :class="{ 'border-destructive': errors.description }"
            placeholder="Enter collection description (optional)"
            rows="3"
          />
          <p v-if="errors.description" class="text-sm text-destructive">
            {{ errors.description }}
          </p>
        </div>

        <!-- Status and Category Row -->
        <div
          class="
            grid gap-4
            sm:grid-cols-2
          "
        >
          <!-- Status -->
          <div class="space-y-2">
            <Label>Status</Label>
            <Select v-model="formData.status">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in statusOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Category -->
          <div class="space-y-2">
            <Label>Category</Label>
            <Select v-model="formData.category">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in categoryOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Password (only for hidden collections) -->
        <div v-if="formData.status === 'hidden'" class="space-y-2">
          <Label for="password">Password Protection</Label>
          <Input
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
        <div class="flex justify-end gap-2 pt-4">
          <Button
            :disabled="isSubmitting"
            type="button"
            variant="outline"
            @click="handleClose"
          >
            Cancel
          </Button>
          <Button :disabled="isSubmitting" type="submit">
            <LucideLoader2
              v-if="isSubmitting"
              class="mr-2 size-4 animate-spin"
            />
            {{ isEditing ? 'Save Changes' : 'Create Collection' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
