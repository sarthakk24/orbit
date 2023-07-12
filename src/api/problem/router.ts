import { Router } from 'express'
import { handleCreate } from './controllers/create.service'
import { isAdmin, validateJWT } from '../../middleware/jwt.service'

const problemRoutes = Router()

problemRoutes.post('/create', validateJWT, isAdmin, handleCreate)

export default problemRoutes
