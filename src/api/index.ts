import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import authRoutes from './auth/router'
import problemRoutes from './problem/router'
import casesRoutes from './cases/router'
import submissionRoutes from './submit/router'

export default (): Router => {
    const app = Router()
    app.use('/health', healthCheckRoute)
    app.use('/auth', authRoutes)
    app.use('/problem', problemRoutes)
    app.use('/cases', casesRoutes)
    app.use('/submit', submissionRoutes)
    return app
}
