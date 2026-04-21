import axios from 'axios'

const TOKEN_KEY = 'auth_token'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const axiosError = error as { response?: { status?: number }; config?: { url?: string } }
    const status = axiosError?.response?.status
    const url = axiosError?.config?.url ?? ''
    // Only redirect on 401 from protected endpoints, not from auth endpoints themselves
    if (status === 401 && !url.includes('/auth/')) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
