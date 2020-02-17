import { combineReducers } from 'redux'
import retreats from './retreatsReducer'
import dishes from './dishesReducer'
import meals from './mealsReducer'
import ingredients from './ingredientsReducer'

export default combineReducers({
  retreats,
  dishes,
  meals,
  ingredients,
})
