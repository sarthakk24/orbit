import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import { DBInstance } from '../../../loaders/database'

export const handleFetch = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const DB = await DBInstance.getInstance()
        const problemCollection = await DB.getCollection('problems')

        const result = await problemCollection.find({}).toArray()

        res.status(201).json({
            success: true,
            message: 'Problem Fetched successful',
            data: result,
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
