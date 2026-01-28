<script setup lang="ts">
import type { Collection } from '@/types/gallery'

defineProps<{
  collection: Collection
}>()

const isFavoriteEnabled = ref(false)
const requireEmail = ref(true)
const limitPerVisitor = ref(0)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        Favorite Settings
      </h3>
      <p class="text-sm text-muted-foreground">
        Allow visitors to mark their favorite photos in this collection.
      </p>
    </div>

    <ShadSeparator />

    <div class="space-y-6 max-w-lg">
      <!-- Enable Favorites -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">
            Allow Favorites
          </p>
          <p class="text-xs text-muted-foreground">
            Visitors can select their favorite photos for you to review.
          </p>
        </div>
        <ShadSwitch v-model:checked="isFavoriteEnabled" />
      </div>

      <template v-if="isFavoriteEnabled">
        <ShadSeparator />

        <!-- Require Email -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">
              Require Email
            </p>
            <p class="text-xs text-muted-foreground">
              Visitors must provide email before selecting favorites.
            </p>
          </div>
          <ShadSwitch v-model:checked="requireEmail" />
        </div>

        <ShadSeparator />

        <!-- Limit per visitor -->
        <div class="space-y-2">
          <ShadLabel for="limit">
            Selection Limit
          </ShadLabel>
          <ShadInput
            id="limit"
            v-model.number="limitPerVisitor"
            min="0"
            placeholder="0 = unlimited"
            type="number"
          />
          <p class="text-xs text-muted-foreground">
            Maximum number of favorites per visitor. Set to 0 for unlimited.
          </p>
        </div>
      </template>

      <!-- Save Button -->
      <div class="pt-2">
        <ShadButton>Save Changes</ShadButton>
      </div>
    </div>
  </div>
</template>
