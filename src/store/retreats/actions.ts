import { Retreat } from "utils/interfaces/retreat.interface";
import { RetreatActionTypes, FetchAllRetreatsType } from "./types";

export const fetchAllRetreatsRequest = (): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_REQUEST })
export const fetchAllRetreatsSuccess = (retreats: Retreat[]): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_SUCCESS, retreats })
export const fetchAllRetreatsFailed = (error: string): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_ERROR, error })
