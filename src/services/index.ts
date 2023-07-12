import { handleLogin } from './auth/login.service'
import { handleRegister } from './auth/register.service'

export const auth = {
    login: handleLogin,
    register: handleRegister,
}
