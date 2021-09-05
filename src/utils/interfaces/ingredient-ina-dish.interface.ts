import { Ingredient } from "store/ingredients/types";
import { Dish } from "./dish.interface";

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

export interface IngredientInaDishWithDish {
  id: number
  dish: Dish
  margin: number
  part: number
  ingredient: number
}