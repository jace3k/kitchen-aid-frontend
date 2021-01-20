
// type fetched from api
export interface Retreat {
  id: number,
  name: string,
  mealsCount: number,
  carts: number,
}

export interface MealRow {
  id: number,
  retreatId: number,
  name: string,
}

export interface MealRowResponse {
  mealRows: MealRow[],
  retreat: Retreat | null,
  status: string,
}

export interface RetreatResponse {
  retreats: Retreat[],
  status: string | number,
}

export enum RetreatActionTypes {
  FETCH_ALL_REQUEST = '@@retreats/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@retreats/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@retreats/FETCH_ALL_ERROR',

  FETCH_MEALS_FOR_RETREAT_REQUEST = '@retreats/FETCH_MEALS_FOR_RETREAT_REQUEST',
  FETCH_MEALS_FOR_RETREAT_SUCCESS = '@retreats/FETCH_MEALS_FOR_RETREAT_SUCCESS',
  FETCH_MEALS_FOR_RETREAT_ERROR = '@retreats/FETCH_MEALS_FOR_RETREAT_ERROR',
}

interface FetchAllRetreatsRequestType {
  type: typeof RetreatActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllRetreatsSuccessType {
  type: typeof RetreatActionTypes.FETCH_ALL_SUCCESS,
  allRetreats: Retreat[],
}

interface FetchAllRetreatsErrorType {
  type: typeof RetreatActionTypes.FETCH_ALL_ERROR,
  error: string,
}

export type FetchAllRetreatsType = FetchAllRetreatsRequestType | FetchAllRetreatsSuccessType | FetchAllRetreatsErrorType

export interface FetchAllMealsForRetreatRequestType {
  type: typeof RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_REQUEST,
  retreatId: number,
}

interface FetchAllMealsForRetreatSuccessType {
  type: typeof RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_SUCCESS,
  allMealsForRetreat: MealRow[],
  currentRetreat: Retreat | null,
}

interface FetchAllMealsForRetreatErrorType {
  type: typeof RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_ERROR,
  error: string,
}

export type FetchAllMealsForRetreatType = FetchAllMealsForRetreatRequestType | FetchAllMealsForRetreatSuccessType | FetchAllMealsForRetreatErrorType

export type RetreatStateActionTypes = FetchAllRetreatsType | FetchAllMealsForRetreatType

export interface RetreatsState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly allRetreats: Retreat[],
  readonly allMealsForRetreat: MealRow[],
  readonly currentRetreat: Retreat | null,
}
