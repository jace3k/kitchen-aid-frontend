import {
  FETCH_DISHES_FOR_MEAL_FAILED,
  FETCH_DISHES_FOR_MEAL_STARTED,
  FETCH_DISHES_FOR_MEAL_SUCCEED,
  CREATE_DISH_STARTED,
  CREATE_DISH_SUCCEED,
  CREATE_DISH_FAILED,
  DELETE_DISH_SUCCEED,
  DELETE_DISH_FAILED,
  DELETE_DISH_STARTED
} from '../../constants'

const initialState = {
  dishes: {},
  createdDish: null,
  isLoading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISHES_FOR_MEAL_STARTED:
      return {
        ...state,
        isLoading: true,
        // dishes: [],
      }
    case FETCH_DISHES_FOR_MEAL_SUCCEED:
      return {
        ...state,
        isLoading: false,
        dishes: {
          ...state.dishes,
          [action.mealId]: action.dishes.data
        },
        error: null,
      }
    case FETCH_DISHES_FOR_MEAL_FAILED:
      return {
        ...state,
        isLoading: false,
        // dishes: [],
        error: action.error,
      }
    case CREATE_DISH_STARTED:
      return {
        ...state,
        isLoading: true,
        // createdDish: null,
      }
    case CREATE_DISH_SUCCEED:
      return {
        ...state,
        isLoading: false,
        createdDish: action.createdDish.data,
        error: null,
      }
    case CREATE_DISH_FAILED:
      return {
        ...state,
        isLoading: false,
        createdDish: null,
        error: action.error,
      }
    case DELETE_DISH_STARTED:
      return {
        ...state,
        isLoading: true,
        createdDish: null,
        error: null,
      }
    case DELETE_DISH_SUCCEED:
      return {
        ...state,
        isLoading: false,
        createdDish: action.createdDish.data,
        error: null,
      }
    case DELETE_DISH_FAILED:
      return {
        ...state,
        isLoading: false,
        createdDish: null,
        error: action.error,
      }
    default:
      return state
  }
}
