import { retreats, mealRows, ingredients } from "utils/fakeData"
import { IngredientsResponse } from "./ingredients/types"
import { MealRowResponse, RetreatResponse } from "./retreats/types"
import { SimpleResponse } from "./simple/types"

// payload
// {
//   "role": "worker",
//   "username": "johndoe",
//   "displayName": "John Doe",
//   "exp": 1612224000, (Fri Oct 11 2052 03:46:40 GMT+0200)
// }
// secret: 123456
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid29ya2VyIiwidXNlcm5hbWUiOiJqb2huRG9lIiwiZGlzcGxheU5hbWUiOiJKb2huIERvZSIsImV4cCI6MjYxMjIyNDAwMH0.oHggPJ0eLPH_PC8dHExkxcOPBIp0n9V1f6kl0_QcMQI"

export const SimpleApi = {
  get: (): Promise<SimpleResponse> => {
    return new Promise<SimpleResponse>((resolve) => {
      setTimeout(() => resolve({ simpleValue: 9 }), 2000)
    })
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
      }, 1000)
    })
  },
  getMeals: (retreatId: number): Promise<MealRowResponse> => {
    return new Promise<MealRowResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          mealRows: mealRows.filter(x => x.retreatId === retreatId),
          retreat: retreats.find(x => x.id === retreatId) || null,
          status: 'OK'
        })
      }, 1000)
    })
  }
}

export const IngredientsApi = {
  getAll: (): Promise<IngredientsResponse> => {
    return new Promise<IngredientsResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({ ingredients, status: 'OK' })
      }, 1000)
    })
  },
}
