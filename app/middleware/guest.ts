export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth()

  // Redirect authenticated users to dashboard
  if (auth.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})
