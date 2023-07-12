import { Router } from 'express'
import { handleLogin } from './controllers/login.service'
import { handleRegister } from './controllers/register.service'

const authRoutes = Router()

authRoutes.post('/login', handleLogin)
authRoutes.post('/register', handleRegister)

export default authRoutes
