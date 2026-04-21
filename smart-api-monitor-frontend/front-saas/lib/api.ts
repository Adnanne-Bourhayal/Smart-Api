const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  ""
).replace(/\/$/, "")

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath
}

export function getApiBaseUrl() {
  return API_BASE_URL
}

export async function apiGet(path: string) {
  const res = await fetch(buildApiUrl(path), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

export async function apiPost(path: string, body: unknown) {
  const res = await fetch(buildApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}
export async function apiDelete(path: string) {
  const res = await fetch(buildApiUrl(path), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return true
}
