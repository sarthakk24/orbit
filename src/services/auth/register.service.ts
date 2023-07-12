import { Request, Response, NextFunction } from 'express'
import Logger from '../../loaders/logger'

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Registration successful',
        })
        next()
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
