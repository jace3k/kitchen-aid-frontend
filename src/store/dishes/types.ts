export interface Dish {
	id: number,
	name: string,
	size: number,
}

// export interface DishRow

export enum DishActionTypes {
	FETCH_ALL_REQUEST = '@@dishes/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@dishes/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@dishes/FETCH_ALL_ERROR',

  CREATE_DISH_REQUEST = '@@dishes/CREATE_DISH_REQUEST',
  CREATE_DISH_SUCCESS = '@@dishes/CREATE_DISH_SUCCESS',
  CREATE_DISH_ERROR = '@@dishes/CREATE_DISH_ERROR',

  DELETE_DISH_REQUEST = '@@dishes/DELETE_DISH_REQUEST',
  DELETE_DISH_SUCCESS = '@@dishes/DELETE_DISH_SUCCESS',
  DELETE_DISH_ERROR = '@@dishes/DELETE_DISH_ERROR',

  UPDATE_DISH_REQUEST = '@@dishes/UPDATE_DISH_REQUEST',
  UPDATE_DISH_SUCCESS = '@@dishes/UPDATE_DISH_SUCCESS',
  UPDATE_DISH_ERROR = '@@dishes/UPDATE_DISH_ERROR',
}

// LIST
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

// CREATE

// CREATE
export interface CreateDishRequestType {
  type: typeof DishActionTypes.CREATE_DISH_REQUEST,
  name: string,
	size: number,
}

interface CreateDishSuccessType {
  type: typeof DishActionTypes.CREATE_DISH_SUCCESS,
  dish: Dish,
}

interface CreateDishFailedType {
  type: typeof DishActionTypes.CREATE_DISH_ERROR,
  error: string,
}


// DELETE
export interface DeleteDishRequestType {
  type: typeof DishActionTypes.DELETE_DISH_REQUEST,
  id: number,
}

interface DeleteDishSuccessType {
  type: typeof DishActionTypes.DELETE_DISH_SUCCESS,
  id: number,
}

interface DeleteDishFailedType {
  type: typeof DishActionTypes.DELETE_DISH_ERROR,
  error: string,
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
  dish: Dish
}

interface UpdateDishFailedType {
  type: typeof DishActionTypes.UPDATE_DISH_ERROR,
  error: string,
}

export type FetchAllDishesType = FetchAllDishesRequestType | FetchAllDishesSuccessType | FetchAllDishesErrorType
export type CreateDishType = CreateDishRequestType | CreateDishSuccessType | CreateDishFailedType
export type DeleteDishType = DeleteDishRequestType | DeleteDishSuccessType | DeleteDishFailedType
export type UpdateDishType = UpdateDishRequestType | UpdateDishSuccessType | UpdateDishFailedType

export type DishStateActionTypes = FetchAllDishesType | CreateDishType | DeleteDishType | UpdateDishType

export interface DishesState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly dishes: Dish[],
}
