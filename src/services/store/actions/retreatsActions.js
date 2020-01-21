import {
  FETCH_RETREATS_STARTED,
  FETCH_RETREATS_SUCCEED,
  FETCH_RETREATS_FAILED,

  CREATE_RETREAT_STARTED,
  CREATE_RETREAT_SUCCEED,
  CREATE_RETREAT_FAILED,

  CLEAR_CREATE_RETREAT
} from "../../constants"

import { RetreatsAPI } from '../../api'

export const fetchRetreats = () => dispatch => {
  dispatch(fetchRetreatsStarted())

  RetreatsAPI.all()
    .then(res => {
      console.log('RetreatsAPI.all() [SUCCESS]', res)
      dispatch(fetchRetreatsSucceed(res))
    })
    .catch(err => {
      console.log('RetreatsAPI.all() [ERROR]', err)
      dispatch(fetchRetreatsFailed(err))
    })
}

export const fetchRetreatsStarted = () => ({
  type: FETCH_RETREATS_STARTED
})

export const fetchRetreatsSucceed = (retreats) => ({
  type: FETCH_RETREATS_SUCCEED,
  retreats
})

export const fetchRetreatsFailed = (error) => ({
  type: FETCH_RETREATS_FAILED,
  error: error.message
})


export const createRetreat = (retreatName) => dispatch => {
  dispatch({ type: CREATE_RETREAT_STARTED })

  RetreatsAPI.new(retreatName)
    .then(res => {
      console.log('RetreatsAPI.new() [SUCCESS]', res)
      dispatch({ type: CREATE_RETREAT_SUCCEED, createdRetreat: res })
    })
    .catch(err => {
      console.log('RetreatsAPI.new() [ERROR]', err)
      dispatch({ type: CREATE_RETREAT_FAILED, error: err.message })
    })
}

export const clearCreatedRetreat = () => dispatch => {
  dispatch({type: CLEAR_CREATE_RETREAT})
}
