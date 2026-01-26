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

function handleSocialLogin(provider: string) {
  toast.info(`${provider} login coming soon`)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">
        Welcome back
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
      <!-- Email -->
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

      <!-- Password -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <ShadLabel for="password">
            Password
          </ShadLabel>
          <NuxtLink
            class="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
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

      <!-- Submit -->
      <ShadButton class="w-full" :disabled="loading" type="submit">
        <LucideLoader2 v-if="loading" class="mr-2 size-4 animate-spin" />
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </ShadButton>

      <!-- Separator -->
      <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span class="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <!-- Social Login -->
      <div class="grid grid-cols-3 gap-4">
        <ShadButton type="button" variant="outline" @click="handleSocialLogin('Apple')">
          <svg class="size-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">Sign in with Apple</span>
        </ShadButton>
        <ShadButton type="button" variant="outline" @click="handleSocialLogin('Google')">
          <svg class="size-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">Sign in with Google</span>
        </ShadButton>
        <ShadButton type="button" variant="outline" @click="handleSocialLogin('Meta')">
          <svg class="size-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">Sign in with Meta</span>
        </ShadButton>
      </div>

      <!-- Register link -->
      <p class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink
          class="font-medium text-foreground underline-offset-4 hover:underline"
          to="/auth/register"
        >
          Create account
        </NuxtLink>
      </p>
    </form>

    <!-- Terms -->
    <p class="text-center text-xs text-muted-foreground">
      By clicking continue, you agree to our
      <NuxtLink class="underline underline-offset-4 hover:text-primary" to="/terms">
        Terms of Service
      </NuxtLink>
      and
      <NuxtLink class="underline underline-offset-4 hover:text-primary" to="/privacy">
        Privacy Policy
      </NuxtLink>.
    </p>
  </div>
</template>
