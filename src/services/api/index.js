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
  update: (id, name) => apiClient.put(`retreat/${id}/`, { name }),
  delete: (id) => apiClient.delete(`retreat/${id}/`),
}

export const MealsAPI = {
  new: (meal) => apiClient.post('meal/', meal),
  delete: (id) => apiClient.delete(`meal/${id}/`),
  update: (id, meal) => apiClient.put(`meal/${id}/`, { ...meal }),
}

export const DishesAPI = {
  forMeal: (id) => apiClient.get(`meal/${id}/get_dishes`),
  new: dish => apiClient.post('dish/', { ...dish }),
  delete: id => apiClient.delete(`dish/${id}/`)
}

export const IngredientsAPI = {
  forDish: id => apiClient.get(`dish/${id}/get_ingredients/`),
  new: ingredient => apiClient.post('ingredient/', [{ ...ingredient }]),
  update: (id, ingredient) => apiClient.put(`ingredient/${id}/`, { ...ingredient }),
  delete: id => apiClient.delete(`ingredient/${id}/`)
}