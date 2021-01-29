import jwtDecode from "jwt-decode"
import { User } from "store/user/types"

export default {
  decode: (token: string): User => {
    return jwtDecode<User>(token)
  },
  checkExpirationTime: (decodedToken: User) => {
    if (decodedToken.exp < Date.now() / 1000)
      throw Error('Token expired')
  }
}
