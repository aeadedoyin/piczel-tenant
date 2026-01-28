<script setup lang="ts">
import type { Collection } from '@/types/gallery'

defineProps<{
  collection: Collection
}>()

const isPasswordEnabled = ref(false)
const password = ref('')
const isRightClickDisabled = ref(true)
const isExifHidden = ref(true)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        Privacy Settings
      </h3>
      <p class="text-sm text-muted-foreground">
        Control who can access this collection and what they can do.
      </p>
    </div>

    <ShadSeparator />

    <div class="space-y-6 max-w-lg">
      <!-- Password Protection -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">
              Password Protection
            </p>
            <p class="text-xs text-muted-foreground">
              Require a password to view this collection.
            </p>
          </div>
          <ShadSwitch v-model:checked="isPasswordEnabled" />
        </div>

        <div v-if="isPasswordEnabled" class="space-y-2">
          <ShadLabel for="password">
            Password
          </ShadLabel>
          <ShadInput
            id="password"
            v-model="password"
            placeholder="Enter password"
            type="password"
          />
        </div>
      </div>

      <ShadSeparator />

      <!-- Right-click Protection -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">
            Disable Right-Click
          </p>
          <p class="text-xs text-muted-foreground">
            Prevent visitors from right-clicking on photos.
          </p>
        </div>
        <ShadSwitch v-model:checked="isRightClickDisabled" />
      </div>

      <ShadSeparator />

      <!-- Hide EXIF Data -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">
            Hide EXIF Data
          </p>
          <p class="text-xs text-muted-foreground">
            Remove camera and location data from photos.
          </p>
        </div>
        <ShadSwitch v-model:checked="isExifHidden" />
      </div>

      <!-- Save Button -->
      <div class="pt-2">
        <ShadButton>Save Changes</ShadButton>
      </div>
    </div>
  </div>
</template>
