import axios from 'axios'

// const api = axios.create({ baseURL: 'http://localhost:3000/api' })
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export default api
