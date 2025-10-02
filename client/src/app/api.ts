import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

api.interceptors.response.use(
  response => response,
  error => {
    console.error('[API ERROR]', error)
    return Promise.reject(error)
  },
)
