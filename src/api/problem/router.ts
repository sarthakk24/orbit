import { Router } from 'express'

import { isAdmin, validateJWT } from '../../middleware/jwt.service'
import { handleCreate } from './controllers/create.service'
import { handleDelete } from './controllers/delete.service'
import { handleUpdate } from './controllers/update.service'
import { handleFetch } from './controllers/get.service'

const problemRoutes = Router()

problemRoutes.get('/', validateJWT, handleFetch)
problemRoutes.post('/', validateJWT, isAdmin, handleCreate)
problemRoutes.delete('/:id', validateJWT, isAdmin, handleDelete)
problemRoutes.put('/:id', validateJWT, isAdmin, handleUpdate)

export default problemRoutes
