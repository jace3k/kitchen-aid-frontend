import { 
  FETCH_DISHES_FOR_MEAL_STARTED, 
  FETCH_DISHES_FOR_MEAL_SUCCEED, 
  FETCH_DISHES_FOR_MEAL_FAILED
} from "../../constants"

import { DishesAPI } from "../../api"


export const fetchDishesForMeal = (id) => dispatch => {
  dispatch({ type: FETCH_DISHES_FOR_MEAL_STARTED })

  DishesAPI.forMeal(id)
    .then(res => {
      console.log(`DishesAPI.forMeal(${id}) [SUCCESS]`, res)
      dispatch({ type: FETCH_DISHES_FOR_MEAL_SUCCEED, dishes: res })
    })
    .catch(err => {
      console.log(`DishesAPI.forMeal(${id}) [FAILED]`, err)
      dispatch({ type: FETCH_DISHES_FOR_MEAL_FAILED, error: err.message })
    })
}
