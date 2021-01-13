import { RetreatActionTypes, FetchAllRetreatsType, Retreat } from "./types";

export const fetchAllRetreatsRequest = (): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_REQUEST })
export const simpleValuefetchSuccess = (allRetreats: Retreat[]): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_SUCCESS, allRetreats })
export const simpleValuefetchFailed = (error: string): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_ERROR, error })
