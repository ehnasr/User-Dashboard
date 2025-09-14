const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed: ${res.status}`)
  }
  // Some endpoints return empty on DELETE
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return res.json()
  return null
}

export const api = {
  listPosts: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/posts${query ? `?${query}` : ''}`)
  },
  getPost: (id) => request(`/posts/${id}`),
  createPost: (data) => request(`/posts`, { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
}

