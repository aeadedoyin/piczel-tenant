<script setup lang="ts">
import type { Collection } from '@/types/gallery'

defineProps<{
  collection: Collection
}>()

const isDownloadEnabled = ref(true)
const downloadQuality = ref('original')
const isWatermarkOnDownload = ref(false)
const downloadPin = ref('')
const isPinRequired = ref(false)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        Download Settings
      </h3>
      <p class="text-sm text-muted-foreground">
        Control how visitors can download photos from this collection.
      </p>
    </div>

    <ShadSeparator />

    <div class="space-y-6 max-w-lg">
      <!-- Enable Downloads -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">
            Allow Downloads
          </p>
          <p class="text-xs text-muted-foreground">
            Let visitors download photos from this collection.
          </p>
        </div>
        <ShadSwitch v-model:checked="isDownloadEnabled" />
      </div>

      <template v-if="isDownloadEnabled">
        <ShadSeparator />

        <!-- Download Quality -->
        <div class="space-y-2">
          <ShadLabel>Download Quality</ShadLabel>
          <ShadSelect v-model="downloadQuality">
            <ShadSelectTrigger>
              <ShadSelectValue placeholder="Select quality" />
            </ShadSelectTrigger>
            <ShadSelectContent>
              <ShadSelectItem value="original">
                Original (Full Resolution)
              </ShadSelectItem>
              <ShadSelectItem value="high">
                High (3000px)
              </ShadSelectItem>
              <ShadSelectItem value="medium">
                Medium (1920px)
              </ShadSelectItem>
              <ShadSelectItem value="low">
                Low (1280px)
              </ShadSelectItem>
            </ShadSelectContent>
          </ShadSelect>
        </div>

        <ShadSeparator />

        <!-- Watermark on Download -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">
              Watermark on Download
            </p>
            <p class="text-xs text-muted-foreground">
              Apply your watermark to downloaded photos.
            </p>
          </div>
          <ShadSwitch v-model:checked="isWatermarkOnDownload" />
        </div>

        <ShadSeparator />

        <!-- Download PIN -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">
                Require PIN for Download
              </p>
              <p class="text-xs text-muted-foreground">
                Visitors must enter a PIN to download.
              </p>
            </div>
            <ShadSwitch v-model:checked="isPinRequired" />
          </div>

          <div v-if="isPinRequired" class="space-y-2">
            <ShadLabel for="download-pin">
              Download PIN
            </ShadLabel>
            <ShadInput
              id="download-pin"
              v-model="downloadPin"
              maxlength="6"
              placeholder="Enter PIN"
            />
          </div>
        </div>
      </template>

      <!-- Save Button -->
      <div class="pt-2">
        <ShadButton>Save Changes</ShadButton>
      </div>
    </div>
  </div>
</template>
