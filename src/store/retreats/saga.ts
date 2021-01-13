import { call, put, takeLatest } from 'redux-saga/effects'
import { RetreatsApi } from 'store/api'
import { simpleValuefetchFailed, simpleValuefetchSuccess } from './actions'
import { RetreatActionTypes, RetreatResponse } from './types'

function* fetchAllRetreats() {
  try {
    const response: RetreatResponse = yield call(RetreatsApi.getAll)
    const allRetreats = response.retreats

    yield put(simpleValuefetchSuccess(allRetreats))
  }
  catch (err) {
    yield put(simpleValuefetchFailed(err))
  }
}

export default function* watchSimpleValue() {
  yield takeLatest(RetreatActionTypes.FETCH_ALL_REQUEST, fetchAllRetreats)
}
