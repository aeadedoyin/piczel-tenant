<script setup lang="ts">
defineProps<{
  hasFilters?: boolean
}>()

const emit = defineEmits<{
  create: []
  clearFilters: []
}>()
</script>

<template>
  <ShadEmpty class="py-16">
    <ShadEmptyMedia>
      <LucideFolderOpen class="size-12 text-muted-foreground" />
    </ShadEmptyMedia>
    <ShadEmptyContent>
      <ShadEmptyHeader>
        <ShadEmptyTitle>
          {{ hasFilters ? 'No collections match your filters' : 'No collections yet' }}
        </ShadEmptyTitle>
        <ShadEmptyDescription>
          {{
            hasFilters
              ? 'Try adjusting your filters or clear them to see all collections.'
              : 'Create your first collection to organize your photos.'
          }}
        </ShadEmptyDescription>
      </ShadEmptyHeader>
      <ShadEmpty>
        <ShadButton
          v-if="hasFilters"
          variant="outline"
          @click="emit('clearFilters')"
        >
          Clear Filters
        </ShadButton>
        <ShadButton @click="emit('create')">
          <LucidePlus class="mr-2 size-4" />
          New Collection
        </ShadButton>
      </ShadEmpty>
    </ShadEmptyContent>
  </ShadEmpty>
</template>
