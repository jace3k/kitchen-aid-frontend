import { Reducer } from "redux"
import { MealActionTypes, MealsState, MealStateActionTypes } from "./types"

const initialState: MealsState = {
  loading: false,
  meals: [],
  error: null,
  mealDetail: null,
  dishes: [],
  removed: false,
}

const reducer: Reducer<MealsState, MealStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case MealActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        meals: [],
        removed: false,
      }
    case MealActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        meals: action.meals,
      }
    case MealActionTypes.FETCH_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case MealActionTypes.CREATE_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MealActionTypes.CREATE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        meals: [action.meal, ...state.meals],
      }
    case MealActionTypes.CREATE_MEAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case MealActionTypes.DELETE_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MealActionTypes.DELETE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        meals: state.meals.filter(x => x.id !== action.id),
        mealDetail: null,
        removed: true,
      }
    case MealActionTypes.DELETE_MEAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case MealActionTypes.FETCH_MEAL_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MealActionTypes.FETCH_MEAL_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dishes: action.mealDetail.dish_ina_meal,
        mealDetail: action.mealDetail,
      }
    case MealActionTypes.FETCH_MEAL_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case MealActionTypes.CREATE_DISH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MealActionTypes.CREATE_DISH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case MealActionTypes.CREATE_DISH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case MealActionTypes.DELETE_DISH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MealActionTypes.DELETE_DISH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dishes: state.dishes.filter(x => x.id !== action.id),
      }
    case MealActionTypes.DELETE_DISH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export { reducer as mealsReducer }
