import {
  FETCH_RETREATS_STARTED,
  FETCH_RETREATS_SUCCEED,
  FETCH_RETREATS_FAILED,
  CREATE_RETREAT_STARTED,
  CREATE_RETREAT_SUCCEED,
  CREATE_RETREAT_FAILED,
  CLEAR_CREATE_RETREAT,
} from '../../constants'

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_RETREATS_STARTED:
      return {
        ...state,
        retreats: null,
        error: null,
        isLoading: true,
      }
    
    case FETCH_RETREATS_SUCCEED:
      return {
        ...state,
        retreats: action.retreats,
        isLoading: false,
        error: null,
      }
    
    case FETCH_RETREATS_FAILED:
      return {
        ...state,
        retreats: null,
        isLoading: false,
        error: action.error
      }
    case CREATE_RETREAT_STARTED:
      return {
        ...state,
        createdRetreat: null,
        isLoading: true,
        error: null,
      }
    case CREATE_RETREAT_SUCCEED:
      return {
        ...state,
        createdRetreat: action.createdRetreat,
        isLoading: false,
        error: null,
      }
    case CREATE_RETREAT_FAILED:
      return {
        ...state,
        createdRetreat: null,
        isLoading: false,
        error: action.error,
      }
    case CLEAR_CREATE_RETREAT:
      return {
        ...state,
        createdRetreat: null,
        isLoading: false,
        error: null
      }
    default:
      return state
  }
}