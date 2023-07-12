import { Router } from 'express'
import { auth } from '../../services'

const authRoutes = Router()

authRoutes.post('/login', auth.login)
authRoutes.post('/register', auth.register)

export default authRoutes
