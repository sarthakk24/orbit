import { Router } from 'express'
import { handleLogin } from './controllers/login.service'
import { handleRegister } from './controllers/register.service'
import yupValidator from '../../middleware/yupvalidator'
import { yupLoginSchema, yupRegisterSchema } from '../../models/authSchema'

const authRoutes = Router()

authRoutes.post('/login', yupValidator('body', yupLoginSchema), handleLogin)
authRoutes.post(
    '/register',
    yupValidator('body', yupRegisterSchema),
    handleRegister
)

export default authRoutes
