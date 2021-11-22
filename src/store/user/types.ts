import { AppError } from "utils/interfaces/error-handling.interface"
import { LanguageType } from "utils/translations"

// type fetched from api
export interface User {
  username: string,
  displayName: string,
  role: string,
  exp: number,
}

export interface LoginResponseSuccess {
  token: string,
  status: number,
}

export interface LoginResponseFailed {
  message: string,
  status: number,
}

export enum UserActionTypes {
  LOGIN_REQUEST = '@@user/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@user/LOGIN_ERROR',
  LOGIN_LOCAL = '@@user/LOGIN_LOCAL',
  LOGOUT = '@@user/LOGOUT',

  TOGGLE_DARK_MODE = '@@user/TOGGLE_DARK_MODE',
  CHANGE_LANGUAGE = '@@user/CHANGE_LANGUAGE',
  SET_ITEMS_PER_PAGE = '@@user/SET_ITEMS_PER_PAGE',

  SET_GROUP_BY_VIEW = '@@user/SET_GROUP_BY_VIEW',
  SET_EXPANDED_STATE = '@@user/SET_EXPANDED_STATE',
}

export interface LoginRequestType {
  type: typeof UserActionTypes.LOGIN_REQUEST,
  username: string,
  password: string,
}

interface LoginSuccessType {
  type: typeof UserActionTypes.LOGIN_SUCCESS,
  user: User,
  loginLocal: boolean,
}

interface LoginErrorType {
  type: typeof UserActionTypes.LOGIN_ERROR,
  message: string,
  error: string,
}

interface LoginLocalType {
  type: typeof UserActionTypes.LOGIN_LOCAL,
}

interface LogoutType {
  type: typeof UserActionTypes.LOGOUT,
}

export type LoginType = LoginRequestType | LoginSuccessType | LoginErrorType | LoginLocalType | LogoutType

export type ToggleDarkModeType = {
  type: typeof UserActionTypes.TOGGLE_DARK_MODE,
  isDarkMode: boolean,
}

export type ChangeLanguageType = {
  type: typeof UserActionTypes.CHANGE_LANGUAGE,
  language: LanguageType,
}

export type SetItemsPerPageType = {
  type: typeof UserActionTypes.SET_ITEMS_PER_PAGE,
  itemsPerPage: number,
}

export type Table_SetGroupByViewType = {
  type: UserActionTypes.SET_GROUP_BY_VIEW,
  groupKey: string,
  set: boolean,
}

export type UserStateActionTypes =
  LoginType
  | ToggleDarkModeType
  | ChangeLanguageType
  | SetItemsPerPageType
  | Table_SetGroupByViewType

export interface UserState {
  readonly loading: boolean,
  readonly error: AppError | null,
  readonly authorized: boolean,
  readonly user: User | null,
  readonly darkMode: boolean,
  readonly language: LanguageType,
  readonly itemsPerPage: number,
  readonly redirect: string | null,
  readonly loginLocal: boolean,
  readonly groupByViews: string[],
  readonly expandedStates: string[],
}
