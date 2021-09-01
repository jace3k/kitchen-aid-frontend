import axios, { AxiosRequestConfig } from 'axios'
import storage from 'utils/storage'

const instance = axios.create({
    baseURL: 'https://kitchenaid.pythonanywhere.com/cookbook/',
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = storage.getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config
})

export default instance
