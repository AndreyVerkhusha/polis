type HttpMethod = 'GET' | 'POST'

type ApiError = {
  message?: string
}

export async function apiRequest<T>(path: string, options?: { method?: HttpMethod; body?: unknown }): Promise<T> {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api'

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: options?.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  const responseBody = await response.json().catch(() => null)

  if (!response.ok) {
    const apiError = (responseBody ?? {}) as ApiError
    throw new Error(apiError.message ?? `HTTP ${response.status}`)
  }

  if (responseBody === null) {
    throw new Error('response empty JSON')
  }

  return responseBody as T
}
