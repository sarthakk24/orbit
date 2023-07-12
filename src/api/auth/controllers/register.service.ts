import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'

export const handleRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(201).json({
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
