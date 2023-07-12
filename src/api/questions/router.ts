import { Router } from 'express'
import { handleCreate } from './controllers/create.service'
import { validateJWT } from '../../middlewares/jwt.service'

const questionRoutes = Router()

questionRoutes.post('/create', validateJWT, handleCreate)

export default questionRoutes
