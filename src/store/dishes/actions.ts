import { Dish, DishDetail } from "utils/interfaces/dish.interface"
import { IngredientInADish, IngredientInaDishDto } from "utils/interfaces/ingredient-ina-dish.interface"
import { CreateDishType, DeleteDishType, DishActionTypes, FetchAllDishesType, UpdateDishType } from "./types"

export const fetchAllDishesRequest = (): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_REQUEST })
export const fetchAllDishesSuccess = (dishes: Dish[]): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_SUCCESS, dishes })
export const fetchAllDishesFailed = (error: string): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_ERROR, error })

export const createDishRequest = (name: string, size: number): CreateDishType => ({ type: DishActionTypes.CREATE_DISH_REQUEST, name, size })
export const createDishSuccess = (dish: Dish): CreateDishType => ({ type: DishActionTypes.CREATE_DISH_SUCCESS, dish })
export const createDishFailed = (error: string): CreateDishType => ({ type: DishActionTypes.CREATE_DISH_ERROR, error })

export const deleteDishRequest = (id: number): DeleteDishType => ({ type: DishActionTypes.DELETE_DISH_REQUEST, id })
export const deleteDishSuccess = (id: number): DeleteDishType => ({ type: DishActionTypes.DELETE_DISH_SUCCESS, id })
export const deleteDishFailed = (error: string): DeleteDishType => ({ type: DishActionTypes.DELETE_DISH_ERROR, error })

export const updateDishRequest = (id: number, name: string, size: number): UpdateDishType => ({ type: DishActionTypes.UPDATE_DISH_REQUEST, id, name, size })
export const updateDishSuccess = (dish: Dish): UpdateDishType => ({ type: DishActionTypes.UPDATE_DISH_SUCCESS, dish })
export const updateDishFailed = (error: string): UpdateDishType => ({ type: DishActionTypes.UPDATE_DISH_ERROR, error })


export const fetchDishDetailRequest = (dishId: number) => ({ type: DishActionTypes.FETCH_DISH_DETAIL_REQUEST, dishId })
export const fetchDishDetailSuccess = (dishDetail: DishDetail) => ({ type: DishActionTypes.FETCH_DISH_DETAIL_SUCCESS, dishDetail })
export const fetchDishDetailFailed = (error: string) => ({ type: DishActionTypes.FETCH_DISH_DETAIL_ERROR, error })

export const updateIngredientInADishRequest = (ingredient: IngredientInaDishDto) => ({ type: DishActionTypes.UPDATE_INGREDIENT_REQUEST, ingredient })
export const updateIngredientInADishSuccess = (ingredient: IngredientInaDishDto) => ({ type: DishActionTypes.UPDATE_INGREDIENT_SUCCESS, ingredient })
export const updateIngredientInADishFailed = (error: string) => ({ type: DishActionTypes.UPDATE_INGREDIENT_ERROR, error })

export const createIngredientInADishRequest = (ingredient: IngredientInaDishDto) => ({ type: DishActionTypes.CREATE_INGREDIENT_REQUEST, ingredient })
export const createIngredientInADishSuccess = (ingredient: IngredientInaDishDto) => ({ type: DishActionTypes.CREATE_INGREDIENT_SUCCESS, ingredient })
export const createIngredientInADishFailed = (error: string) => ({ type: DishActionTypes.CREATE_INGREDIENT_ERROR, error })

export const deleteIngredientInADishRequest = (id: number) => ({ type: DishActionTypes.DELETE_INGREDIENT_REQUEST, id })
export const deleteIngredientInADishSuccess = (id: number) => ({ type: DishActionTypes.DELETE_INGREDIENT_SUCCESS, id })
export const deleteIngredientInADishFailed = (error: string) => ({ type: DishActionTypes.DELETE_INGREDIENT_ERROR, error })
