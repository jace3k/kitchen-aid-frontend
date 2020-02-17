import { IngredientsAPI } from '../../api'
import {
  FETCH_INGREDIENTS_FOR_DISH_STARTED,
  FETCH_INGREDIENTS_FOR_DISH_FAILED,
  FETCH_INGREDIENTS_FOR_DISH_SUCCEED,
  CREATE_INGREDIENT_SUCCEED,
  CREATE_INGREDIENT_FAILED,
  CREATE_INGREDIENT_STARTED,
  UPDATE_INGREDIENT_STARTED,
  UPDATE_INGREDIENT_SUCCEED,
  UPDATE_INGREDIENT_FAILED,
  DELETE_INGREDIENT_STARTED,
  DELETE_INGREDIENT_SUCCEED,
  DELETE_INGREDIENT_FAILED
} from '../../constants'

export const fetchIngredientsForDish = id => dispatch => {
  dispatch({ type: FETCH_INGREDIENTS_FOR_DISH_STARTED })

  IngredientsAPI.forDish(id)
    .then(res => {
      console.log(`IngredientsAPI.forDish(${id}) [SUCCESS]`, res)
      dispatch({ type: FETCH_INGREDIENTS_FOR_DISH_SUCCEED, ingredients: res })
    })
    .catch(err => {
      console.log(`IngredientsAPI.forDish(${id}) [FAILED]`, err)
      dispatch({ type: FETCH_INGREDIENTS_FOR_DISH_FAILED, error: err })
    })
}

export const createIngredient = ingredient => dispatch => {
  console.log('INGREDIENT IN create', ingredient)
  dispatch({ type: CREATE_INGREDIENT_STARTED })

  IngredientsAPI.new(ingredient)
    .then(res => {
      console.log(`IngredientsAPI.new(${ingredient}) [SUCCESS]`, res)
      dispatch({ type: CREATE_INGREDIENT_SUCCEED, createdIngredient: res })
    })
    .catch(err => {
      console.log(`IngredientsAPI.new(${ingredient}) [FAILED]`, err)
      dispatch({ type: CREATE_INGREDIENT_FAILED, error: err })
    })
}

export const updateIngredient = (id, ingredient) => dispatch => {
  dispatch({ type: UPDATE_INGREDIENT_STARTED })

  IngredientsAPI.update(id, ingredient)
    .then(res => {
      console.log(`IngredientsAPI.update(${id}, ${ingredient}) [SUCCESS]`, res)
      dispatch({ type: UPDATE_INGREDIENT_SUCCEED, createdIngredient: res })
    })
    .catch(err => {
      console.log(`IngredientsAPI.update(${id}, ${ingredient}) [FAILED]`, err)
      dispatch({ type: UPDATE_INGREDIENT_FAILED, error: err })
    })
}

export const deleteIngredient = id => dispatch => {
  dispatch({ type: DELETE_INGREDIENT_STARTED })

  IngredientsAPI.delete(id)
    .then(res => {
      console.log(`IngredientsAPI.delete(${id}) [SUCCESS]`, res)
      dispatch({ type: DELETE_INGREDIENT_SUCCEED, createdIngredient: res, ingId: id })
    })
    .catch(err => {
      console.log(`IngredientsAPI.delete(${id}) [FAILED]`, err)
      dispatch({ type: DELETE_INGREDIENT_FAILED, error: err })
    })
}