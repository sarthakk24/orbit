import { Router } from 'express'

import { isAdmin, validateJWT } from '../../middleware/jwt.service'
import { handleCreate } from './controllers/create.service'
import yupValidator from '../../middleware/yupvalidator'
import {
    yupTestCasesBodySchema,
    yupTestCasesParamSchema,
} from '../../models/testCasesSchema'

const casesRoutes = Router()

casesRoutes.post(
    '/:id',
    validateJWT,
    isAdmin,
    yupValidator('params', yupTestCasesParamSchema),
    yupValidator('body', yupTestCasesBodySchema),
    handleCreate
)

export default casesRoutes
