
// type fetched from api
export interface Simple {
  simpleValue: number,
}

export enum SimpleActionTypes {
  FETCH_REQUEST = '@@simple/FETCH_REQUEST',
  FETCH_SUCCESS = '@@simple/FETCH_SUCCESS',
  FETCH_ERROR = '@@simple/FETCH_ERROR',
}

interface SimpleFetchRequestType {
  type: typeof SimpleActionTypes.FETCH_REQUEST,
}

interface SimpleFetchSuccessType {
  type: typeof SimpleActionTypes.FETCH_SUCCESS,
  simpleValue: number,
}

interface SimpleFetchErrorType {
  type: typeof SimpleActionTypes.FETCH_ERROR,
  error: string,
}

export type SimpleFetchType = SimpleFetchRequestType | SimpleFetchSuccessType | SimpleFetchErrorType

export interface SimpleState {
  readonly loading: boolean,
  readonly simpleValue: number,
  readonly error: string | null,
}
