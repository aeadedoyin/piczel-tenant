<script setup lang="ts">
import { LucideImage, LucideStar } from 'lucide-vue-next'

const emit = defineEmits<{
  browse: []
}>()
</script>

<template>
  <Empty class="py-16">
    <EmptyMedia>
      <div class="relative">
        <LucideImage class="size-12 text-muted-foreground" />
        <LucideStar
          class="absolute -top-1 -right-1 size-5 text-muted-foreground"
        />
      </div>
    </EmptyMedia>
    <EmptyContent>
      <EmptyHeader>
        <EmptyTitle>No starred items</EmptyTitle>
        <EmptyDescription>
          Star your favorite photos and collections to find them quickly here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button variant="outline" @click="emit('browse')">
          Browse Gallery
        </Button>
      </EmptyActions>
    </EmptyContent>
  </Empty>
</template>
