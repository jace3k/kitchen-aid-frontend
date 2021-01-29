import { RetreatActionTypes, FetchAllRetreatsType, Retreat, FetchAllMealsForRetreatType, MealRow } from "./types";

export const fetchAllRetreatsRequest = (): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_REQUEST })
export const fetchAllRetreatsSuccess = (allRetreats: Retreat[]): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_SUCCESS, allRetreats })
export const fetchAllRetreatsFailed = (error: string): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_ERROR, error })


export const fetchMealsForRetreatRequest = (retreatId: number): FetchAllMealsForRetreatType =>
  ({ type: RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_REQUEST, retreatId })
export const fetchMealsForRetreatSuccess = (allMealsForRetreat: MealRow[], currentRetreat: Retreat | null): FetchAllMealsForRetreatType =>
  ({ type: RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_SUCCESS, allMealsForRetreat, currentRetreat })
export const fetchMealsForRetreatFailed = (error: string): FetchAllMealsForRetreatType =>
  ({ type: RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_ERROR, error })
