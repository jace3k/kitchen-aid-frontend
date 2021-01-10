import { Reducer } from 'redux'
import { UserState, UserActionTypes, LoginType } from './types'

const initialState: UserState = {
  loading: false,
  error: null,
  authorized: false,
  user: null,
}

const reducer: Reducer<UserState, LoginType> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        authorized: true,
        user: action.user,
      }
    case UserActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        authorized: false,
        user: null,
      }
    default:
      return state
  }
}

export { reducer as userReducer }
