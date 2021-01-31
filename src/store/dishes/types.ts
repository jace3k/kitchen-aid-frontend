import { Ingredient } from "store/ingredients/types"

// type fetched from api
export interface Dish {
  id: number,
  name: string,
  ingredients?: IngredientRow[]
}


export interface DishesResponse {
  dishes: Dish[],
  status: string | number,
}

// wrapper on ingredient for a certain Dish.
export interface IngredientRow {
  id: number,
  ingredient: Ingredient,
  dishId: number,

  customName: string,
  price: number,
  margin: number,
  part: number,
}

export interface IngredientRowsResponse {
  ingredientRows: IngredientRow[],
  status: string,
}

export enum DishActionTypes {
  FETCH_ALL_REQUEST = '@@dishes/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@dishes/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@dishes/FETCH_ALL_ERROR',

  FETCH_INGREDIENTS_REQUEST = '@@dishes/FETCH_INGREDIENTS_REQUEST',
  FETCH_INGREDIENTS_SUCCESS = '@@dishes/FETCH_INGREDIENTS_SUCCESS',
  FETCH_INGREDIENTS_ERROR = '@@dishes/FETCH_INGREDIENTS_ERROR',
}

interface FetchAllDishesRequestType {
  type: typeof DishActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllDishesSuccessType {
  type: typeof DishActionTypes.FETCH_ALL_SUCCESS,
  dishes: Dish[],
}

interface FetchAllDishesErrorType {
  type: typeof DishActionTypes.FETCH_ALL_ERROR,
  error: string,
}


export interface FetchIngredientsRequestType {
  type: typeof DishActionTypes.FETCH_INGREDIENTS_REQUEST,
  dishId: number,
}

interface FetchIngredientsSuccessType {
  type: typeof DishActionTypes.FETCH_INGREDIENTS_SUCCESS,
  ingredients: IngredientRow[],
}

interface FetchIngredientsErrorType {
  type: typeof DishActionTypes.FETCH_INGREDIENTS_ERROR,
  error: string,
}

export type FetchAllDishesType = FetchAllDishesRequestType | FetchAllDishesSuccessType | FetchAllDishesErrorType
export type FetchIngredientsType = FetchIngredientsRequestType | FetchIngredientsSuccessType | FetchIngredientsErrorType

export type DishStateActionTypes = FetchAllDishesType | FetchIngredientsType

export interface DishesState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly dishes: Dish[],
  readonly ingredientRows: IngredientRow[],
  readonly ingredientsLoading: boolean,
}
