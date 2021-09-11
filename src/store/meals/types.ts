import { DishInaMeal, DishInaMealDto } from "utils/interfaces/dish-ina-meal.interface";
import { AppError, HandleErrorType } from "utils/interfaces/error-handling.interface";
import { Meal, MealDetail, MealDto } from "utils/interfaces/meal.interface";

export enum MealActionTypes {
  FETCH_ALL_REQUEST = '@@meals/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@meals/FETCH_ALL_SUCCESS',

  CREATE_MEAL_REQUEST = '@@meals/CREATE_MEAL_REQUEST',
  CREATE_MEAL_SUCCESS = '@@meals/CREATE_MEAL_SUCCESS',

  DELETE_MEAL_REQUEST = '@@meals/DELETE_MEAL_REQUEST',
  DELETE_MEAL_SUCCESS = '@@meals/DELETE_MEAL_SUCCESS',

  // UPDATE_MEAL_REQUEST = '@@meals/UPDATE_MEAL_REQUEST',
  // UPDATE_MEAL_SUCCESS = '@@meals/UPDATE_MEAL_SUCCESS',

  FETCH_MEAL_DETAIL_REQUEST = '@@meals/FETCH_MEAL_DETAIL_REQUEST',
  FETCH_MEAL_DETAIL_SUCCESS = '@@meals/FETCH_MEAL_DETAIL_SUCCESS',

  // UPDATE_DISH_REQUEST = '@@meals/UPDATE_DISH_REQUEST',
  // UPDATE_DISH_SUCCESS = '@@meals/UPDATE_DISH_SUCCESS',

  CREATE_DISH_REQUEST = '@@meals/CREATE_DISH_REQUEST',
  CREATE_DISH_SUCCESS = '@@meals/CREATE_DISH_SUCCESS',

  DELETE_DISH_REQUEST = '@@meals/DELETE_DISH_REQUEST',
  DELETE_DISH_SUCCESS = '@@meals/DELETE_DISH_SUCCESS',

  HANDLE_ERROR = '@@meals/HANDLE_ERROR',
}


// LIST
interface FetchAllMealsRequestType {
  type: typeof MealActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllMealsSuccessType {
  type: typeof MealActionTypes.FETCH_ALL_SUCCESS,
  meals: Meal[],
}


// CREATE
export interface CreateMealRequestType {
  type: typeof MealActionTypes.CREATE_MEAL_REQUEST,
  meal: MealDto
}

interface CreateMealSuccessType {
  type: typeof MealActionTypes.CREATE_MEAL_SUCCESS,
  meal: Meal,
  msg: string,
}


// DELETE
export interface DeleteMealRequestType {
  type: typeof MealActionTypes.DELETE_MEAL_REQUEST,
  id: number,
}

interface DeleteMealSuccessType {
  type: typeof MealActionTypes.DELETE_MEAL_SUCCESS,
  id: number,
  msg: string,
}


// MEAL DETAIL
export interface FetchMealDetailRequestType {
  type: typeof MealActionTypes.FETCH_MEAL_DETAIL_REQUEST,
  mealId: number,
}

interface FetchMealDetailSuccessType {
  type: typeof MealActionTypes.FETCH_MEAL_DETAIL_SUCCESS,
  mealDetail: MealDetail,
}


// CREATE DISH INA MEAL
export interface AddDishRequestType {
  type: typeof MealActionTypes.CREATE_DISH_REQUEST,
  dish: DishInaMealDto,
}

interface AddDishSuccessType {
  type: typeof MealActionTypes.CREATE_DISH_SUCCESS,
  dish: DishInaMealDto,
  msg: string,
}


// DELETE DISH
export interface DeleteDishRequestType {
  type: typeof MealActionTypes.DELETE_DISH_REQUEST,
  id: number,
}

interface DeleteDishSuccessType {
  type: typeof MealActionTypes.DELETE_DISH_SUCCESS,
  id: number,
  msg: string,
}


export type FetchAllMealsType = FetchAllMealsRequestType | FetchAllMealsSuccessType
export type CreateMealType = CreateMealRequestType | CreateMealSuccessType
export type DeleteMealType = DeleteMealRequestType | DeleteMealSuccessType
// export type UpdateMealType = UpdateMealRequestType | UpdateMealSuccessType
export type FetchMealDetailType = FetchMealDetailRequestType | FetchMealDetailSuccessType
// export type UpdateDishType = UpdateDishRequestType | UpdateDishSuccessType
export type AddDishType = AddDishRequestType | AddDishSuccessType
export type DeleteDishType = DeleteDishRequestType | DeleteDishSuccessType

export type MealStateActionTypes =
  FetchAllMealsType |
  CreateMealType |
  DeleteMealType |
  // UpdateMealType | 
  FetchMealDetailType |
  // UpdateDishType | 
  AddDishType |
  DeleteDishType |
  HandleErrorType

export interface MealsState {
  readonly loading: boolean,
  readonly error: AppError | null,
  readonly meals: Meal[],
  readonly mealDetail: MealDetail | null,
  readonly dishes: DishInaMeal[],
  readonly removed: boolean,
  readonly successMessage: string | null,
}
