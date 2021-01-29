import { Reducer } from 'redux'
import { IngredientsState, IngredientActionTypes, IngredientStateActionTypes } from './types'

const initialState: IngredientsState = {
  loading: false,
  ingredients: [],
  error: null,
}

const reducer: Reducer<IngredientsState, IngredientStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case IngredientActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        ingredients: [],
      }
    case IngredientActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ingredients: action.ingredients,
      }
    case IngredientActionTypes.FETCH_ALL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        ingredients: [],
      }
    default:
      return state
  }
}

export { reducer as ingredientReducer }
