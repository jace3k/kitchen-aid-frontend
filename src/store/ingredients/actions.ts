import { IngredientDetal } from "utils/interfaces/ingredient.interface"
import { CreateIngredientType, DeleteIngredientType, FetchAllIngredientsType, FetchIngredientDetailType, Ingredient, IngredientActionTypes, UpdateIngredientType } from "./types"

export const fetchAllIngredientsRequest = (): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_REQUEST })
export const fetchAllIngredientsSuccess = (ingredients: Ingredient[]): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_SUCCESS, ingredients })
export const fetchAllIngredientsFailed = (error: string): FetchAllIngredientsType => ({ type: IngredientActionTypes.FETCH_ALL_ERROR, error })

export const createIngredientRequest = (name: string): CreateIngredientType => ({ type: IngredientActionTypes.CREATE_INGREDIENT_REQUEST, name })
export const createIngredientSuccess = (ingredient: Ingredient): CreateIngredientType => ({ type: IngredientActionTypes.CREATE_INGREDIENT_SUCCESS, ingredient })
export const createIngredientFailed = (error: string): CreateIngredientType => ({ type: IngredientActionTypes.CREATE_INGREDIENT_ERROR, error })

export const deleteIngredientRequest = (id: number): DeleteIngredientType => ({ type: IngredientActionTypes.DELETE_INGREDIENT_REQUEST, id })
export const deleteIngredientSuccess = (id: number): DeleteIngredientType => ({ type: IngredientActionTypes.DELETE_INGREDIENT_SUCCESS, id })
export const deleteIngredientFailed = (error: string): DeleteIngredientType => ({ type: IngredientActionTypes.DELETE_INGREDIENT_ERROR, error })

export const updateIngredientRequest = (id: number, name: string): UpdateIngredientType => ({ type: IngredientActionTypes.UPDATE_INGREDIENT_REQUEST, id, name })
export const updateIngredientSuccess = (id: number, name: string): UpdateIngredientType => ({ type: IngredientActionTypes.UPDATE_INGREDIENT_SUCCESS, id, name })
export const updateIngredientFailed = (error: string): UpdateIngredientType => ({ type: IngredientActionTypes.UPDATE_INGREDIENT_ERROR, error })

export const fetchIngredientDetailRequest = (id: number): FetchIngredientDetailType => ({ type: IngredientActionTypes.FETCH_INGREDIENT_DETAIL_REQUEST, id })
export const fetchIngredientDetailSuccess = (ingredientDetail: IngredientDetal): FetchIngredientDetailType => ({ type: IngredientActionTypes.FETCH_INGREDIENT_DETAIL_SUCCESS, ingredientDetail })
export const fetchIngredientDetailFailed = (error: string): FetchIngredientDetailType => ({ type: IngredientActionTypes.FETCH_INGREDIENT_DETAIL_ERROR, error })
