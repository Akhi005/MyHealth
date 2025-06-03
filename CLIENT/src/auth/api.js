import axios from 'axios'

const api = axios.create({
  baseURL: 'https://myhealth-server-side.vercel.app/',
  withCredentials: true,
})

export default api
