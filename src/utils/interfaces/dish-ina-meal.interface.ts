import { Dish } from "./dish.interface";

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