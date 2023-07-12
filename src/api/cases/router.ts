import { Router } from 'express'

import { isAdmin, validateJWT } from '../../middleware/jwt.service'
import { handleCreate } from './controllers/create.service'

const casesRoutes = Router()

casesRoutes.post('/:id', validateJWT, isAdmin, handleCreate)

export default casesRoutes
