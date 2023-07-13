import { Router } from 'express'

import { isAdmin, validateJWT } from '../../middleware/jwt.service'
import { handleCreate } from './controllers/create.service'
import { handleDelete } from './controllers/delete.service'
import { handleUpdate } from './controllers/update.service'
import { handleFetch } from './controllers/get.service'
import yupValidator from '../../middleware/yupvalidator'
import {
    yupCreateProblemSchema,
    yupDeleteProblemSchema,
    yupUpdateProblemBodySchema,
    yupUpdateProblemParamSchema,
} from '../../models/problemsSchema'

const problemRoutes = Router()

problemRoutes.get('/', validateJWT, handleFetch)

problemRoutes.post(
    '/',
    validateJWT,
    isAdmin,
    yupValidator('body', yupCreateProblemSchema),
    handleCreate
)

problemRoutes.delete(
    '/:id',
    validateJWT,
    isAdmin,
    yupValidator('params', yupDeleteProblemSchema),
    handleDelete
)

problemRoutes.put(
    '/:id',
    validateJWT,
    isAdmin,
    yupValidator('params', yupUpdateProblemParamSchema),
    yupValidator('body', yupUpdateProblemBodySchema),
    handleUpdate
)

export default problemRoutes
