import { call, put, takeLatest } from 'redux-saga/effects'
import { UserApi } from 'store/api'
import { loginFailed, loginSuccess } from './actions'
import { User, UserActionTypes, LoginRequestType } from './types'

function* loginRequest({ username, password }: LoginRequestType) {
  try {
    const response = yield call(UserApi.login, username, password)
    const token = response.token
    //decode token, then build the user

    const user: User = {
      username: 'fakeUser',
      displayName: 'Fake User (Kitchen)',
      role: 'worker',
    }

    yield put(loginSuccess(user))
  }
  catch (err) {
    yield put(loginFailed(err))
  }
}

export default function* watchLogin() {
  yield takeLatest(UserActionTypes.LOGIN_REQUEST, loginRequest)
}
