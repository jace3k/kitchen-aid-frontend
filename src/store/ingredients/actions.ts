import { HandleErrorType } from "utils/interfaces/error-handling.interface"
import { IngredientDetal } from "utils/interfaces/ingredient.interface"
import { CreateIngredientType, DeleteIngredientType, FetchAllIngredientsType, FetchIngredientDetailType, Ingredient, IngredientActionTypes, UpdateIngredientType } from "./types"

export const fetchAllIngredientsRequest = (): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_REQUEST })
export const fetchAllIngredientsSuccess = (ingredients: Ingredient[]): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_SUCCESS, ingredients })

export const createIngredientRequest = (name: string): CreateIngredientType => ({ type: IngredientActionTypes.CREATE_INGREDIENT_REQUEST, name })
export const createIngredientSuccess = (ingredient: Ingredient, msg: string): CreateIngredientType => ({ type: IngredientActionTypes.CREATE_INGREDIENT_SUCCESS, ingredient, msg })

export const deleteIngredientRequest = (id: number): DeleteIngredientType => ({ type: IngredientActionTypes.DELETE_INGREDIENT_REQUEST, id })
export const deleteIngredientSuccess = (id: number, msg: string): DeleteIngredientType => ({ type: IngredientActionTypes.DELETE_INGREDIENT_SUCCESS, id, msg })

export const updateIngredientRequest = (id: number, name: string): UpdateIngredientType => ({ type: IngredientActionTypes.UPDATE_INGREDIENT_REQUEST, id, name })
export const updateIngredientSuccess = (id: number, name: string, msg: string): UpdateIngredientType => ({ type: IngredientActionTypes.UPDATE_INGREDIENT_SUCCESS, id, name, msg })

export const fetchIngredientDetailRequest = (id: number): FetchIngredientDetailType => ({ type: IngredientActionTypes.FETCH_INGREDIENT_DETAIL_REQUEST, id })
export const fetchIngredientDetailSuccess = (ingredientDetail: IngredientDetal): FetchIngredientDetailType => ({ type: IngredientActionTypes.FETCH_INGREDIENT_DETAIL_SUCCESS, ingredientDetail })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: IngredientActionTypes.HANDLE_ERROR, message, error })

