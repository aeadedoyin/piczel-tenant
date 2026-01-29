<script setup lang="ts">
import type { Photo } from '@/types/gallery'

export type PhotoCardAction
  = | 'open'
    | 'quick-share'
    | 'download'
    | 'move-copy'
    | 'copy-filenames'
    | 'set-as-cover'
    | 'rename'
    | 'replace'
    | 'watermark'
    | 'delete'

defineProps<{
  photo: Photo
  selected?: boolean
}>()

const emit = defineEmits<{
  star: [photoId: string]
  select: [photoId: string]
  view: [photo: Photo]
  action: [action: PhotoCardAction, photo: Photo]
}>()

const isHovered = ref(false)
const isMenuOpen = ref(false)
</script>

<template>
  <div
    class="group relative cursor-pointer overflow-hidden rounded-lg bg-muted"
    :class="{ 'ring-2 ring-primary': selected }"
    @click="emit('select', photo.id)"
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
        v-if="isHovered || selected || isMenuOpen"
        class="absolute inset-0 bg-black/40 transition-opacity"
      >
        <!-- Top Actions -->
        <div class="absolute top-2 left-2 flex gap-1">
          <!-- Select Checkbox -->
          <button
            class="
              flex size-6 items-center justify-center rounded-full
              transition-colors
            "
            :class="selected
              ? `
                border-2 border-primary-foreground bg-primary
                text-primary-foreground
                hover:bg-primary/90
              `
              : `
                bg-white/90 text-gray-700
                hover:bg-white
              `"
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

          <!-- More Actions Dropdown -->
          <ShadDropdownMenu @update:open="isMenuOpen = $event">
            <ShadDropdownMenuTrigger as-child>
              <button
                class="
                  flex size-6 items-center justify-center rounded-full bg-white/90
                  text-gray-700 transition-colors
                  hover:bg-white
                "
                @click.stop
              >
                <LucideEllipsisVertical class="size-3.5" />
              </button>
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent align="end" class="w-48" @click.stop>
              <ShadDropdownMenuItem @click="emit('action', 'open', photo)">
                <LucideExpand class="mr-2 size-4" />
                Open
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @click="emit('action', 'quick-share', photo)">
                <LucideLink class="mr-2 size-4" />
                Quick share link
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @click="emit('action', 'download', photo)">
                <LucideDownload class="mr-2 size-4" />
                Download
              </ShadDropdownMenuItem>
              <ShadDropdownMenuSeparator />
              <ShadDropdownMenuItem @click="emit('action', 'move-copy', photo)">
                <LucideArrowRightFromLine class="mr-2 size-4" />
                Move/Copy
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @click="emit('action', 'copy-filenames', photo)">
                <LucideCopy class="mr-2 size-4" />
                Copy filenames
              </ShadDropdownMenuItem>
              <ShadDropdownMenuSeparator />
              <ShadDropdownMenuItem @click="emit('action', 'set-as-cover', photo)">
                <LucideImage class="mr-2 size-4" />
                Set as cover
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @click="emit('action', 'rename', photo)">
                <LucidePencil class="mr-2 size-4" />
                Rename
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @click="emit('action', 'replace', photo)">
                <LucideArrowLeftRight class="mr-2 size-4" />
                Replace photo
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @click="emit('action', 'watermark', photo)">
                <LucideCopyright class="mr-2 size-4" />
                Watermark
              </ShadDropdownMenuItem>
              <ShadDropdownMenuSeparator />
              <ShadDropdownMenuItem
                class="text-destructive focus:text-destructive"
                @click="emit('action', 'delete', photo)"
              >
                <LucideTrash2 class="mr-2 size-4" />
                Delete
              </ShadDropdownMenuItem>
            </ShadDropdownMenuContent>
          </ShadDropdownMenu>
        </div>
      </div>
    </Transition>

    <!-- Starred Indicator (always visible when starred) -->
    <div
      v-if="photo.starred && !isHovered && !selected && !isMenuOpen"
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
