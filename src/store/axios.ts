import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BASE_URL } from 'utils/constants'
import storage from 'utils/storage'

const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = storage.getToken()
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config
})

instance.interceptors.response.use((response: AxiosResponse) => {
  const { config, data, status } = response
  console.log(`[${config.method?.toUpperCase()}] ${config.url} (${status})`, data)
  return response
})

export default instance
