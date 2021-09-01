import { Ingredient } from "store/ingredients/types";

export interface IngredientInaDishDto {
  id?: number
  dish: number
  margin: number
  part: number
  ingredient: number
}

export interface IngredientInADish {
  id: number
  dish: number
  margin: number
  part: number
  ingredient: Ingredient
}