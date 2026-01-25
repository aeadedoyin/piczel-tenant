<script setup lang="ts">
import type { Photo } from '@/types/gallery'
import { LucideCheck, LucideEye, LucideStar } from 'lucide-vue-next'

defineProps<{
  photo: Photo
  selected?: boolean
}>()

const emit = defineEmits<{
  star: [photoId: string]
  select: [photoId: string]
  view: [photo: Photo]
}>()

const isHovered = ref(false)
</script>

<template>
  <div
    class="group relative cursor-pointer overflow-hidden rounded-lg bg-muted"
    :class="{ 'ring-2 ring-primary': selected }"
    @click="emit('view', photo)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Photo Image -->
    <div class="aspect-square">
      <img
        :alt="photo.title"
        class="
          size-full object-cover transition-transform duration-200
          group-hover:scale-105
        "
        loading="lazy"
        :src="photo.thumbnailUrl"
      >
    </div>

    <!-- Hover Overlay -->
    <Transition name="fade">
      <div
        v-if="isHovered || selected"
        class="absolute inset-0 bg-black/40 transition-opacity"
      >
        <!-- Top Actions -->
        <div class="absolute top-2 left-2 flex gap-1">
          <!-- Select Checkbox -->
          <button
            class="
              flex size-6 items-center justify-center rounded-full bg-white/90
              text-gray-700 transition-colors
              hover:bg-white
            "
            :class="{ 'bg-primary text-white hover:bg-primary': selected }"
            @click.stop="emit('select', photo.id)"
          >
            <LucideCheck v-if="selected" class="size-3.5" />
            <div
              v-else
              class="size-3.5 rounded-full border-2 border-gray-400"
            />
          </button>
        </div>

        <!-- Top Right Actions -->
        <div class="absolute top-2 right-2 flex gap-1">
          <!-- Star Button -->
          <button
            class="
              flex size-6 items-center justify-center rounded-full bg-white/90
              text-gray-700 transition-colors
              hover:bg-white
            "
            @click.stop="emit('star', photo.id)"
          >
            <LucideStar
              class="size-3.5"
              :class="{ 'fill-yellow-400 text-yellow-400': photo.starred }"
            />
          </button>

          <!-- View Button -->
          <button
            class="
              flex size-6 items-center justify-center rounded-full bg-white/90
              text-gray-700 transition-colors
              hover:bg-white
            "
            @click.stop="emit('view', photo)"
          >
            <LucideEye class="size-3.5" />
          </button>
        </div>

        <!-- Bottom Info -->
        <div
          class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 p-2"
        >
          <p class="truncate text-sm font-medium text-white">
            {{ photo.title }}
          </p>
        </div>
      </div>
    </Transition>

    <!-- Starred Indicator (always visible when starred) -->
    <div
      v-if="photo.starred && !isHovered && !selected"
      class="absolute top-2 right-2"
    >
      <LucideStar class="size-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
