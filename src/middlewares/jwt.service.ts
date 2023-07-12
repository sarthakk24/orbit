import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import config from '../config/index'
import { yupJwtHeader, JwtHeader } from '../models/middlewareSchema'
import Logger from '../loaders/logger'

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
        req.user = decoded
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
