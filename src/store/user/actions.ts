import { LanguageType } from "utils/translations";
import { UserActionTypes, LoginType, User, ToggleDarkModeType, ChangeLanguageType, SetItemsPerPageType, Table_SetGroupByViewType } from "./types";

export const loginRequest = (username: string, password: string): LoginType => ({ type: UserActionTypes.LOGIN_REQUEST, username, password })
export const loginSuccess = (user: User, loginLocal: boolean = false): LoginType => ({ type: UserActionTypes.LOGIN_SUCCESS, user, loginLocal })
export const loginFailed = (message: string, error: string): LoginType => ({ type: UserActionTypes.LOGIN_ERROR, message, error })

export const tryLogin = (): LoginType => ({ type: UserActionTypes.LOGIN_LOCAL })
export const logout = (): LoginType => ({ type: UserActionTypes.LOGOUT })

export const toggleDarkMode = (isDarkMode: boolean): ToggleDarkModeType => ({ type: UserActionTypes.TOGGLE_DARK_MODE, isDarkMode })

export const changeLanguage = (language: LanguageType): ChangeLanguageType => ({ type: UserActionTypes.CHANGE_LANGUAGE, language })

export const setDefaultItemsPerPage = (itemsPerPage: number): SetItemsPerPageType => ({ type: UserActionTypes.SET_ITEMS_PER_PAGE, itemsPerPage })

export const setGroupByView = (groupKey: string, set: boolean): Table_SetGroupByViewType => ({ type: UserActionTypes.SET_GROUP_BY_VIEW, groupKey, set })
