
// type fetched from api
export interface User {
  username: string,
  displayName: string,
  role: string,
}

export enum UserActionTypes {
  LOGIN_REQUEST = '@@user/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@user/LOGIN_ERROR',
}

export interface LoginRequestType {
  type: typeof UserActionTypes.LOGIN_REQUEST,
  username: string,
  password: string,
}

interface LoginSuccessType {
  type: typeof UserActionTypes.LOGIN_SUCCESS,
  user: User,
}

interface LoginhErrorType {
  type: typeof UserActionTypes.LOGIN_ERROR,
  error: string,
}

export type LoginType = LoginRequestType | LoginSuccessType | LoginhErrorType

export interface UserState {
  readonly loading: boolean,
  readonly error: string | null,
  readonly authorized: boolean,
  readonly user: User | null,
}
