import { Dish, DishDetail } from "utils/interfaces/dish.interface"
import { AppError, HandleErrorType } from "utils/interfaces/error-handling.interface"
import { IngredientInADish, IngredientInaDishDto } from "utils/interfaces/ingredient-ina-dish.interface"


export enum DishActionTypes {
  FETCH_ALL_REQUEST = '@@dishes/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@dishes/FETCH_ALL_SUCCESS',

  CREATE_DISH_REQUEST = '@@dishes/CREATE_DISH_REQUEST',
  CREATE_DISH_SUCCESS = '@@dishes/CREATE_DISH_SUCCESS',

  DELETE_DISH_REQUEST = '@@dishes/DELETE_DISH_REQUEST',
  DELETE_DISH_SUCCESS = '@@dishes/DELETE_DISH_SUCCESS',

  UPDATE_DISH_REQUEST = '@@dishes/UPDATE_DISH_REQUEST',
  UPDATE_DISH_SUCCESS = '@@dishes/UPDATE_DISH_SUCCESS',

  FETCH_DISH_DETAIL_REQUEST = '@@dishes/FETCH_DISH_DETAIL_REQUEST',
  FETCH_DISH_DETAIL_SUCCESS = '@@dishes/FETCH_DISH_DETAIL_SUCCESS',

  UPDATE_INGREDIENT_REQUEST = '@@dishes/UPDATE_INGREDIENT_REQUEST',
  UPDATE_INGREDIENT_SUCCESS = '@@dishes/UPDATE_INGREDIENT_SUCCESS',

  CREATE_INGREDIENT_REQUEST = '@@dishes/CREATE_INGREDIENT_REQUEST',
  CREATE_INGREDIENT_SUCCESS = '@@dishes/CREATE_INGREDIENT_SUCCESS',

  DELETE_INGREDIENT_REQUEST = '@@dishes/DELETE_INGREDIENT_REQUEST',
  DELETE_INGREDIENT_SUCCESS = '@@dishes/DELETE_INGREDIENT_SUCCESS',

  HANDLE_ERROR = '@@dishes/HANDLE_ERROR',
}

// LIST
interface FetchAllDishesRequestType {
  type: typeof DishActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllDishesSuccessType {
  type: typeof DishActionTypes.FETCH_ALL_SUCCESS,
  dishes: Dish[],
}


// CREATE
export interface CreateDishRequestType {
  type: typeof DishActionTypes.CREATE_DISH_REQUEST,
  name: string,
  size: number,
}

interface CreateDishSuccessType {
  type: typeof DishActionTypes.CREATE_DISH_SUCCESS,
  dish: Dish,
  msg: string,
}


// DELETE
export interface DeleteDishRequestType {
  type: typeof DishActionTypes.DELETE_DISH_REQUEST,
  id: number,
}

interface DeleteDishSuccessType {
  type: typeof DishActionTypes.DELETE_DISH_SUCCESS,
  id: number,
  msg: string,
}


// UPDATE
export interface UpdateDishRequestType {
  type: typeof DishActionTypes.UPDATE_DISH_REQUEST,
  id: number,
  name: string,
  size: number,
}

interface UpdateDishSuccessType {
  type: typeof DishActionTypes.UPDATE_DISH_SUCCESS,
  dish: Dish,
  msg: string,
}


// DISH DETAIL
export interface FetchDishDetailRequestType {
  type: typeof DishActionTypes.FETCH_DISH_DETAIL_REQUEST,
  dishId: number,
}

interface FetchDishDetailSuccessType {
  type: typeof DishActionTypes.FETCH_DISH_DETAIL_SUCCESS,
  dishDetail: DishDetail,
}


// UPDATE INGREDIENT
export interface UpdateIngredientRequestType {
  type: typeof DishActionTypes.UPDATE_INGREDIENT_REQUEST,
  ingredient: IngredientInaDishDto,
}

interface UpdateIngredientSuccessType {
  type: typeof DishActionTypes.UPDATE_INGREDIENT_SUCCESS,
  ingredient: IngredientInaDishDto,
  msg: string,
}


// CREATE INGREDIENT
export interface AddIngredientRequestType {
  type: typeof DishActionTypes.CREATE_INGREDIENT_REQUEST,
  ingredient: IngredientInaDishDto,
}

interface AddIngredientSuccessType {
  type: typeof DishActionTypes.CREATE_INGREDIENT_SUCCESS,
  ingredient: IngredientInaDishDto,
  msg: string,
}


// DELETE INGREDIENT
export interface DeleteIngredientRequestType {
  type: typeof DishActionTypes.DELETE_INGREDIENT_REQUEST,
  id: number,
}

interface DeleteIngredientSuccessType {
  type: typeof DishActionTypes.DELETE_INGREDIENT_SUCCESS,
  id: number,
  msg: string,
}


export type FetchAllDishesType = FetchAllDishesRequestType | FetchAllDishesSuccessType
export type CreateDishType = CreateDishRequestType | CreateDishSuccessType
export type DeleteDishType = DeleteDishRequestType | DeleteDishSuccessType
export type UpdateDishType = UpdateDishRequestType | UpdateDishSuccessType
export type FetchDishDetailType = FetchDishDetailRequestType | FetchDishDetailSuccessType
export type UpdateIngredientType = UpdateIngredientRequestType | UpdateIngredientSuccessType
export type AddIngredientType = AddIngredientRequestType | AddIngredientSuccessType
export type DeleteIngredientType = DeleteIngredientRequestType | DeleteIngredientSuccessType

export type DishStateActionTypes =
  FetchAllDishesType |
  CreateDishType |
  DeleteDishType |
  UpdateDishType |
  FetchDishDetailType |
  UpdateIngredientType |
  AddIngredientType |
  DeleteIngredientType |
  HandleErrorType

export interface DishesState {
  readonly loading: boolean,
  readonly error: AppError | null,
  readonly dishes: Dish[],
  readonly dishDetail: DishDetail | null,
  readonly ingredients: IngredientInADish[],
  readonly removed: boolean,
  readonly successMessage: string | null,
}
