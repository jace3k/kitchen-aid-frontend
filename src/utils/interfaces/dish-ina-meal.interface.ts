import { Dish } from "./dish.interface";
import { Meal } from "./meal.interface";

export interface DishInaMeal {
  id: number,
  meal: number,
  dish: Dish
}

export interface DishInaMealDto {
  id?: number,
  meal: number,
  dish: number
}

export interface DishInaMealWithMeal {
  id: number,
  dish: number,
  meal: Meal,
}
