import { Cart } from "utils/interfaces/cart.interface"
import { AppError, HandleErrorType } from "utils/interfaces/error-handling.interface"
import { MealInaRetreat, MealInaRetreatDto } from "utils/interfaces/meal-ina-retreat.interface"
import { Retreat, RetreatDetail, RetreatDto } from "utils/interfaces/retreat.interface"


export enum RetreatActionTypes {
  FETCH_ALL_REQUEST = '@@retreats/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@retreats/FETCH_ALL_SUCCESS',

  FETCH_RETREAT_DETAIL_REQUEST = '@@retreats/FETCH_RETREAT_DETAIL_REQUEST',
  FETCH_RETREAT_DETAIL_SUCCESS = '@@retreats/FETCH_RETREAT_DETAIL_SUCCESS',

  CREATE_RETREAT_REQUEST = '@@retreats/CREATE_RETREAT_REQUEST',
  CREATE_RETREAT_SUCCESS = '@@retreats/CREATE_RETREAT_SUCCESS',

  DELETE_RETREAT_REQUEST = '@@retreats/DELETE_RETREAT_REQUEST',
  DELETE_RETREAT_SUCCESS = '@@retreats/DELETE_RETREAT_SUCCESS',

  UPDATE_RETREAT_REQUEST = '@@retreats/UPDATE_RETREAT_REQUEST',
  UPDATE_RETREAT_SUCCESS = '@@retreats/UPDATE_RETREAT_SUCCESS',

  ADD_MEAL_REQUEST = '@@retreats/ADD_MEAL_REQUEST',
  ADD_MEAL_SUCCESS = '@@retreats/ADD_MEAL_SUCCESS',

  UPDATE_MEAL_REQUEST = '@@retreats/UPDATE_MEAL_REQUEST',
  UPDATE_MEAL_SUCCESS = '@@retreats/UPDATE_MEAL_SUCCESS',

  REMOVE_MEAL_REQUEST = '@@retreats/REMOVE_MEAL_REQUEST',
  REMOVE_MEAL_SUCCESS = '@@retreats/REMOVE_MEAL_SUCCESS',

  HANDLE_ERROR = '@@retreats/HANDLE_ERROR',
}

// ALL
export interface FetchAllRetreatsRequestType {
  type: typeof RetreatActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllRetreatsSuccessType {
  type: typeof RetreatActionTypes.FETCH_ALL_SUCCESS,
  retreats: Retreat[],
}


// DETAIL
export interface FetchRetreatDetailRequestType {
  type: typeof RetreatActionTypes.FETCH_RETREAT_DETAIL_REQUEST,
  id: number,
}

interface FetchRetreatDetailSuccessType {
  type: typeof RetreatActionTypes.FETCH_RETREAT_DETAIL_SUCCESS,
  retreatDetail: RetreatDetail,
}


// CREATE
export interface CreateRetreatRequestType {
  type: typeof RetreatActionTypes.CREATE_RETREAT_REQUEST,
  retreatDto: RetreatDto,
}

interface CreateRetreatSuccessType {
  type: typeof RetreatActionTypes.CREATE_RETREAT_SUCCESS,
  retreat: Retreat,
  msg: string,
}


// DELETE
export interface DeleteRetreatRequestType {
  type: typeof RetreatActionTypes.DELETE_RETREAT_REQUEST,
  id: number,
}

interface DeleteRetreatSuccessType {
  type: typeof RetreatActionTypes.DELETE_RETREAT_SUCCESS,
  id: number,
  msg: string,
}


// UPDATE
export interface UpdateRetreatRequestType {
  type: typeof RetreatActionTypes.UPDATE_RETREAT_REQUEST,
  retreat: Retreat,
}

interface UpdateRetreatSuccessType {
  type: typeof RetreatActionTypes.UPDATE_RETREAT_SUCCESS,
  retreat: Retreat,
  msg: string,
}


// ADD MEAL INA RETREAT
export interface AddMealRequestType {
  type: typeof RetreatActionTypes.ADD_MEAL_REQUEST,
  meal: MealInaRetreatDto,
}

interface AddMealSuccessType {
  type: typeof RetreatActionTypes.ADD_MEAL_SUCCESS,
  meal: MealInaRetreatDto,
  msg: string,
}


// UPDATE MEAL INA RETREAT
export interface UpdateMealRequestType {
  type: typeof RetreatActionTypes.UPDATE_MEAL_REQUEST,
  meal: MealInaRetreatDto,
}

interface UpdateMealSuccessType {
  type: typeof RetreatActionTypes.UPDATE_MEAL_SUCCESS,
  meal: MealInaRetreatDto,
  msg: string,
}


// REMOVE MEAL INA RETREAT
export interface RemoveMealRequestType {
  type: typeof RetreatActionTypes.REMOVE_MEAL_REQUEST,
  mealInaRetreatId: number,
}

interface RemoveMealSuccessType {
  type: typeof RetreatActionTypes.REMOVE_MEAL_SUCCESS,
  mealInaRetreatId: number,
  msg: string,
}


export type FetchAllRetreatsType = FetchAllRetreatsRequestType | FetchAllRetreatsSuccessType
export type FetchRetreatDetailType = FetchRetreatDetailRequestType | FetchRetreatDetailSuccessType
export type CreateRetreatType = CreateRetreatRequestType | CreateRetreatSuccessType
export type DeleteRetreatType = DeleteRetreatRequestType | DeleteRetreatSuccessType
export type UpdateRetreatType = UpdateRetreatRequestType | UpdateRetreatSuccessType
export type AddMealType = AddMealRequestType | AddMealSuccessType
export type UpdateMealType = UpdateMealRequestType | UpdateMealSuccessType
export type RemoveMealType = RemoveMealRequestType | RemoveMealSuccessType

export type RetreatStateActionTypes =
  FetchAllRetreatsType |
  FetchRetreatDetailType |
  CreateRetreatType |
  DeleteRetreatType |
  UpdateRetreatType |
  AddMealType |
  UpdateMealType |
  RemoveMealType |
  HandleErrorType

export interface RetreatsState {
  readonly loading: boolean
  readonly error: AppError | null
  readonly retreats: Retreat[]
  readonly retreatDetail: RetreatDetail | null
  readonly meals: MealInaRetreat[],
  readonly carts: Cart[],
  readonly removed: boolean,
  readonly successMessage: string | null,
}
