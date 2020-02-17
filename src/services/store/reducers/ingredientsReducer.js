import {
  FETCH_INGREDIENTS_FOR_DISH_SUCCEED,
  FETCH_INGREDIENTS_FOR_DISH_FAILED,
  FETCH_INGREDIENTS_FOR_DISH_STARTED,
  CREATE_INGREDIENT_STARTED,
  CREATE_INGREDIENT_SUCCEED,
  CREATE_INGREDIENT_FAILED,
  UPDATE_INGREDIENT_STARTED,
  UPDATE_INGREDIENT_SUCCEED,
  DELETE_INGREDIENT_STARTED,
  DELETE_INGREDIENT_SUCCEED,
  UPDATE_INGREDIENT_FAILED,
  DELETE_INGREDIENT_FAILED
} from "../../constants"

const initialState = {
  ingredients: [],
  isLoading: false,
  isCreatedLoading: false,
  error: null,
  createdIngredient: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_FOR_DISH_STARTED:
      return {
        ...initialState,
        isLoading: true,
      }
    case FETCH_INGREDIENTS_FOR_DISH_SUCCEED:
      return {
        ...state,
        isLoading: false,
        ingredients: action.ingredients.data.sort((a, b) => a.id - b.id),
        error: null,
      }

    case FETCH_INGREDIENTS_FOR_DISH_FAILED:
      return {
        ...state,
        isLoading: false,
        ingredients: [],
        error: action.error
      }
    case CREATE_INGREDIENT_STARTED:
      return {
        ...state,
        isLoading: true,
        createdIngredient: null,
        error: null,
      }
    case CREATE_INGREDIENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        error: null,
        ingredients: state.ingredients
        .concat(action.createdIngredient.data)
        .sort((a, b) => a.id - b.id),
        createdIngredient: action.createdIngredient.data,
      }
    case CREATE_INGREDIENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        createdIngredient: null,
      }
    case UPDATE_INGREDIENT_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
        createdIngredient: null,
      }
    case UPDATE_INGREDIENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        createdIngredient: action.createdIngredient.data,
        error: null,
        ingredients: state.ingredients
          .filter(ing => ing.id !== action.createdIngredient.data.id)
          .concat(action.createdIngredient.data)
          .sort((a, b) => a.id - b.id)
      }
    case UPDATE_INGREDIENT_FAILED:
      return {
        ...state,
        isLoading: false,
        createdIngredient: null,
        error: action.error,
      }
    case DELETE_INGREDIENT_STARTED:
      return {
        ...state,
        isLoading: true,
        createdIngredient: null,
        error: null,
      }
    case DELETE_INGREDIENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        createdIngredient: action.createdIngredient.data,
        error: null,
        ingredients: state.ingredients
          .filter(ing => ing.id !== action.ingId)
      }
    case DELETE_INGREDIENT_FAILED:
      return {
        ...state,
        isLoading: false,
        createdIngredient: null,
        error: action.error
      }
    default:
      return state
  }
}
