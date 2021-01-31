import { FetchAllDishesType, Dish, DishActionTypes, FetchIngredientsType, IngredientRow } from "./types"

export const fetchAllDishesRequest = (): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_REQUEST })
export const fetchAllDishesSuccess = (dishes: Dish[]): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_SUCCESS, dishes })
export const fetchAllDishesFailed = (error: string): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_ERROR, error })

export const fetchIngredientRowsRequest = (dishId: number): FetchIngredientsType => ({ type: DishActionTypes.FETCH_INGREDIENTS_REQUEST, dishId })
export const fetchIngredientRowsSuccess = (ingredients: IngredientRow[]): FetchIngredientsType => ({ type: DishActionTypes.FETCH_INGREDIENTS_SUCCESS, ingredients })
export const fetchIngredientRowsFailed = (error: string): FetchIngredientsType => ({ type: DishActionTypes.FETCH_INGREDIENTS_ERROR, error })
