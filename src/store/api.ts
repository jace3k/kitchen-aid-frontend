import { retreats } from "utils/fakeData"
import { RetreatResponse } from "./retreats/types"

// payload
// {
//   "role": "worker",
//   "username": "johndoe",
//   "displayName": "John Doe",
//   "exp": 1612224000000, (Tue Feb 02 2021 01:00:00 GMT+0100)
// }
// secret: 123456
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid29ya2VyIiwidXNlcm5hbWUiOiJqb2huRG9lIiwiZGlzcGxheU5hbWUiOiJKb2huIERvZSIsImV4cCI6MTYxMTA5MTcyNzcwMH0.8m505kB51YbSwHr9ZB9sRbDXA6geZOqyIOsr48G988M"

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
        if (username === 'johndoe' && password === 'Doejohnestpass8!') {
          resolve({ status: 200, token })
        }
        else {
          reject({ status: 401, message: 'Incorrect username or password' })
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
