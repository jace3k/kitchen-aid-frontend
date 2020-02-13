import {
  FETCH_DISHES_FOR_MEAL_STARTED,
  FETCH_DISHES_FOR_MEAL_SUCCEED,
  FETCH_DISHES_FOR_MEAL_FAILED,

  CREATE_DISH_STARTED,
  CREATE_DISH_SUCCEED,
  CREATE_DISH_FAILED,
  DELETE_DISH_STARTED,
  DELETE_DISH_SUCCEED,
  DELETE_DISH_FAILED,
} from "../../constants"

import { DishesAPI } from "../../api"


export const fetchDishesForMeal = id => dispatch => {
  dispatch({ type: FETCH_DISHES_FOR_MEAL_STARTED })

  DishesAPI.forMeal(id)
    .then(res => {
      console.log(`DishesAPI.forMeal(${id}) [SUCCESS]`, res)
      dispatch({ type: FETCH_DISHES_FOR_MEAL_SUCCEED, dishes: res, mealId: id })
    })
    .catch(err => {
      console.log(`DishesAPI.forMeal(${id}) [FAILED]`, err)
      dispatch({ type: FETCH_DISHES_FOR_MEAL_FAILED, error: err.message })
    })
}

export const createDish = dish => dispatch => {
  dispatch({ type: CREATE_DISH_STARTED })

  DishesAPI.new(dish)
    .then(res => {
      console.log(`DishesAPI.new(${dish}) [SUCCESS]`, res)
      dispatch({ type: CREATE_DISH_SUCCEED, createdDish: res })
    })
    .catch(err => {
      console.log(`DishesAPI.new(${dish}) [FAILED]`, err)
      dispatch({ type: CREATE_DISH_FAILED, error: err.message })
    })
}

export const deleteDish = id => dispatch => {
  dispatch({ type: DELETE_DISH_STARTED })

  DishesAPI.delete(id)
    .then(res => {
      console.log(`DishesAPI.delete(${id}) [SUCCESS]`, res)
      dispatch({ type: DELETE_DISH_SUCCEED, createdDish: res })
    })
    .catch(err => {
      console.log(`DishesAPI.delete(${id}) [FAILED]`, err)
      dispatch({ type: DELETE_DISH_FAILED, error: err.message })
    })
}
