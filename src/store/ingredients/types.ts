
// type fetched from api
export interface Ingredient {
  id: number,
  name: string,
  defaultPrice: number,
}

export interface IngredientsResponse {
  ingredients: Ingredient[],
  status: string | number,
}

export enum IngredientActionTypes {
  FETCH_ALL_REQUEST = '@@ingredients/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@ingredients/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@ingredients/FETCH_ALL_ERROR',
}

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

export type FetchAllIngredientsType = FetchAllIngredientsRequestType | FetchAllIngredientsSuccessType | FetchAllIngredientsErrorType

export type IngredientStateActionTypes = FetchAllIngredientsType

export interface IngredientsState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly ingredients: Ingredient[],
}
