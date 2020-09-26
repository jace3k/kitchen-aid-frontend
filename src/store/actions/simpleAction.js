import {
  SIMPLE_ACTION_STARTED,
  SIMPLE_ACTION_SUCCEED,
  SIMPLE_ACTION_FAILED
} from '/store/constants'

export const simpleAction = () => dispatch => {
  dispatch({ type: SIMPLE_ACTION_STARTED })

  // API Call here. SUCCEED and FAILED should be handled here.
  // Certain API service should be wrapped in another module and imported here.
  setTimeout(() => {
    dispatch({ type: SIMPLE_ACTION_SUCCEED, simpleValue: 30 })
  }, 1000)

}