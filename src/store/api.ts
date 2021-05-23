import { retreats, mealRows } from "utils/fakeData"
import { Ingredient } from "./ingredients/types"
import { MealRowResponse, RetreatResponse } from "./retreats/types"
import { SimpleResponse } from "./simple/types"
import axios from './axios'
import { changeLanguage } from "./user/actions"
import { Dish } from "./dishes/types"

export const SimpleApi = {
  get: (): Promise<SimpleResponse> => {
    return new Promise<SimpleResponse>((resolve) => {
      setTimeout(() => resolve({ simpleValue: 9 }), 2000)
    })
  }
}

export const UserApi = {
  login: (username: string, password: string) => {
    return axios.post('api/token/', { username, password })
  }
}

export const RetreatsApi = {
  getAll: (): Promise<RetreatResponse> => {
    return new Promise<RetreatResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({ retreats, status: 'OK' })
      }, 1000)
    })
  },
  getMeals: (retreatId: number): Promise<MealRowResponse> => {
    return new Promise<MealRowResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          mealRows: mealRows.filter(x => x.retreatId === retreatId),
          retreat: retreats.find(x => x.id === retreatId) || null,
          status: 'OK'
        })
      }, 1000)
    })
  }
}

export const IngredientsApi = {
  getAll: (): Promise<Ingredient[]> => {
    return axios.get('ingredients')
  },
  createIngredient: (name: string): Promise<Ingredient> => {
    return axios.post('ingredients/', { name })
  },
  deleteIngredient: (id: number) => {
    return axios.delete(`ingredients/${id}`)
  },
  updateIngredient: (id: number, name: string) => {
    return axios.put(`ingredients/${id}/`, { name })
  }
}

export const DishesApi = {
  getAll: () => {
    return axios.get('dishes')
  },
  createDish: (name: string, size: number) => {
    return axios.post('dishes/', { name, size })
  },
  deleteDish: (id: number) => {
    return axios.delete(`dishes/${id}`)
  },
  updateDish: (id: number, name: string, size: number) => {
    return axios.put(`dishes/${id}/`, { name, size })
  }
}
