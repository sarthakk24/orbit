import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import config from '../config/index'
import { yupJwtHeader, JwtHeader } from '../models/middlewareSchema'
import Logger from '../loaders/logger'

// used for validating JWT token
export const validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers as JwtHeader
        if (!authorization) {
            return next({
                statusCode: 401,
                message: 'No JWT authorization Token available',
            })
        }
        await yupJwtHeader.validate(req.headers, { abortEarly: false })
        const authToken = authorization.split(' ')[1]
        const decoded = verify(authToken, config.jwtSecret)
        const { role }: any = decoded

        if (role !== 'admin' && role !== 'participant') {
            return next({
                statusCode: 403,
                message: 'Unauthorized',
            })
        }

        const stringed = JSON.stringify(decoded)
        req.user = JSON.parse(stringed)
        next()
    } catch (err: Error | any) {
        Logger.error(err)
        if (err.name === 'ValidationError') {
            let message: string = ''
            err.errors.forEach((error: string) => {
                message += `${error}.\n `
            })
            return next({
                statusCode: 404,
                message: message,
            })
        }
        next({
            statusCode: 403,
            message: `${err.name}: ${err.message}`,
        })
    }
}

// For differentiating between admin and participant
export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { role } = req.user
        if (role !== 'admin') {
            return next({
                statusCode: 403,
                message: 'Unauthorized',
            })
        }
        next()
    } catch (err: Error | any) {
        Logger.error(err)
        next({
            statusCode: 403,
            message: `${err.name}: ${err.message}`,
        })
    }
}
