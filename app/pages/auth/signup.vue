<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

useHead({
  title: 'Sign Up | Piczel',
})

const auth = useAuth()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const errors = ref<Record<string, string[]>>({})
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  errors.value = {}

  try {
    await auth.signUp(formData)
    toast.success('Account created successfully!')
    await navigateTo('/dashboard')
  }
  catch (error: unknown) {
    const err = error as { statusCode?: number, data?: { message?: string, errors?: Record<string, string[]> } }
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors
    }
    else {
      toast.error(err?.data?.message || 'Failed to create account. Please try again.')
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
        Create an account
      </h1>
      <p class="text-sm text-muted-foreground">
        Start managing your photography business today
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <ShadLabel for="name">
          Full name
        </ShadLabel>
        <ShadInput
          id="name"
          v-model="formData.name"
          :disabled="loading"
          placeholder="John Doe"
          required
          type="text"
        />
        <p v-if="errors.name" class="text-sm text-destructive">
          {{ errors.name[0] }}
        </p>
      </div>

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
        <ShadLabel for="password">
          Password
        </ShadLabel>
        <ShadInput
          id="password"
          v-model="formData.password"
          :disabled="loading"
          placeholder="Create a password"
          required
          type="password"
        />
        <p v-if="errors.password" class="text-sm text-destructive">
          {{ errors.password[0] }}
        </p>
      </div>

      <div class="space-y-2">
        <ShadLabel for="password-confirmation">
          Confirm password
        </ShadLabel>
        <ShadInput
          id="password-confirmation"
          v-model="formData.passwordConfirmation"
          :disabled="loading"
          placeholder="Confirm your password"
          required
          type="password"
        />
        <p v-if="errors.passwordConfirmation" class="text-sm text-destructive">
          {{ errors.passwordConfirmation[0] }}
        </p>
      </div>

      <ShadButton class="w-full" :disabled="loading" type="submit">
        <LucideLoader2 v-if="loading" class="mr-2 size-4 animate-spin" />
        {{ loading ? 'Creating account...' : 'Create account' }}
      </ShadButton>
    </form>

    <p class="text-center text-xs text-muted-foreground">
      By creating an account, you agree to our
      <NuxtLink
        class="
          underline underline-offset-4
          hover:text-primary
        " to="/terms"
      >
        Terms of Service
      </NuxtLink>
      and
      <NuxtLink
        class="
          underline underline-offset-4
          hover:text-primary
        " to="/privacy"
      >
        Privacy Policy
      </NuxtLink>
    </p>

    <div class="text-center text-sm">
      Already have an account?
      <NuxtLink
        class="
          font-medium text-primary underline-offset-4
          hover:underline
        "
        to="/auth/signin"
      >
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
