import { FetchAllIngredientsType, Ingredient, IngredientActionTypes } from "./types"

export const fetchAllIngredientsRequest = (): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_REQUEST })
export const fetchAllIngredientsSuccess = (ingredients: Ingredient[]): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_SUCCESS, ingredients })
export const fetchAllIngredientsFailed = (error: string): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_ERROR, error })
