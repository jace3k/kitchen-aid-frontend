import { retreats, mealRows, ingredients, dishes, ingredientRows } from "utils/fakeData"
import { DishesResponse, IngredientRowsResponse } from "./dishes/types"
import { IngredientsResponse } from "./ingredients/types"
import { MealRowResponse, RetreatResponse } from "./retreats/types"

// payload
// {
//   "role": "worker",
//   "username": "johndoe",
//   "displayName": "John Doe",
//   "exp": 1612224000, (Tue Feb 02 2021 01:00:00 GMT+0100)
// }
// secret: 123456
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid29ya2VyIiwidXNlcm5hbWUiOiJqb2huRG9lIiwiZGlzcGxheU5hbWUiOiJKb2huIERvZSIsImV4cCI6MTYxMjIyNDAwMH0._eSK0XopCxPDBQstLW9AdGa7VyWJujQlGz1ZsiQODSE"

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

export const DishesApi = {
  getAll: (): Promise<DishesResponse> => {
    return new Promise<DishesResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({ dishes, status: 'OK' })
      }, 1000)
    })
  },
  getIngredientsForDish: (dishId: number): Promise<IngredientRowsResponse> => {
    return new Promise<IngredientRowsResponse>((res, rej) => {
      setTimeout(() => {
        res({ ingredientRows: ingredientRows.filter(x => x.dishId === dishId), status: 'OK' })
      }, 1000)
    })
  }
}
