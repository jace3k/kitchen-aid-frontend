import { retreats } from "utils/fakeData"
import { RetreatResponse } from "./retreats/types"

// simple mock. Axios can be used here.
export const SimpleApi = {
  get: () => {
    const task = (resolve: (value?: unknown) => void) => {
      setTimeout(() => resolve({ simpleValue: 9 }), 2000)
    }
    return new Promise(task)
  }
}

export const UserApi = {
  login: (username: string, password: string) => {
    const task = (resolve: (value?: unknown) => void, reject: (value?: unknown) => void) => {
      setTimeout(() => {
        if (username === 'test' && password === 'xosadniedj1i23@!asd') {
          resolve({ token: "fake_token" })
        }
        else {
          reject('Incorrect username or password')
        }
      }, 1000)
    }
    return new Promise(task)
  }
}

export const RetreatsApi = {
  getAll: (): Promise<RetreatResponse> => {
    return new Promise<RetreatResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({ retreats, status: 'OK' })
      }, 2000)
    })
  }
}