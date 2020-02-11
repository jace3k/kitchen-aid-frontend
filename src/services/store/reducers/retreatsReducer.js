import {
  FETCH_RETREATS_STARTED,
  FETCH_RETREATS_SUCCEED,
  FETCH_RETREATS_FAILED,
  CREATE_RETREAT_STARTED,
  CREATE_RETREAT_SUCCEED,
  CREATE_RETREAT_FAILED,

  CLEAR_CREATE_RETREAT,

  FETCH_RETREAT_STARTED,
  FETCH_RETREAT_SUCCEED,
  FETCH_RETREAT_FAILED,

  UPDATE_RETREAT_STARTED,
  UPDATE_RETREAT_SUCCEED,
  UPDATE_RETREAT_FAILED,

  DELETE_RETREAT_STARTED,
  DELETE_RETREAT_SUCCEED,
  DELETE_RETREAT_FAILED,
} from '../../constants'

const initialState = {
  retreats: [],
  retreat: {},
  isLoading: true,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RETREATS_STARTED:
      return {
        ...initialState,
        retreats: [],
        error: null,
        isLoading: true,
      }
    case FETCH_RETREATS_SUCCEED:
      return {
        ...state,
        retreats: action.retreats.data,
        isLoading: false,
        error: null,
      }
    case FETCH_RETREATS_FAILED:
      return {
        ...state,
        retreats: [],
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
        createdRetreat: action.createdRetreat.data,
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
    case FETCH_RETREAT_STARTED:
      return {
        ...state,
        retreat: null,
        isLoading: true,
        error: null,
      }
    case FETCH_RETREAT_SUCCEED:
      return {
        ...state,
        retreat: action.retreat.data,
        isLoading: false,
        error: null,
      }
    case FETCH_RETREAT_FAILED:
      return {
        ...state,
        retreat: null,
        isLoading: false,
        error: action.error,
      }
    case UPDATE_RETREAT_STARTED:
      return {
        ...state,
        createdRetreat: null,
        isLoading: true,
        error: null,
      }
    case UPDATE_RETREAT_SUCCEED:
      return {
        ...state,
        createdRetreat: true,
        isLoading: false,
        error: null,
      }
    case UPDATE_RETREAT_FAILED:
      return {
        ...state,
        createdRetreat: null,
        isLoading: false,
        error: action.error,
      }
    case DELETE_RETREAT_STARTED:
      return {
        ...state,
        createdRetreat: null,
        isLoading: true,
        error: null,
      }
    case DELETE_RETREAT_SUCCEED:
      return {
        ...state,
        createdRetreat: true,
        isLoading: false,
        error: null,
      }
    case DELETE_RETREAT_FAILED:
      return {
        ...state,
        createdRetreat: null,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}
