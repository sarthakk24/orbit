import { Router } from 'express'
import { handleCreate } from './controllers/create.service'
import { isAdmin, validateJWT } from '../../middleware/jwt.service'

const questionRoutes = Router()

questionRoutes.post('/create', validateJWT, isAdmin, handleCreate)

export default questionRoutes
