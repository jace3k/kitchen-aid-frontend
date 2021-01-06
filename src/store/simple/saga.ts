import { call, put, takeLatest } from 'redux-saga/effects'
import { SimpleApi } from 'store/api'
import { simpleValuefetchFailed, simpleValuefetchSuccess } from './actions'
import { SimpleActionTypes } from './types'

function* fetchSimpleValue() {
  try {
    const response = yield call(SimpleApi.get)
    const responseValue = response.simpleValue

    yield put(simpleValuefetchSuccess(responseValue))
  }
  catch (err) {
    yield put(simpleValuefetchFailed(err))
  }
}

export default function* watchSimpleValue() {
  yield takeLatest(SimpleActionTypes.FETCH_REQUEST, fetchSimpleValue)
}
