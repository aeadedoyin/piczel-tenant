<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-t from-neutral-300 to-neutral-50 dark:from-neutral-950 dark:to-neutral-800 2xl:p-6">
    <div class="flex w-full max-w-sm flex-col gap-6 lg:max-w-4xl">
      <NuxtLink class="flex items-center gap-2 self-center font-medium" to="/">
        <Icon class="h-20 w-auto" mode="svg" name="piczel:piczel-logo-wordmark" />
      </NuxtLink>
      <slot />
    </div>
  </div>
</template>
