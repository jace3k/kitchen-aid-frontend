import { Reducer } from 'redux'
import { IngredientsState, IngredientActionTypes, IngredientStateActionTypes } from './types'

const initialState: IngredientsState = {
  loading: false,
  ingredients: [],
  error: null,
  ingredientDetail: null,
  loadingDetail: false,
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
    case IngredientActionTypes.CREATE_INGREDIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case IngredientActionTypes.CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ingredients: [action.ingredient, ...state.ingredients],
      }
    case IngredientActionTypes.CREATE_INGREDIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case IngredientActionTypes.DELETE_INGREDIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case IngredientActionTypes.DELETE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ingredients: state.ingredients.filter(x => x.id !== action.id),
      }
    case IngredientActionTypes.DELETE_INGREDIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case IngredientActionTypes.UPDATE_INGREDIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case IngredientActionTypes.UPDATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // TODO: extract this logic somewhere
        ingredients: state.ingredients.map(ingredient => {
          if (ingredient.id === action.id)
            ingredient.name = action.name

          return ingredient
        }),
      }
    case IngredientActionTypes.UPDATE_INGREDIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case IngredientActionTypes.FETCH_INGREDIENT_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        error: null,
      }
    case IngredientActionTypes.FETCH_INGREDIENT_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        error: null,
        ingredientDetail: action.ingredientDetail,
      }
    case IngredientActionTypes.FETCH_INGREDIENT_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        error: action.error,
      }
    default:
      return state
  }
}

export { reducer as ingredientReducer }
