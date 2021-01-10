import { UserActionTypes, LoginType, User } from "./types";

export const loginRequest = (username: string, password: string): LoginType => ({ type: UserActionTypes.LOGIN_REQUEST, username, password })
export const loginSuccess = (user: User): LoginType => ({ type: UserActionTypes.LOGIN_SUCCESS, user })
export const loginFailed = (error: string): LoginType => ({ type: UserActionTypes.LOGIN_ERROR, error })
