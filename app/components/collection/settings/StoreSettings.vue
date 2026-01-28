<script setup lang="ts">
import type { Collection } from '@/types/gallery'

defineProps<{
  collection: Collection
}>()

const isStoreEnabled = ref(false)
const currency = ref('NGN')
const allowDigitalDownload = ref(true)
const allowPrints = ref(false)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        Store Settings
      </h3>
      <p class="text-sm text-muted-foreground">
        Enable selling photos from this collection.
      </p>
    </div>

    <ShadSeparator />

    <div class="space-y-6 max-w-lg">
      <!-- Enable Store -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">
            Enable Store
          </p>
          <p class="text-xs text-muted-foreground">
            Allow visitors to purchase photos from this collection.
          </p>
        </div>
        <ShadSwitch v-model:checked="isStoreEnabled" />
      </div>

      <template v-if="isStoreEnabled">
        <ShadSeparator />

        <!-- Currency -->
        <div class="space-y-2">
          <ShadLabel>Currency</ShadLabel>
          <ShadSelect v-model="currency">
            <ShadSelectTrigger>
              <ShadSelectValue placeholder="Select currency" />
            </ShadSelectTrigger>
            <ShadSelectContent>
              <ShadSelectItem value="NGN">
                Nigerian Naira (NGN)
              </ShadSelectItem>
              <ShadSelectItem value="USD">
                US Dollar (USD)
              </ShadSelectItem>
              <ShadSelectItem value="GBP">
                British Pound (GBP)
              </ShadSelectItem>
              <ShadSelectItem value="GHS">
                Ghana Cedi (GHS)
              </ShadSelectItem>
              <ShadSelectItem value="KES">
                Kenyan Shilling (KES)
              </ShadSelectItem>
              <ShadSelectItem value="ZAR">
                South African Rand (ZAR)
              </ShadSelectItem>
            </ShadSelectContent>
          </ShadSelect>
        </div>

        <ShadSeparator />

        <!-- Digital Downloads -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">
              Digital Downloads
            </p>
            <p class="text-xs text-muted-foreground">
              Sell digital copies of photos.
            </p>
          </div>
          <ShadSwitch v-model:checked="allowDigitalDownload" />
        </div>

        <ShadSeparator />

        <!-- Prints -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">
              Print Orders
            </p>
            <p class="text-xs text-muted-foreground">
              Allow visitors to order physical prints.
            </p>
          </div>
          <ShadSwitch v-model:checked="allowPrints" />
        </div>
      </template>

      <!-- Save Button -->
      <div class="pt-2">
        <ShadButton>Save Changes</ShadButton>
      </div>
    </div>
  </div>
</template>
