import { DishInaMeal } from "./dish-ina-meal.interface";

export interface Meal {
  id: number
  type: MealType
}

export interface MealDto {
  id?: number
  type: MealType
}

export interface MealDetail {
  id: number,
  type: MealType,
  dish_ina_meal: DishInaMeal[]
}

export type MealType = "BR" | "LU" | "FE"
