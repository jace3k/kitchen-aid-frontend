import { DishInaMealWithMeal } from "./dish-ina-meal.interface";
import { IngredientInADish } from "./ingredient-ina-dish.interface";

export interface Dish {
	id: number,
	name: string,
	size: number,
}

export interface DishDetail {
  id: number,
  name: string,
  size: number,
  ingredient_ina_dish: IngredientInADish[],
  dish_ina_meal: DishInaMealWithMeal[],
}
