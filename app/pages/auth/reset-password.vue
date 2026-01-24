<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({
  layout: 'auth',
  title: 'Reset Password',
  middleware: ['guest'],
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
    toast.success('Password reset successfully!')
  }
  catch (error: unknown) {
    const err = error as { statusCode?: number, data?: { message?: string, errors?: Record<string, string[]> } }
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors
    }
    else {
      toast.error(err?.data?.message || 'Failed to reset password. Please try again.')
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
        Reset your password
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your new password below
      </p>
    </div>

    <template v-if="!success">
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
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
          <Label for="password">New password</Label>
          <Input
            id="password"
            v-model="formData.password"
            :disabled="loading"
            placeholder="Enter new password"
            required
            type="password"
          />
          <p v-if="errors.password" class="text-sm text-destructive">
            {{ errors.password[0] }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="password-confirmation">Confirm new password</Label>
          <Input
            id="password-confirmation"
            v-model="formData.passwordConfirmation"
            :disabled="loading"
            placeholder="Confirm new password"
            required
            type="password"
          />
          <p v-if="errors.passwordConfirmation" class="text-sm text-destructive">
            {{ errors.passwordConfirmation[0] }}
          </p>
        </div>

        <input v-model="formData.token" name="token" type="hidden">

        <Button class="w-full" :disabled="loading" type="submit">
          <LucideLoader2 v-if="loading" class="mr-2 size-4 animate-spin" />
          {{ loading ? 'Resetting...' : 'Reset password' }}
        </Button>
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
        <Button as-child class="mt-4">
          <NuxtLink to="/auth/signin">
            Sign in
          </NuxtLink>
        </Button>
      </div>
    </template>

    <div class="text-center text-sm">
      Remember your password?
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
