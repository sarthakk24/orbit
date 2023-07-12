import { Router } from 'express'
import { handleCreate } from './controllers/create.service'
import { isAdmin, validateJWT } from '../../middleware/jwt.service'
import { handleDelete } from './controllers/delete.service'

const problemRoutes = Router()

problemRoutes.post('/create', validateJWT, isAdmin, handleCreate)
problemRoutes.delete('/:id', validateJWT, isAdmin, handleDelete)

export default problemRoutes
