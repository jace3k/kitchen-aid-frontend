import { retreats, mealRows } from "utils/fakeData"
import { Ingredient } from "./ingredients/types"
import { MealRowResponse, RetreatResponse } from "./retreats/types"
import { SimpleResponse } from "./simple/types"
import axios from './axios'
import { IngredientInADish, IngredientInaDishDto } from "utils/interfaces/ingredient-ina-dish.interface"

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
    return axios.get('ingredient')
  },
  createIngredient: (name: string): Promise<Ingredient> => {
    return axios.post('ingredient/', { name })
  },
  deleteIngredient: (id: number) => {
    return axios.delete(`ingredient/${id}`)
  },
  updateIngredient: (id: number, name: string) => {
    return axios.put(`ingredient/${id}/`, { name })
  }
}

export const DishesApi = {
  getAll: () => {
    return axios.get('dish')
  },
  createDish: (name: string, size: number) => {
    return axios.post('dish/', { name, size })
  },
  deleteDish: (id: number) => {
    return axios.delete(`dish/${id}/`)
  },
  updateDish: (id: number, name: string, size: number) => {
    return axios.put(`dish/${id}/`, { name, size })
  },
  getDishDetail: (dishId: number) => {
    return axios.get(`dish/${dishId}/`)
  },
  addIngredient: (ingredientInaDish: IngredientInaDishDto) => {
    return axios.post(`ingredient_ina_dish/`, ingredientInaDish)
  },
  updateIngredient: (ingredientInaDish: IngredientInaDishDto) => {
    return axios.put(`ingredient_ina_dish/${ingredientInaDish.id}/`, ingredientInaDish)
  },
  removeIngredient: (ingredientInaDishId: number) => {
    return axios.delete(`ingredient_ina_dish/${ingredientInaDishId}/`)
  }
}
