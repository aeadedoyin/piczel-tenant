<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

useHead({
  title: 'Forgot Password | Piczel',
})

const auth = useAuth()

const formData = reactive({
  email: '',
})

const errors = ref<Record<string, string[]>>({})
const loading = ref(false)
const submitted = ref(false)

async function handleSubmit() {
  loading.value = true
  errors.value = {}

  try {
    await auth.forgotPassword(formData)
    submitted.value = true
    toast.success('Password reset email sent!')
  }
  catch (error: unknown) {
    const err = error as { statusCode?: number, data?: { message?: string, errors?: Record<string, string[]> } }
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors
    }
    else {
      toast.error(err?.data?.message || 'Failed to send reset email. Please try again.')
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <ShadCard class="overflow-hidden p-0">
      <ShadCardContent class="grid p-0 lg:grid-cols-2 lg:min-h-[75vh] xl:min-h-[70vh]">
        <div class="flex flex-col justify-center gap-6 p-6 md:p-8">
          <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">
              Forgot password?
            </h1>
            <p class="text-sm text-muted-foreground text-balance">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          <template v-if="!submitted">
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

              <ShadButton class="w-full" :disabled="loading" type="submit">
                <LucideLoader2 v-if="loading" class="mr-2 size-4 animate-spin" />
                {{ loading ? 'Sending...' : 'Send reset link' }}
              </ShadButton>
            </form>
          </template>

          <template v-else>
            <div class="rounded-lg border bg-muted/50 p-6 text-center">
              <LucideMail class="mx-auto size-12 text-muted-foreground" />
              <h3 class="mt-4 font-medium">
                Check your email
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                We've sent a password reset link to
                <strong>{{ formData.email }}</strong>
              </p>
              <ShadButton
                class="mt-4"
                variant="outline"
                @click="submitted = false"
              >
                Try another email
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

        <!-- Image Side -->
        <div class="relative hidden bg-muted lg:block">
          <img
            alt="Photography"
            class="absolute inset-0 size-full object-cover dark:brightness-[0.2] dark:grayscale"
            src="/images/auth/reset-password-bg.jpg"
          >
        </div>
      </ShadCardContent>
    </ShadCard>
  </div>
</template>
