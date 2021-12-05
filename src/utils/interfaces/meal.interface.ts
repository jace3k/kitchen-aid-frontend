import { DishInaMeal } from "./dish-ina-meal.interface";
import { MealInaRetreat, MealInaRetreatWithRetreat } from "./meal-ina-retreat.interface";

export interface Meal {
  id: number
  name: string
  type: MealType
}

export interface MealDto {
  id?: number
  name: string
  type: MealType
}

export interface MealDetail {
  id: number,
  name: string
  type: MealType,
  dish_ina_meal: DishInaMeal[]
  meal_ina_retreat: MealInaRetreatWithRetreat[]
}

export type MealType = "BR" | "LU" | "FE"
