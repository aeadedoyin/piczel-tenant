<script setup lang="ts">
const quote = {
  text: 'Photography is the story I fail to put into words.',
  author: 'Destin Sparks',
  image: '/images/auth/signin-bg.jpg',
}
</script>

<template>
  <div class="flex min-h-svh">
    <!-- Left side: Form -->
    <div class="flex flex-1/3 flex-col justify-center bg-background px-6 py-12 md:px-10">
      <div class="mx-auto w-full max-w-md">
        <NuxtLink class="mb-16 flex items-center" to="/">
          <Icon class="h-20 w-auto" mode="svg" name="piczel:logo-wordmark" />
        </NuxtLink>
        <slot />
      </div>
    </div>

    <!-- Right side: Image with quote -->
    <div class="relative hidden flex-2/3 bg-gradient-to-t from-neutral-400 to-neutral-200 lg:block">
      <div
        class="absolute inset-10 overflow-hidden rounded-xl border-2 lg:inset-20 border-neutral-50 shadow-lg xl:inset-40"
      >
        <img
          alt="Photography"
          class="size-full object-cover"
          :src="quote.image"
        >
        <div class="absolute inset-0 rounded-xl bg-black/30" />
        <div class="absolute bottom-6 right-6 max-w-xs text-right text-white">
          <blockquote class="text-sm font-light italic leading-relaxed">
            "{{ quote.text }}"
          </blockquote>
          <p class="mt-2 text-xs text-white/70">
            — {{ quote.author }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
