import { Reducer } from 'redux'
import { UserState, UserActionTypes, UserStateActionTypes } from './types'

const initialState: UserState = {
  loading: false,
  error: null,
  authorized: false,
  user: null,
  darkMode: true,
  language: "pl",
  itemsPerPage: 10,
  redirect: null,
  loginLocal: false,
  groupByViews: [],
  expandedStates: [],
}

const reducer: Reducer<UserState, UserStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        redirect: null,
        error: null,
      }
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authorized: true,
        user: action.user,
        loginLocal: action.loginLocal
      }
    case UserActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: { message: action.message, error: action.error },
        authorized: false,
        user: null,
      }
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        authorized: false,
        redirect: '/',
        error: null,
      }
    case UserActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: action.isDarkMode,
      }
    case UserActionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      }
    case UserActionTypes.SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.itemsPerPage,
      }
    case UserActionTypes.SET_GROUP_BY_VIEW:
      return {
        ...state,
        groupByViews: action.set
          ? state.groupByViews.concat(action.groupKey)
          : state.groupByViews.filter(x => x !== action.groupKey)
      }
    default:
      return state
  }
}

export { reducer as userReducer }
