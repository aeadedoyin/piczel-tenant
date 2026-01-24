export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware for auth pages
  if (to.path.startsWith('/auth')) {
    return
  }

  const auth = useAuth()

  // If we have a token, allow navigation
  // The fetchUser will happen and update the UI
  if (auth.token) {
    // Fetch user data if not already loaded (page refresh scenario)
    if (!auth.user) {
      try {
        await auth.fetchUser()
      }
      catch {
        // Token is invalid, clear it and redirect
        auth.token = null
        return navigateTo('/auth/signin')
      }
    }
    return
  }

  // No token, redirect to signin
  return navigateTo('/auth/signin')
})
