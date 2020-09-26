import {
  SIMPLE_ACTION_STARTED,
  SIMPLE_ACTION_SUCCEED,
  SIMPLE_ACTION_FAILED
} from '/store/constants'

const initialState = {
  isLoading: false,
  error: null,
  simpleValue: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIMPLE_ACTION_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case SIMPLE_ACTION_SUCCEED:
      return {
        ...state,
        isLoading: false,
        simpleValue: action.simpleValue,
      }
    case SIMPLE_ACTION_FAILED:
      return {
        ...state,
        isLoading: false,
        simpleValue: 0,
        error: action.error,
      }
    default:
      return state
  }
}
