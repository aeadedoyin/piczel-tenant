<script setup lang="ts">
import { LucideImage, LucideStar } from 'lucide-vue-next'

const emit = defineEmits<{
  browse: []
}>()
</script>

<template>
  <ShadEmpty class="py-16">
    <ShadEmptyMedia>
      <div class="relative">
        <LucideImage class="size-12 text-muted-foreground" />
        <LucideStar
          class="absolute -top-1 -right-1 size-5 text-muted-foreground"
        />
      </div>
    </ShadEmptyMedia>
    <ShadEmptyContent>
      <ShadEmptyHeader>
        <ShadEmptyTitle>No starred items</ShadEmptyTitle>
        <ShadEmptyDescription>
          Star your favorite photos and collections to find them quickly here.
        </ShadEmptyDescription>
      </ShadEmptyHeader>
      <ShadEmptyActions>
        <ShadButton variant="outline" @click="emit('browse')">
          Browse Gallery
        </ShadButton>
      </ShadEmptyActions>
    </ShadEmptyContent>
  </ShadEmpty>
</template>
