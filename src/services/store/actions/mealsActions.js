import {
  CREATE_MEAL_STARTED,
  CREATE_MEAL_SUCCEED,
  CREATE_MEAL_FAILED,

  DELETE_MEAL_STARTED,
  DELETE_MEAL_SUCCEED,
  DELETE_MEAL_FAILED,

  UPDATE_MEAL_STARTED,
  UPDATE_MEAL_SUCCEED,
  UPDATE_MEAL_FAILED,
} from '../../constants'

import { MealsAPI } from "../../api"

export const createMeal = meal => dispatch => {
  dispatch({ type: CREATE_MEAL_STARTED })

  MealsAPI.new(meal)
    .then(res => {
      console.log(`MealsAPI.new(${meal}) [SUCCESS]`, res)
      dispatch({ type: CREATE_MEAL_SUCCEED, createdMeal: res })
    })
    .catch(err => {
      
      console.log(`MealsAPI.new(${meal}) [FAILED]`, err)
      dispatch({ type: CREATE_MEAL_FAILED, error: err.message })
    })
}

export const deleteMeal = id => dispatch => {
  dispatch({ type: DELETE_MEAL_STARTED })

  MealsAPI.delete(id)
    .then(res => {
      console.log(`MealsAPI.delete(${id}) [SUCCESS]`, res)
      dispatch({ type: DELETE_MEAL_SUCCEED, createdMeal: res })
    })
    .catch(err => {
      console.log(`MealsAPI.delete(${id}) [FAILED]`, err)
      dispatch({ type: DELETE_MEAL_FAILED, error: err.message })
    })
}

export const updateMealServings = (id, servings) => dispatch => {
  dispatch({ type: UPDATE_MEAL_STARTED })

  MealsAPI.update(id, servings)
    .then(res => {
      console.log(`MealsAPI.update(${id}) [SUCCESS]`, res)
      dispatch({ type: UPDATE_MEAL_SUCCEED, createdMeal: res })
    })
    .catch(err => {
      console.log(`MealsAPI.update(${id}) [FAILED]`, err)
      dispatch({ type: UPDATE_MEAL_FAILED, error: err.message })
    })
}
