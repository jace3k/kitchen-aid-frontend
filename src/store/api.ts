

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
    const task = (resolve: (value?: unknown) => void) => {
      setTimeout(() => resolve({ token: "fake_token" }), 1000)
    }
    return new Promise(task)
  }
}