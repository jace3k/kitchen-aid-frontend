import { LanguageType } from "utils/translations";
import { UserActionTypes, LoginType, User, ToggleDarkModeType, ChangeLanguageType } from "./types";

export const loginRequest = (username: string, password: string): LoginType => ({ type: UserActionTypes.LOGIN_REQUEST, username, password })
export const loginSuccess = (user: User): LoginType => ({ type: UserActionTypes.LOGIN_SUCCESS, user })
export const loginFailed = (error: string): LoginType => ({ type: UserActionTypes.LOGIN_ERROR, error })

export const tryLogin = (): LoginType => ({ type: UserActionTypes.LOGIN_LOCAL })
export const logout = (): LoginType => ({ type: UserActionTypes.LOGOUT })

export const toggleDarkMode = (isDarkMode: boolean): ToggleDarkModeType => ({ type: UserActionTypes.TOGGLE_DARK_MODE, isDarkMode })

export const changeLanguage = (language: LanguageType): ChangeLanguageType => ({ type: UserActionTypes.CHANGE_LANGUAGE, language })
