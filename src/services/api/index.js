import axios from "axios"

const apiClient = axios.create({
  baseURL: 'http://damodarlepski.pythonanywhere.com/cookbook/',
  //baseURL: 'http://127.0.0.1:8000/cookbook',
  auth: { username: 'admin', password: 'admin' },
})

export const RetreatsAPI = {
  all: () => apiClient.get('retreat'),
  single: (id) => apiClient.get(`retreat/${id}/`),
  new: (name) => apiClient.post('retreat/', { name }),
}

export const DishesAPI = {
  forMeal: (id) => apiClient.get(`meal/${id}/get_dishes`)
}
