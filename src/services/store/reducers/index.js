import { combineReducers } from 'redux'
import retreats from './retreatsReducer'
import dishes from './dishesReducer'
import meals from './mealsReducer'

export default combineReducers({
  retreats,
  dishes,
  meals,
})
