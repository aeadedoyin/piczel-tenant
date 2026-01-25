<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

useHead({
  title: 'Sign In | Piczel',
})

const auth = useAuth()
const config = useRuntimeConfig()

const formData = reactive({
  email: config.public.prefillCredential ? 'user@example.com' : '',
  password: config.public.prefillCredential ? 'password' : '',
})

const errors = ref<Record<string, string[]>>({})
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  errors.value = {}

  try {
    await auth.signIn(formData)
    toast.success('Welcome back!')
    await navigateTo('/dashboard')
  }
  catch (error: unknown) {
    const err = error as { statusCode?: number, data?: { message?: string, errors?: Record<string, string[]> } }
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors
    }
    else {
      toast.error(err?.data?.message || 'Invalid credentials. Please try again.')
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">
        Welcome back
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
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
        <div class="flex items-center justify-between">
          <ShadLabel for="password">
            Password
          </ShadLabel>
          <NuxtLink
            class="
              text-sm text-muted-foreground underline-offset-4
              hover:text-primary hover:underline
            "
            to="/auth/forgot-password"
          >
            Forgot password?
          </NuxtLink>
        </div>
        <ShadInput
          id="password"
          v-model="formData.password"
          :disabled="loading"
          placeholder="Enter your password"
          required
          type="password"
        />
        <p v-if="errors.password" class="text-sm text-destructive">
          {{ errors.password[0] }}
        </p>
      </div>

      <ShadButton class="w-full" :disabled="loading" type="submit">
        <LucideLoader2 v-if="loading" class="mr-2 size-4 animate-spin" />
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </ShadButton>
    </form>

    <div class="text-center text-sm">
      Don't have an account?
      <NuxtLink
        class="
          font-medium text-primary underline-offset-4
          hover:underline
        "
        to="/auth/signup"
      >
        Sign up
      </NuxtLink>
    </div>
  </div>
</template>
