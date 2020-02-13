import {
  CREATE_MEAL_STARTED,
  CREATE_MEAL_SUCCEED,
  CREATE_MEAL_FAILED,

  DELETE_MEAL_STARTED,
  DELETE_MEAL_SUCCEED,
  DELETE_MEAL_FAILED,

  UPDATE_MEAL_SUCCEED,
  UPDATE_MEAL_FAILED,
  UPDATE_MEAL_STARTED
} from '../../constants'

const initialState = {
  createdMeal: null,
  isLoading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEAL_STARTED:
      return {
        ...initialState,
        isLoading: true,
      }
    case CREATE_MEAL_SUCCEED:
      return {
        ...state,
        isLoading: false,
        error: null,
        createdMeal: action.createdMeal.data,
      }
    case CREATE_MEAL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        createdMeal: null,
      }
    case DELETE_MEAL_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_MEAL_SUCCEED:
      return {
        ...state,
        isLoading: false,
        createdMeal: action.createdMeal,
        error: null,
      }
    case DELETE_MEAL_FAILED:
      return {
        ...state,
        isLoading: false,
        createdMeal: null,
        error: action.error,
      }
    case UPDATE_MEAL_STARTED:
      return {
        ...initialState,
        isLoading: true,
      }
    case UPDATE_MEAL_SUCCEED:
      return {
        ...state,
        isLoading: false,
        createdMeal: action.createdMeal,
        error: null,
      }
    case UPDATE_MEAL_FAILED:
      return {
        ...state,
        isLoading: false,
        createdMeal: null,
        error: action.error,
      }
    default:
      return state
  }
}
