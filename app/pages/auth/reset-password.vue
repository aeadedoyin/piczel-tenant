<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

useHead({
  title: 'Reset Password | Piczel',
})

const route = useRoute()

const formData = reactive({
  email: (route.query.email as string) || '',
  password: '',
  passwordConfirmation: '',
  token: (route.query.token as string) || '',
})

const errors = ref<Record<string, string[]>>({})
const loading = ref(false)
const success = ref(false)

async function handleSubmit() {
  loading.value = true
  errors.value = {}

  try {
    await useApi('/auth/reset-password', {
      method: 'POST',
      body: formData,
    })
    success.value = true
    sonnerToast.success('Password reset successfully!')
  }
  catch (error: unknown) {
    const err = error as { statusCode?: number, data?: { message?: string, errors?: Record<string, string[]> } }
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors
    }
    else {
      sonnerToast.error(err?.data?.message || 'Failed to reset password. Please try again.')
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">
        Reset your password
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your new password below
      </p>
    </div>

    <template v-if="!success">
      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <ShadLabel for="email">
            Email
          </ShadLabel>
          <ShadInput
            id="email"
            v-model="formData.email"
            :disabled="loading"
            placeholder="you@example.com"
            required
            type="email"
          />
          <p v-if="errors.email" class="text-sm text-destructive">
            {{ errors.email[0] }}
          </p>
        </div>

        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <ShadLabel for="password">
                New password
              </ShadLabel>
              <ShadInput
                id="password"
                v-model="formData.password"
                :disabled="loading"
                required
                type="password"
              />
            </div>
            <div class="space-y-2">
              <ShadLabel for="password-confirmation">
                Confirm
              </ShadLabel>
              <ShadInput
                id="password-confirmation"
                v-model="formData.passwordConfirmation"
                :disabled="loading"
                required
                type="password"
              />
            </div>
          </div>
          <p v-if="errors.password" class="text-sm text-destructive">
            {{ errors.password[0] }}
          </p>
          <p v-else-if="errors.passwordConfirmation" class="text-sm text-destructive">
            {{ errors.passwordConfirmation[0] }}
          </p>
        </div>

        <input v-model="formData.token" name="token" type="hidden">

        <ShadButton class="w-full" :disabled="loading" type="submit">
          <LucideLoader2 v-if="loading" class="mr-2 size-4 animate-spin" />
          {{ loading ? 'Resetting...' : 'Reset password' }}
        </ShadButton>
      </form>
    </template>

    <template v-else>
      <div class="rounded-lg border bg-muted/50 p-6 text-center">
        <LucideCheckCircle class="mx-auto size-12 text-emerald-500" />
        <h3 class="mt-4 font-medium">
          Password reset successful
        </h3>
        <p class="mt-2 text-sm text-muted-foreground">
          Your password has been reset. You can now sign in with your new password.
        </p>
        <ShadButton as-child class="mt-4">
          <NuxtLink to="/auth/signin">
            Sign in
          </NuxtLink>
        </ShadButton>
      </div>
    </template>

    <p class="text-center text-sm text-muted-foreground">
      Remember your password?
      <NuxtLink
        class="font-medium text-foreground underline-offset-4 hover:underline"
        to="/auth/signin"
      >
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>
