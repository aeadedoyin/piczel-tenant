<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6 md:max-w-4xl">
      <NuxtLink class="flex items-center gap-2 self-center font-medium" to="/">
        <Icon class="h-20 w-auto" mode="svg" name="piczel:piczel-logo-wordmark" />
      </NuxtLink>
      <slot />
    </div>
  </div>
</template>
