<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-screen bg-background">
    <!-- Left Panel - Branding -->
    <div
      class="
        hidden flex-col justify-between bg-primary p-10
        lg:flex lg:w-1/2
      "
    >
      <div>
        <NuxtLink to="/">
          <Icon class="h-20 w-auto" mode="svg" name="piczel:piczel-logo-wordmark" />
        </NuxtLink>
      </div>
      <div class="space-y-4">
        <blockquote class="text-lg text-primary-foreground/90">
          "Piczel has transformed how I manage my photography business. Client galleries, payments, bookings - all in one place."
        </blockquote>
        <div class="text-primary-foreground/70">
          <p class="font-medium">
            Chioma Eze
          </p>
          <p class="text-sm">
            Wedding Photographer, Lagos
          </p>
        </div>
      </div>
      <div class="text-sm text-primary-foreground/50">
        &copy; {{ new Date().getFullYear() }} Piczel. All rights reserved.
      </div>
    </div>

    <!-- Right Panel - Form -->
    <div
      class="
        flex w-full flex-col justify-center px-4 py-12
        lg:w-1/2 lg:px-8
      "
    >
      <div class="mx-auto w-full max-w-md">
        <!-- Mobile Logo -->
        <div
          class="
            mb-8
            lg:hidden
          "
        >
          <NuxtLink to="/">
            <Icon class="h-8 w-auto" name="piczel:piczel-logo-wordmark" />
          </NuxtLink>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>
