import { Reducer } from 'redux'
import { RetreatsState, RetreatActionTypes, RetreatStateActionTypes } from './types'

const initialState: RetreatsState = {
  loading: false,
  allRetreats: [],
  error: null,
}

const reducer: Reducer<RetreatsState, RetreatStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case RetreatActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RetreatActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allRetreats: action.allRetreats,
      }
    case RetreatActionTypes.FETCH_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        allRetreats: [],
      }
    default:
      return state
  }
}

export { reducer as retreatReducer }
