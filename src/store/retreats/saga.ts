import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { RetreatsApi } from 'store/api'
import { fetchAllRetreatsFailed, fetchAllRetreatsSuccess } from './actions'
import { RetreatActionTypes } from './types'

function* fetchAllRetreats() {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.getAll)

    yield put(fetchAllRetreatsSuccess(response.data))
  }
  catch (err: any) {
    yield put(fetchAllRetreatsFailed(err))
  }
}


export default function* watch() {
  yield takeLatest(RetreatActionTypes.FETCH_ALL_REQUEST, fetchAllRetreats)
}
