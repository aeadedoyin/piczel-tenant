import type { ForgotPasswordData, LoginCredentials, RegisterData, User } from '@/types/auth'

// Mock delay to simulate network latency
function delay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'user@example.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const useAuth = defineStore('auth', () => {
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  async function signIn(credentials: LoginCredentials): Promise<void> {
    await delay()

    // Mock validation
    if (credentials.email !== 'user@example.com' || credentials.password !== 'password') {
      const error = new Error('Invalid credentials. Please try again.')
      Object.assign(error, { statusCode: 401, data: { message: 'Invalid credentials. Please try again.' } })
      throw error
    }

    token.value = 'mock-jwt-token'
    user.value = { ...mockUser, email: credentials.email }
  }

  async function signUp(data: RegisterData): Promise<void> {
    await delay()

    // Mock validation - email already exists
    if (data.email === 'taken@example.com') {
      const error = new Error('Email already registered')
      Object.assign(error, { statusCode: 422, data: { errors: { email: ['This email is already registered.'] } } })
      throw error
    }

    token.value = 'mock-jwt-token'
    user.value = { ...mockUser, name: data.name, email: data.email }
  }

  async function forgotPassword(_data: ForgotPasswordData): Promise<void> {
    await delay()
    // Mock success - always succeeds
  }

  async function signOut(): Promise<void> {
    await delay(200)
    token.value = null
    user.value = null
    await navigateTo('/auth/signin')
  }

  async function fetchUser(): Promise<void> {
    if (!token.value)
      return

    await delay(300)
    user.value = mockUser
  }

  return {
    token,
    user,
    isAuthenticated,
    signIn,
    signUp,
    forgotPassword,
    signOut,
    fetchUser,
  }
})
