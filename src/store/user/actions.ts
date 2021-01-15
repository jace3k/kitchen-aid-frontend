import { LanguageType } from "utils/translations";
import { UserActionTypes, LoginType, User, ToggleDarkModeType, ChangeLanguageType } from "./types";

export const loginRequest = (username: string, password: string): LoginType => ({ type: UserActionTypes.LOGIN_REQUEST, username, password })
export const loginSuccess = (user: User): LoginType => ({ type: UserActionTypes.LOGIN_SUCCESS, user })
export const loginFailed = (error: string): LoginType => ({ type: UserActionTypes.LOGIN_ERROR, error })

export const toggleDarkMode = (): ToggleDarkModeType => ({ type: UserActionTypes.TOGGLE_DARK_MODE })

export const changeLanguage = (language: LanguageType): ChangeLanguageType => ({ type: UserActionTypes.CHANGE_LANGUAGE, language })
