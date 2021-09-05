import { IngredientInADish, IngredientInaDishWithDish } from "./ingredient-ina-dish.interface";

export interface IngredientDetal {
  id: number
  name: string,
  ingredient_ina_dish: IngredientInaDishWithDish[]
}