import { CartActionTypes } from "store/carts/types";
import { DishActionTypes } from "store/dishes/types";
import { IngredientActionTypes } from "store/ingredients/types";
import { MealActionTypes } from "store/meals/types";
import { RetreatActionTypes } from "store/retreats/types";

export interface HandleErrorType {
  type: typeof
  IngredientActionTypes.HANDLE_ERROR |
  DishActionTypes.HANDLE_ERROR |
  MealActionTypes.HANDLE_ERROR |
  RetreatActionTypes.HANDLE_ERROR |
  CartActionTypes.HANDLE_ERROR

  message: string
  error: string
}

export interface AppError {
  error: any
  message: string
}