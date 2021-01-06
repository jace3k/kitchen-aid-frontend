import { SimpleActionTypes, SimpleFetchType } from "./types";

export const simpleValuefetchRequest = (): SimpleFetchType => ({ type: SimpleActionTypes.FETCH_REQUEST })
export const simpleValuefetchSuccess = (simpleValue: number): SimpleFetchType => ({ type: SimpleActionTypes.FETCH_SUCCESS, simpleValue })
export const simpleValuefetchFailed = (error: string): SimpleFetchType => ({ type: SimpleActionTypes.FETCH_ERROR, error })
