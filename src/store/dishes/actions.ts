import { CreateDishType, DeleteDishType, Dish, DishActionTypes, FetchAllDishesType, UpdateDishType } from "./types"

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
