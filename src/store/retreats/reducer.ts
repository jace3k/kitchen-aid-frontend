import RetreatDetail from 'components/Retreats/RetreatDetail'
import { Reducer } from 'redux'
import { RetreatsState, RetreatActionTypes, RetreatStateActionTypes } from './types'

const initialState: RetreatsState = {
  loading: false,
  retreats: [],
  meals: [],
  retreatDetail: null,
  error: null,
  removed: false,
}

const reducer: Reducer<RetreatsState, RetreatStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case RetreatActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
        retreats: [],
      }
    case RetreatActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        retreats: action.retreats,
        removed: false,
      }
    case RetreatActionTypes.FETCH_RETREAT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        retreatDetail: null,
      }
    case RetreatActionTypes.FETCH_RETREAT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        retreatDetail: action.retreatDetail,
        meals: action.retreatDetail.meal_ina_retreat,
      }
    case RetreatActionTypes.CREATE_RETREAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        retreatDetail: null,
      }
    case RetreatActionTypes.CREATE_RETREAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        errorMessage: null,
        retreats: [action.retreat, ...state.retreats]
      }
    case RetreatActionTypes.DELETE_RETREAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RetreatActionTypes.DELETE_RETREAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        retreats: state.retreats.filter(x => x.id !== action.id),
        retreatDetail: null,
        removed: true,
      }
    case RetreatActionTypes.UPDATE_RETREAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        retreatDetail: null,
      }
    case RetreatActionTypes.UPDATE_RETREAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        retreatDetail: {
          id: state.retreatDetail?.id || action.retreat.id,
          name: action.retreat.name,
          meal_ina_retreat: state.retreatDetail?.meal_ina_retreat || [],
        }
      }
    case RetreatActionTypes.ADD_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RetreatActionTypes.ADD_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case RetreatActionTypes.UPDATE_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RetreatActionTypes.UPDATE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case RetreatActionTypes.REMOVE_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RetreatActionTypes.REMOVE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        meals: state.meals.filter(x => x.id !== action.mealInaRetreatId),
        error: null,
      }
    case RetreatActionTypes.HANDLE_ERROR:
      return {
        ...state,
        loading: false,
        error: { error: action.error, message: action.message }
      }
    default:
      return state
  }
}

export { reducer as retreatReducer }
