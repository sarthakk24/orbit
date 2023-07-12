import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import authRoutes from './auth/router'

export default (): Router => {
    const app = Router()
    app.use('/health', healthCheckRoute)
    app.use('/auth', authRoutes)
    return app
}
