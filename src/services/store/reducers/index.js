import { combineReducers } from 'redux'
import retreats from './retreatsReducer'
import dishes from './dishesReducer'

export default combineReducers({
  retreats,
  dishes,
})
