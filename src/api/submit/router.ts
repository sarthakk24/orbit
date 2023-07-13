import { Router } from 'express'
import { handleSubmit } from './contollers/submit.service'
import { validateJWT } from '../../middleware/jwt.service'

const submissionRoutes = Router()

submissionRoutes.post('/', validateJWT, handleSubmit)

export default submissionRoutes
