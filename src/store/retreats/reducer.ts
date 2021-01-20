import { Reducer } from 'redux'
import { RetreatsState, RetreatActionTypes, RetreatStateActionTypes } from './types'

const initialState: RetreatsState = {
  loading: false,
  allRetreats: [],
  allMealsForRetreat: [],
  currentRetreat: null,
  error: null,
}

const reducer: Reducer<RetreatsState, RetreatStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case RetreatActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        allRetreats: [],
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
    case RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        allMealsForRetreat: [],
        currentRetreat: null,
      }
    case RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allMealsForRetreat: action.allMealsForRetreat,
        currentRetreat: action.currentRetreat,
      }
    case RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        allMealsForRetreat: [],
      }
    default:
      return state
  }
}

export { reducer as retreatReducer }
