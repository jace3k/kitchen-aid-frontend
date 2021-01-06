import { Reducer } from 'redux'
import { SimpleState, SimpleActionTypes, SimpleFetchType } from './types'

const initialState: SimpleState = {
  loading: false,
  simpleValue: 0,
  error: null,
}

const reducer: Reducer<SimpleState, SimpleFetchType> = (state = initialState, action) => {
  switch (action.type) {
    case SimpleActionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SimpleActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // TODO: typing action.simpleValue //
        simpleValue: action.simpleValue,
      }
    case SimpleActionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        // reset on failure
        // simpleValue: 0,
      }
    default:
      return state
  }
}

export { reducer as simpleReducer }
