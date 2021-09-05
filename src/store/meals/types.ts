import { DishInaMeal, DishInaMealDto } from "utils/interfaces/dish-ina-meal.interface";
import { Meal, MealDetail, MealDto } from "utils/interfaces/meal.interface";

export enum MealActionTypes {
  FETCH_ALL_REQUEST = '@@meals/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@meals/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@meals/FETCH_ALL_ERROR',

  CREATE_MEAL_REQUEST = '@@meals/CREATE_MEAL_REQUEST',
  CREATE_MEAL_SUCCESS = '@@meals/CREATE_MEAL_SUCCESS',
  CREATE_MEAL_ERROR = '@@meals/CREATE_MEAL_ERROR',

  DELETE_MEAL_REQUEST = '@@meals/DELETE_MEAL_REQUEST',
  DELETE_MEAL_SUCCESS = '@@meals/DELETE_MEAL_SUCCESS',
  DELETE_MEAL_ERROR = '@@meals/DELETE_MEAL_ERROR',

  // UPDATE_MEAL_REQUEST = '@@meals/UPDATE_MEAL_REQUEST',
  // UPDATE_MEAL_SUCCESS = '@@meals/UPDATE_MEAL_SUCCESS',
  // UPDATE_MEAL_ERROR = '@@meals/UPDATE_MEAL_ERROR',

  FETCH_MEAL_DETAIL_REQUEST = '@@meals/FETCH_MEAL_DETAIL_REQUEST',
  FETCH_MEAL_DETAIL_SUCCESS = '@@meals/FETCH_MEAL_DETAIL_SUCCESS',
  FETCH_MEAL_DETAIL_ERROR = '@@meals/FETCH_MEAL_DETAIL_ERROR',

  // UPDATE_DISH_REQUEST = '@@meals/UPDATE_DISH_REQUEST',
  // UPDATE_DISH_SUCCESS = '@@meals/UPDATE_DISH_SUCCESS',
  // UPDATE_DISH_ERROR = '@@meals/UPDATE_DISH_ERROR',

  CREATE_DISH_REQUEST = '@@meals/CREATE_DISH_REQUEST',
  CREATE_DISH_SUCCESS = '@@meals/CREATE_DISH_SUCCESS',
  CREATE_DISH_ERROR = '@@meals/CREATE_DISH_ERROR',

  DELETE_DISH_REQUEST = '@@meals/DELETE_DISH_REQUEST',
  DELETE_DISH_SUCCESS = '@@meals/DELETE_DISH_SUCCESS',
  DELETE_DISH_ERROR = '@@meals/DELETE_DISH_ERROR',
}


// LIST
interface FetchAllMealsRequestType {
  type: typeof MealActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllMealsSuccessType {
  type: typeof MealActionTypes.FETCH_ALL_SUCCESS,
  meals: Meal[],
}

interface FetchAllMealsErrorType {
  type: typeof MealActionTypes.FETCH_ALL_ERROR,
  error: string,
}

// CREATE
export interface CreateMealRequestType {
  type: typeof MealActionTypes.CREATE_MEAL_REQUEST,
  meal: MealDto
}

interface CreateMealSuccessType {
  type: typeof MealActionTypes.CREATE_MEAL_SUCCESS,
  meal: Meal,
}

interface CreateMealFailedType {
  type: typeof MealActionTypes.CREATE_MEAL_ERROR,
  error: string,
}

// DELETE
export interface DeleteMealRequestType {
  type: typeof MealActionTypes.DELETE_MEAL_REQUEST,
  id: number,
}

interface DeleteMealSuccessType {
  type: typeof MealActionTypes.DELETE_MEAL_SUCCESS,
  id: number,
}

interface DeleteMealFailedType {
  type: typeof MealActionTypes.DELETE_MEAL_ERROR,
  error: string,
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

interface FetchMealDetailFailedType {
  type: typeof MealActionTypes.FETCH_MEAL_DETAIL_ERROR,
  error: string,
}

// CREATE DISH INA MEAL
export interface CreateDishRequestType {
  type: typeof MealActionTypes.CREATE_DISH_REQUEST,
  dish: DishInaMealDto,
}

interface CreateDishSuccessType {
  type: typeof MealActionTypes.CREATE_DISH_SUCCESS,
  dish: DishInaMealDto,
}

interface CreateDishFailedType {
  type: typeof MealActionTypes.CREATE_DISH_ERROR,
  error: string,
}

// DELETE DISH
export interface DeleteDishRequestType {
  type: typeof MealActionTypes.DELETE_DISH_REQUEST,
  id: number,
}

interface DeleteDishSuccessType {
  type: typeof MealActionTypes.DELETE_DISH_SUCCESS,
  id: number,
}

interface DeleteDishFailedType {
  type: typeof MealActionTypes.DELETE_DISH_ERROR,
  error: string,
}

export type FetchAllMealsType = FetchAllMealsRequestType | FetchAllMealsSuccessType | FetchAllMealsErrorType
export type CreateMealType = CreateMealRequestType | CreateMealSuccessType | CreateMealFailedType
export type DeleteMealType = DeleteMealRequestType | DeleteMealSuccessType | DeleteMealFailedType
// export type UpdateMealType = UpdateMealRequestType | UpdateMealSuccessType | UpdateMealFailedType
export type FetchMealDetailType = FetchMealDetailRequestType | FetchMealDetailSuccessType | FetchMealDetailFailedType
// export type UpdateDishType = UpdateDishRequestType | UpdateDishSuccessType | UpdateDishFailedType
export type CreateDishType = CreateDishRequestType | CreateDishSuccessType | CreateDishFailedType
export type DeleteDishType = DeleteDishRequestType | DeleteDishSuccessType | DeleteDishFailedType

export type MealStateActionTypes =
  FetchAllMealsType |
  CreateMealType |
  DeleteMealType |
  // UpdateMealType | 
  FetchMealDetailType |
  // UpdateDishType | 
  CreateDishType |
  DeleteDishType

export interface MealsState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly meals: Meal[],
  readonly mealDetail: MealDetail | null,
  readonly dishes: DishInaMeal[],
  readonly removed: boolean,
}
