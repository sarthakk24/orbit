import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'

export const handleCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(201).json({
            success: true,
            message: 'Question added successful',
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
