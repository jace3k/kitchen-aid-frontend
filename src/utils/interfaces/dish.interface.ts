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
}
