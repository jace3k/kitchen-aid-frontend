

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
        if (username === 'test' && password === 'test') {
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