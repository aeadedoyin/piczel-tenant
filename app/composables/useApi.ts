type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestBody = Record<string, unknown> | FormData | null

interface ApiOptions {
  method?: HttpMethod
  body?: RequestBody
  query?: Record<string, unknown>
}

export async function useApi<T = unknown>(
  url: string,
  options: ApiOptions = {},
): Promise<T> {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token')

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token.value) {
    headers.Authorization = `Bearer ${token.value}`
  }

  return await $fetch<T>(url, {
    baseURL: config.public.apiBaseUrl as string,
    headers,
    method: options.method,
    body: options.body,
    query: options.query,
  })
}
