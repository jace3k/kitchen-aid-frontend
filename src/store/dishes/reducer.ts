import { Reducer } from 'redux'
import { DishesState, DishActionTypes, DishStateActionTypes } from './types'

const initialState: DishesState = {
  loading: false,
  dishes: [],
  ingredientRows: [],
  ingredientsLoading: false,
  error: null,
}

const reducer: Reducer<DishesState, DishStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case DishActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        dishes: [],
      }
    case DishActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dishes: action.dishes,
      }
    case DishActionTypes.FETCH_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        dishes: [],
      }
    case DishActionTypes.FETCH_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsLoading: true,
        ingredientRows: [],
      }
    case DishActionTypes.FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsLoading: false,
        ingredientRows: action.ingredients,
        error: null,
      }
    case DishActionTypes.FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredientsLoading: false,
        ingredientRows: [],
        error: action.error,
      }
    default:
      return state
  }
}

export { reducer as dishReducer }
