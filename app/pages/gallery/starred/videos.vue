<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="space-y-4">
    <GalleryEmptyStarred
      @browse="router.push('/gallery')"
    />
  </div>
</template>
