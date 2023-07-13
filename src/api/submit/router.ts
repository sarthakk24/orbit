import { Router } from 'express'
import { handleSubmit } from './contollers/submit.service'
import { validateJWT } from '../../middleware/jwt.service'
import yupValidator from '../../middleware/yupvalidator'
import { yupSubmitSchema } from '../../models/submissionSchema'

const submissionRoutes = Router()

submissionRoutes.post(
    '/',
    validateJWT,
    yupValidator('body', yupSubmitSchema),
    handleSubmit
)

export default submissionRoutes
