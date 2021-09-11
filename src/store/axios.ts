import axios, { AxiosRequestConfig } from 'axios'
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

export default instance
