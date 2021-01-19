import { call, put, takeLatest } from 'redux-saga/effects'
import { UserApi } from 'store/api'
import storage from 'utils/storage'
import token from 'utils/token'
import { loginFailed, loginSuccess } from './actions'
import { UserActionTypes, LoginRequestType, ChangeLanguageType, ToggleDarkModeType, LoginResponseSuccess } from './types'

function* loginRequest({ username, password }: LoginRequestType) {
  try {
    const response: LoginResponseSuccess = yield call(UserApi.login, username, password)
    const decodedToken = token.decode(response.token)
    token.checkExpirationTime(decodedToken)
    storage.saveToken(response.token)

    yield put(loginSuccess(decodedToken))
  }
  catch (err) {
    // TODO: check if the error comes from the token or network
    yield put(loginFailed(err))
  }
}

function* loginLocal() {
  const fromStorage = storage.getToken()

  if (fromStorage) {
    try {
      const decodedToken = token.decode(fromStorage)
      token.checkExpirationTime(decodedToken)

      yield put(loginSuccess(decodedToken))
    }
    catch (err) { storage.removeToken() }
  }
}

function logout() {
  storage.removeToken()
}

function changeLanguage({ language }: ChangeLanguageType) {
  storage.setLanguage(language)
}

function toggleDarkMode({ isDarkMode }: ToggleDarkModeType) {
  if (isDarkMode)
    storage.setDarkMode()
  else
    storage.removeDarkMode()
}

export default function* watch() {
  yield takeLatest(UserActionTypes.LOGIN_REQUEST, loginRequest)
  yield takeLatest(UserActionTypes.LOGIN_LOCAL, loginLocal)
  yield takeLatest(UserActionTypes.LOGOUT, logout)
  yield takeLatest(UserActionTypes.CHANGE_LANGUAGE, changeLanguage)
  yield takeLatest(UserActionTypes.TOGGLE_DARK_MODE, toggleDarkMode)
}
