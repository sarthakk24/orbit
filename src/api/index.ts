import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import authRoutes from './auth/router'
import problemRoutes from './problem/router'

export default (): Router => {
    const app = Router()
    app.use('/health', healthCheckRoute)
    app.use('/auth', authRoutes)
    app.use('/problem', problemRoutes)
    return app
}
