import { Dish, DishDetail } from "utils/interfaces/dish.interface"
import { HandleErrorType } from "utils/interfaces/error-handling.interface"
import { IngredientInaDishDto } from "utils/interfaces/ingredient-ina-dish.interface"
import { CreateDishType, AddIngredientType, DeleteDishType, DeleteIngredientType, DishActionTypes, FetchAllDishesType, FetchDishDetailType, UpdateDishType, UpdateIngredientType } from "./types"

export const fetchAllDishesRequest = (): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_REQUEST })
export const fetchAllDishesSuccess = (dishes: Dish[]): FetchAllDishesType => ({ type: DishActionTypes.FETCH_ALL_SUCCESS, dishes })

export const createDishRequest = (name: string, size: number): CreateDishType => ({ type: DishActionTypes.CREATE_DISH_REQUEST, name, size })
export const createDishSuccess = (dish: Dish, msg: string): CreateDishType => ({ type: DishActionTypes.CREATE_DISH_SUCCESS, dish, msg })

export const deleteDishRequest = (id: number): DeleteDishType => ({ type: DishActionTypes.DELETE_DISH_REQUEST, id })
export const deleteDishSuccess = (id: number, msg: string): DeleteDishType => ({ type: DishActionTypes.DELETE_DISH_SUCCESS, id, msg })

export const updateDishRequest = (id: number, name: string, size: number): UpdateDishType => ({ type: DishActionTypes.UPDATE_DISH_REQUEST, id, name, size })
export const updateDishSuccess = (dish: Dish, msg: string): UpdateDishType => ({ type: DishActionTypes.UPDATE_DISH_SUCCESS, dish, msg })

export const fetchDishDetailRequest = (dishId: number): FetchDishDetailType => ({ type: DishActionTypes.FETCH_DISH_DETAIL_REQUEST, dishId })
export const fetchDishDetailSuccess = (dishDetail: DishDetail): FetchDishDetailType => ({ type: DishActionTypes.FETCH_DISH_DETAIL_SUCCESS, dishDetail })

export const updateIngredientInADishRequest = (ingredient: IngredientInaDishDto): UpdateIngredientType => ({ type: DishActionTypes.UPDATE_INGREDIENT_REQUEST, ingredient })
export const updateIngredientInADishSuccess = (ingredient: IngredientInaDishDto, msg: string): UpdateIngredientType => ({ type: DishActionTypes.UPDATE_INGREDIENT_SUCCESS, ingredient, msg })

export const addIngredientInADishRequest = (ingredient: IngredientInaDishDto): AddIngredientType => ({ type: DishActionTypes.CREATE_INGREDIENT_REQUEST, ingredient })
export const addIngredientInADishSuccess = (ingredient: IngredientInaDishDto, msg: string): AddIngredientType => ({ type: DishActionTypes.CREATE_INGREDIENT_SUCCESS, ingredient, msg })

export const deleteIngredientInADishRequest = (id: number): DeleteIngredientType => ({ type: DishActionTypes.DELETE_INGREDIENT_REQUEST, id })
export const deleteIngredientInADishSuccess = (id: number, msg: string): DeleteIngredientType => ({ type: DishActionTypes.DELETE_INGREDIENT_SUCCESS, id, msg })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: DishActionTypes.HANDLE_ERROR, message, error })
