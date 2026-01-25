<script setup lang="ts">
import type { Collection, CollectionStatus } from '@/types/gallery'
import {
  LucideEllipsisVertical,
  LucideEye,
  LucideEyeOff,
  LucideFileEdit,
  LucideImage,
  LucideLock,
  LucidePencil,
  LucideStar,
  LucideTrash2,
} from 'lucide-vue-next'

defineProps<{
  collection: Collection
}>()

const emit = defineEmits<{
  star: [collectionId: string]
  edit: [collection: Collection]
  delete: [collectionId: string]
  view: [collection: Collection]
}>()

const statusConfig: Record<
  CollectionStatus,
  { label: string, variant: 'default' | 'secondary' | 'outline', icon: typeof LucideEye }
> = {
  published: { label: 'Published', variant: 'default', icon: LucideEye },
  hidden: { label: 'Hidden', variant: 'secondary', icon: LucideEyeOff },
  draft: { label: 'Draft', variant: 'outline', icon: LucideFileEdit },
}
</script>

<template>
  <ShadCard
    class="
      group cursor-pointer overflow-hidden transition-shadow
      hover:shadow-md
    "
    @click="emit('view', collection)"
  >
    <!-- Cover Image -->
    <div class="relative aspect-video overflow-hidden bg-muted">
      <img
        v-if="collection.coverUrl"
        :alt="collection.title"
        class="
          size-full object-cover transition-transform duration-200
          group-hover:scale-105
        "
        loading="lazy"
        :src="collection.coverUrl"
      >
      <div
        v-else
        class="flex size-full items-center justify-center"
      >
        <LucideImage class="size-12 text-muted-foreground" />
      </div>

      <!-- Starred Indicator -->
      <div
        v-if="collection.starred"
        class="absolute top-2 left-2"
      >
        <LucideStar
          class="size-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
        />
      </div>

      <!-- Password Protected Indicator -->
      <div
        v-if="collection.password"
        class="absolute top-2 right-2"
      >
        <div class="rounded-full bg-black/50 p-1">
          <LucideLock class="size-3.5 text-white" />
        </div>
      </div>

      <!-- Status Badge -->
      <div class="absolute bottom-2 left-2">
        <ShadBadge
          :class="{ 'bg-background': collection.status === 'draft' }"
          :variant="statusConfig[collection.status].variant"
        >
          <component
            :is="statusConfig[collection.status].icon"
            class="mr-1 size-3"
          />
          {{ statusConfig[collection.status].label }}
        </ShadBadge>
      </div>
    </div>

    <!-- Content -->
    <ShadCardContent class="p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <h3 class="truncate font-medium">
            {{ collection.title }}
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ collection.photoCount }} {{ collection.photoCount === 1 ? 'photo' : 'photos' }}
          </p>
        </div>

        <!-- Actions Dropdown -->
        <ShadDropdownMenu>
          <ShadDropdownMenuTrigger as-child>
            <ShadButton
              class="size-8 shrink-0"
              size="icon"
              variant="ghost"
              @click.stop
            >
              <LucideEllipsisVertical class="size-4" />
            </ShadButton>
          </ShadDropdownMenuTrigger>
          <ShadDropdownMenuContent align="end">
            <ShadDropdownMenuItem @click.stop="emit('star', collection.id)">
              <LucideStar
                class="mr-2 size-4"
                :class="{ 'fill-yellow-400 text-yellow-400': collection.starred }"
              />
              {{ collection.starred ? 'Unstar' : 'Star' }}
            </ShadDropdownMenuItem>
            <ShadDropdownMenuItem @click.stop="emit('edit', collection)">
              <LucidePencil class="mr-2 size-4" />
              Edit
            </ShadDropdownMenuItem>
            <ShadDropdownMenuSeparator />
            <ShadDropdownMenuItem
              class="
                text-destructive
                focus:text-destructive
              "
              @click.stop="emit('delete', collection.id)"
            >
              <LucideTrash2 class="mr-2 size-4" />
              Delete
            </ShadDropdownMenuItem>
          </ShadDropdownMenuContent>
        </ShadDropdownMenu>
      </div>

      <!-- Description -->
      <p
        v-if="collection.description"
        class="mt-2 line-clamp-2 text-sm text-muted-foreground"
      >
        {{ collection.description }}
      </p>
    </ShadCardContent>
  </ShadCard>
</template>
