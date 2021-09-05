import { IngredientDetal } from "utils/interfaces/ingredient.interface"

// type fetched from api
export interface Ingredient {
  id: number,
  name: string,
  // defaultPrice: number,
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

export interface IngredientRowResponse {
  mealRows: IngredientRow[],
  ingredient: Ingredient,
  status: string,
}

export interface IngredientsResponse {
  ingredients: Ingredient[],
  status: string | number,
}

export enum IngredientActionTypes {
  FETCH_ALL_REQUEST = '@@ingredients/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@ingredients/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@ingredients/FETCH_ALL_ERROR',

  CREATE_INGREDIENT_REQUEST = '@@ingredients/CREATE_INGREDIENT_REQUEST',
  CREATE_INGREDIENT_SUCCESS = '@@ingredients/CREATE_INGREDIENT_SUCCESS',
  CREATE_INGREDIENT_ERROR = '@@ingredients/CREATE_INGREDIENT_ERROR',

  DELETE_INGREDIENT_REQUEST = '@@ingredients/DELETE_INGREDIENT_REQUEST',
  DELETE_INGREDIENT_SUCCESS = '@@ingredients/DELETE_INGREDIENT_SUCCESS',
  DELETE_INGREDIENT_ERROR = '@@ingredients/DELETE_INGREDIENT_ERROR',

  UPDATE_INGREDIENT_REQUEST = '@@ingredients/UPDATE_INGREDIENT_REQUEST',
  UPDATE_INGREDIENT_SUCCESS = '@@ingredients/UPDATE_INGREDIENT_SUCCESS',
  UPDATE_INGREDIENT_ERROR = '@@ingredients/UPDATE_INGREDIENT_ERROR',

  FETCH_INGREDIENT_DETAIL_REQUEST = '@@ingredients/FETCH_INGREDIENT_DETAIL_REQUEST',
  FETCH_INGREDIENT_DETAIL_SUCCESS = '@@ingredients/FETCH_INGREDIENT_DETAIL_SUCCESS',
  FETCH_INGREDIENT_DETAIL_ERROR = '@@ingredients/FETCH_INGREDIENT_DETAIL_ERROR',
}

// LIST
interface FetchAllIngredientsRequestType {
  type: typeof IngredientActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllIngredientsSuccessType {
  type: typeof IngredientActionTypes.FETCH_ALL_SUCCESS,
  ingredients: Ingredient[],
}

interface FetchAllIngredientsErrorType {
  type: typeof IngredientActionTypes.FETCH_ALL_ERROR,
  error: string,
}


// CREATE
export interface CreateIngredientRequestType {
  type: typeof IngredientActionTypes.CREATE_INGREDIENT_REQUEST,
  name: string,
}

interface CreateIngredientSuccessType {
  type: typeof IngredientActionTypes.CREATE_INGREDIENT_SUCCESS,
  ingredient: Ingredient,
}

interface CreateIngredientFailedType {
  type: typeof IngredientActionTypes.CREATE_INGREDIENT_ERROR,
  error: string,
}


// DELETE
export interface DeleteIngredientRequestType {
  type: typeof IngredientActionTypes.DELETE_INGREDIENT_REQUEST,
  id: number,
}

interface DeleteIngredientSuccessType {
  type: typeof IngredientActionTypes.DELETE_INGREDIENT_SUCCESS,
  id: number,
}

interface DeleteIngredientFailedType {
  type: typeof IngredientActionTypes.DELETE_INGREDIENT_ERROR,
  error: string,
}


// UPDATE
export interface UpdateIngredientRequestType {
  type: typeof IngredientActionTypes.UPDATE_INGREDIENT_REQUEST,
  id: number,
  name: string,
}

interface UpdateIngredientSuccessType {
  type: typeof IngredientActionTypes.UPDATE_INGREDIENT_SUCCESS,
  id: number,
  name: string,
}

interface UpdateIngredientFailedType {
  type: typeof IngredientActionTypes.UPDATE_INGREDIENT_ERROR,
  error: string,
}

// DETAIL
export interface FetchIngredientDetailRequestType {
  type: typeof IngredientActionTypes.FETCH_INGREDIENT_DETAIL_REQUEST,
  id: number,
}

interface FetchIngredientDetailSuccessType {
  type: typeof IngredientActionTypes.FETCH_INGREDIENT_DETAIL_SUCCESS,
  ingredientDetail: IngredientDetal,
}

interface FetchIngredientDetailFailedType {
  type: typeof IngredientActionTypes.FETCH_INGREDIENT_DETAIL_ERROR,
  error: string,
}


export type FetchAllIngredientsType = FetchAllIngredientsRequestType | FetchAllIngredientsSuccessType | FetchAllIngredientsErrorType
export type CreateIngredientType = CreateIngredientRequestType | CreateIngredientSuccessType | CreateIngredientFailedType
export type DeleteIngredientType = DeleteIngredientRequestType | DeleteIngredientSuccessType | DeleteIngredientFailedType
export type UpdateIngredientType = UpdateIngredientRequestType | UpdateIngredientSuccessType | UpdateIngredientFailedType
export type FetchIngredientDetailType = FetchIngredientDetailRequestType | FetchIngredientDetailSuccessType | FetchIngredientDetailFailedType

export type IngredientStateActionTypes = FetchAllIngredientsType | CreateIngredientType | DeleteIngredientType | UpdateIngredientType | FetchIngredientDetailType

export interface IngredientsState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly ingredients: Ingredient[],
  readonly ingredientDetail: IngredientDetal | null,
}
