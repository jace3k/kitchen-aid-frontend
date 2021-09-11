import { Reducer } from "redux"
import { MealActionTypes, MealsState, MealStateActionTypes } from "./types"

const initialState: MealsState = {
  loading: false,
  meals: [],
  error: null,
  mealDetail: null,
  dishes: [],
  removed: false,
  successMessage: null,
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
    case MealActionTypes.CREATE_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case MealActionTypes.CREATE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        meals: [action.meal, ...state.meals],
        successMessage: action.msg,
      }
    case MealActionTypes.DELETE_MEAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case MealActionTypes.DELETE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        meals: state.meals.filter(x => x.id !== action.id),
        mealDetail: null,
        removed: true,
        successMessage: action.msg,
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
    case MealActionTypes.CREATE_DISH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case MealActionTypes.CREATE_DISH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.msg,
      }
    case MealActionTypes.DELETE_DISH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case MealActionTypes.DELETE_DISH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dishes: state.dishes.filter(x => x.id !== action.id),
        successMessage: action.msg,
      }
    case MealActionTypes.HANDLE_ERROR:
      return {
        ...state,
        loading: false,
        loadingDetail: false,
        error: { error: action.error, message: action.message },
        successMessage: null,
      }
    default:
      return state
  }
}

export { reducer as mealsReducer }
