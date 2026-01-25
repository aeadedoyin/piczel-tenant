<script setup lang="ts">
import { LucideFolderOpen, LucidePlus } from 'lucide-vue-next'

defineProps<{
  hasFilters?: boolean
}>()

const emit = defineEmits<{
  create: []
  clearFilters: []
}>()
</script>

<template>
  <Empty class="py-16">
    <EmptyMedia>
      <LucideFolderOpen class="size-12 text-muted-foreground" />
    </EmptyMedia>
    <EmptyContent>
      <EmptyHeader>
        <EmptyTitle>
          {{ hasFilters ? 'No collections match your filters' : 'No collections yet' }}
        </EmptyTitle>
        <EmptyDescription>
          {{
            hasFilters
              ? 'Try adjusting your filters or clear them to see all collections.'
              : 'Create your first collection to organize your photos.'
          }}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button
          v-if="hasFilters"
          variant="outline"
          @click="emit('clearFilters')"
        >
          Clear Filters
        </Button>
        <Button @click="emit('create')">
          <LucidePlus class="mr-2 size-4" />
          New Collection
        </Button>
      </EmptyActions>
    </EmptyContent>
  </Empty>
</template>
