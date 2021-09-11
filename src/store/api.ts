import { Ingredient } from "./ingredients/types"
import { SimpleResponse } from "./simple/types"
import axios from './axios'
import { IngredientInaDishDto } from "utils/interfaces/ingredient-ina-dish.interface"
import { MealDto } from "utils/interfaces/meal.interface"
import { DishInaMealDto } from "utils/interfaces/dish-ina-meal.interface"
import { Retreat, RetreatDetail, RetreatDto } from "utils/interfaces/retreat.interface"
import { MealInaRetreatDto } from "utils/interfaces/meal-ina-retreat.interface"

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
  },
  get: (id: number) => {
    return axios.get(`ingredient/${id}/`)
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

export const MealsApi = {
  getAll: () => {
    return axios.get('meal')
  },
  createMeal: (meal: MealDto) => {
    return axios.post('meal/', meal)
  },
  deleteMeal: (id: number) => {
    return axios.delete(`meal/${id}/`)
  },
  getMealDetail: (id: number) => {
    return axios.get(`meal/${id}/`)
  },
  addDish: (dishInaMeal: DishInaMealDto) => {
    return axios.post(`dish_ina_meal/`, dishInaMeal)
  },
  updateDish: (dishInaMeal: DishInaMealDto) => {
    return axios.put(`dish_ina_meal/${dishInaMeal.id}/`, dishInaMeal)
  },
  removeDish: (dishInaMealId: number) => {
    return axios.delete(`dish_ina_meal/${dishInaMealId}/`)
  }
}

export const RetreatsApi = {
  getAll: (): Promise<Retreat[]> => {
    return axios.get(`retreat/`)
  },
  getDetail: (id: number): Promise<RetreatDetail> => {
    return axios.get(`retreat/${id}/`)
  },
  createRetreat: (retreat: RetreatDto) => {
    return axios.post(`retreat/`, retreat)
  },
  deleteRetreat: (id: number) => {
    return axios.delete(`retreat/${id}/`)
  },
  updateRetreat: (retreat: RetreatDto) => {
    return axios.put(`retreat/${retreat.id}/`, retreat)
  },
  addMeal: (mealInaRetreat: MealInaRetreatDto) => {
    return axios.post(`meal_ina_retreat/`, mealInaRetreat)
  },
  updateMeal: (mealInaRetreat: MealInaRetreatDto) => {
    return axios.put(`meal_ina_retreat/${mealInaRetreat.id}/`, mealInaRetreat)
  },
  removeMeal: (mealInaRetreatId: number) => {
    return axios.delete(`meal_ina_retreat/${mealInaRetreatId}/`)
  }
}