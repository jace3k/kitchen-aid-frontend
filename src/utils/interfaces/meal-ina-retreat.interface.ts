import { Meal } from "./meal.interface";
import { Retreat } from "./retreat.interface";

export interface MealInaRetreatDto {
  id?: number,
  meal: number
  date: string,
  servings: number,
  retreat: number,
}

export interface MealInaRetreat {
  id: number,
  meal: Meal,
  date: string,
  servings: number,
  retreat: number,
}

export interface MealInaRetreatWithRetreat {
  id: number,
  meal: number,
  date: string,
  servings: number,
  retreat: Retreat,
}