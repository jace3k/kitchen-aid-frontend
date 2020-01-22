import {
  FETCH_DISHES_FOR_MEAL_FAILED,
  FETCH_DISHES_FOR_MEAL_STARTED,
  FETCH_DISHES_FOR_MEAL_SUCCEED
} from '../../constants'

const initialState = {
  dishes: [],
  isLoading: true,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISHES_FOR_MEAL_STARTED:
      return {
        ...state,
        isLoading: true,
        dishes: [],
      }
    case FETCH_DISHES_FOR_MEAL_SUCCEED:
      return {
        ...state,
        isLoading: false,
        dishes: action.dishes.data,
        error: null,
      }
    case FETCH_DISHES_FOR_MEAL_FAILED:
      return {
        ...state,
        isLoading: false,
        dishes: [],
        error: action.error,
      }
    default:
      return state
  }
}
