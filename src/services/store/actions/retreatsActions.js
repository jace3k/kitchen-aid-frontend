import {
  FETCH_RETREATS_STARTED,
  FETCH_RETREATS_SUCCEED,
  FETCH_RETREATS_FAILED,

  CREATE_RETREAT_STARTED,
  CREATE_RETREAT_SUCCEED,
  CREATE_RETREAT_FAILED,

  CLEAR_CREATE_RETREAT,

  FETCH_RETREAT_STARTED,
  FETCH_RETREAT_SUCCEED,
  FETCH_RETREAT_FAILED,
} from "../../constants"

import { RetreatsAPI } from '../../api'

export const fetchRetreats = () => dispatch => {
  dispatch({ type: FETCH_RETREATS_STARTED })

  RetreatsAPI.all()
    .then(res => {
      console.log('RetreatsAPI.all() [SUCCESS]', res)
      dispatch({ type: FETCH_RETREATS_SUCCEED, retreats: res })
    })
    .catch(err => {
      console.log('RetreatsAPI.all() [ERROR]', err)
      dispatch({ type: FETCH_RETREATS_FAILED, error: err.message })
    })
}


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
  dispatch({ type: CLEAR_CREATE_RETREAT })
}

export const fetchRetreat = (id) => dispatch => {
  dispatch({ type: FETCH_RETREAT_STARTED })

  RetreatsAPI.single(id)
    .then(res => {
      console.log('RetreatsAPI.single() [SUCCESS]', res)
      dispatch({ type: FETCH_RETREAT_SUCCEED, retreat: res })
    })
    .catch(err => {
      console.log('RetreatsAPI.single() [ERROR]', err)
      dispatch({ type: FETCH_RETREAT_FAILED, error: err.message })
    })
}