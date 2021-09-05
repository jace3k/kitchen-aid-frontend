import { Retreat } from "utils/interfaces/retreat.interface"


export enum RetreatActionTypes {
  FETCH_ALL_REQUEST = '@@retreats/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@retreats/FETCH_ALL_SUCCESS',
  FETCH_ALL_ERROR = '@@retreats/FETCH_ALL_ERROR',
}

interface FetchAllRetreatsRequestType {
  type: typeof RetreatActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllRetreatsSuccessType {
  type: typeof RetreatActionTypes.FETCH_ALL_SUCCESS,
  retreats: Retreat[],
}

interface FetchAllRetreatsErrorType {
  type: typeof RetreatActionTypes.FETCH_ALL_ERROR,
  error: string,
}

export type FetchAllRetreatsType = FetchAllRetreatsRequestType | FetchAllRetreatsSuccessType | FetchAllRetreatsErrorType

export type RetreatStateActionTypes = FetchAllRetreatsType

export interface RetreatsState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly retreats: Retreat[],
  readonly meals: any[],
  readonly currentRetreat: Retreat | null,
}
