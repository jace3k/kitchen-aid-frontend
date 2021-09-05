import { DishInaMealDto } from "utils/interfaces/dish-ina-meal.interface"
import { Meal, MealDetail, MealDto } from "utils/interfaces/meal.interface"
import { CreateMealType, DeleteMealType, FetchAllMealsType, MealActionTypes } from "./types"

export const fetchAllMealsRequest = (): FetchAllMealsType => ({ type: MealActionTypes.FETCH_ALL_REQUEST })
export const fetchAllMealsSuccess = (meals: Meal[]): FetchAllMealsType => ({ type: MealActionTypes.FETCH_ALL_SUCCESS, meals })
export const fetchAllMealsFailed = (error: string): FetchAllMealsType => ({ type: MealActionTypes.FETCH_ALL_ERROR, error })

export const createMealRequest = (meal: MealDto): CreateMealType => ({ type: MealActionTypes.CREATE_MEAL_REQUEST, meal })
export const createMealSuccess = (meal: Meal): CreateMealType => ({ type: MealActionTypes.CREATE_MEAL_SUCCESS, meal })
export const createMealFailed = (error: string): CreateMealType => ({ type: MealActionTypes.CREATE_MEAL_ERROR, error })

export const deleteMealRequest = (id: number): DeleteMealType => ({ type: MealActionTypes.DELETE_MEAL_REQUEST, id })
export const deleteMealSuccess = (id: number): DeleteMealType => ({ type: MealActionTypes.DELETE_MEAL_SUCCESS, id })
export const deleteMealFailed = (error: string): DeleteMealType => ({ type: MealActionTypes.DELETE_MEAL_ERROR, error })

// export const updateMealRequest = (id: number, name: string, size: number): UpdateMealType => ({ type: MealActionTypes.UPDATE_MEAL_REQUEST, id, name, size })
// export const updateMealSuccess = (meal: Meal): UpdateMealType => ({ type: MealActionTypes.UPDATE_MEAL_SUCCESS, meal })
// export const updateMealFailed = (error: string): UpdateMealType => ({ type: MealActionTypes.UPDATE_MEAL_ERROR, error })


export const fetchMealDetailRequest = (mealId: number) => ({ type: MealActionTypes.FETCH_MEAL_DETAIL_REQUEST, mealId })
export const fetchMealDetailSuccess = (mealDetail: MealDetail) => ({ type: MealActionTypes.FETCH_MEAL_DETAIL_SUCCESS, mealDetail })
export const fetchMealDetailFailed = (error: string) => ({ type: MealActionTypes.FETCH_MEAL_DETAIL_ERROR, error })

// export const updateDishInAMealRequest = (dish: DishInaMealDto) => ({ type: MealActionTypes.UPDATE_DISH_REQUEST, dish })
// export const updateDishInAMealSuccess = (dish: DishInaMealDto) => ({ type: MealActionTypes.UPDATE_DISH_SUCCESS, dish })
// export const updateDishInAMealFailed = (error: string) => ({ type: MealActionTypes.UPDATE_DISH_ERROR, error })

export const createDishInAMealRequest = (dish: DishInaMealDto) => ({ type: MealActionTypes.CREATE_DISH_REQUEST, dish })
export const createDishInAMealSuccess = (dish: DishInaMealDto) => ({ type: MealActionTypes.CREATE_DISH_SUCCESS, dish })
export const createDishInAMealFailed = (error: string) => ({ type: MealActionTypes.CREATE_DISH_ERROR, error })

export const deleteDishInAMealRequest = (id: number) => ({ type: MealActionTypes.DELETE_DISH_REQUEST, id })
export const deleteDishInAMealSuccess = (id: number) => ({ type: MealActionTypes.DELETE_DISH_SUCCESS, id })
export const deleteDishInAMealFailed = (error: string) => ({ type: MealActionTypes.DELETE_DISH_ERROR, error })
