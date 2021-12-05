import { DishInaMealDto } from "utils/interfaces/dish-ina-meal.interface"
import { HandleErrorType } from "utils/interfaces/error-handling.interface"
import { Meal, MealDetail, MealDto } from "utils/interfaces/meal.interface"
import {
  AddDishType,
  CreateMealType,
  DeleteDishType,
  DeleteMealType,
  FetchAllMealsType,
  FetchMealDetailType,
  MealActionTypes,
  UpdateMealType
} from "./types"

export const fetchAllMealsRequest = (): FetchAllMealsType => ({ type: MealActionTypes.FETCH_ALL_REQUEST })
export const fetchAllMealsSuccess = (meals: Meal[]): FetchAllMealsType => ({ type: MealActionTypes.FETCH_ALL_SUCCESS, meals })

export const createMealRequest = (meal: MealDto): CreateMealType => ({ type: MealActionTypes.CREATE_MEAL_REQUEST, meal })
export const createMealSuccess = (meal: Meal, msg: string): CreateMealType => ({ type: MealActionTypes.CREATE_MEAL_SUCCESS, meal, msg })

export const deleteMealRequest = (id: number): DeleteMealType => ({ type: MealActionTypes.DELETE_MEAL_REQUEST, id })
export const deleteMealSuccess = (id: number, msg: string): DeleteMealType => ({ type: MealActionTypes.DELETE_MEAL_SUCCESS, id, msg })

export const updateMealRequest = (meal: MealDto): UpdateMealType => ({ type: MealActionTypes.UPDATE_MEAL_REQUEST, meal })
export const updateMealSuccess = (meal: Meal, msg: string): UpdateMealType => ({ type: MealActionTypes.UPDATE_MEAL_SUCCESS, meal, msg })

export const fetchMealDetailRequest = (mealId: number): FetchMealDetailType => ({ type: MealActionTypes.FETCH_MEAL_DETAIL_REQUEST, mealId })
export const fetchMealDetailSuccess = (mealDetail: MealDetail): FetchMealDetailType => ({ type: MealActionTypes.FETCH_MEAL_DETAIL_SUCCESS, mealDetail })

// export const updateDishInAMealRequest = (dish: DishInaMealDto) => ({ type: MealActionTypes.UPDATE_DISH_REQUEST, dish })
// export const updateDishInAMealSuccess = (dish: DishInaMealDto) => ({ type: MealActionTypes.UPDATE_DISH_SUCCESS, dish })

export const addDishInAMealRequest = (dish: DishInaMealDto): AddDishType => ({ type: MealActionTypes.CREATE_DISH_REQUEST, dish })
export const addDishInAMealSuccess = (dish: DishInaMealDto, msg: string): AddDishType => ({ type: MealActionTypes.CREATE_DISH_SUCCESS, dish, msg })

export const deleteDishInAMealRequest = (id: number) => ({ type: MealActionTypes.DELETE_DISH_REQUEST, id })
export const deleteDishInAMealSuccess = (id: number, msg: string): DeleteDishType => ({ type: MealActionTypes.DELETE_DISH_SUCCESS, id, msg })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: MealActionTypes.HANDLE_ERROR, message, error })