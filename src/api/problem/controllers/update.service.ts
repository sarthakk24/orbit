import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import { problemInstance } from '../../../services/axios.service'
import config from '../../../config'
import { DBInstance } from '../../../loaders/database'

export const handleUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const data = req.body
        const problemId = parseInt(id as string)

        const DB = await DBInstance.getInstance()
        const problemCollection = await DB.getCollection('problems')

        const problemExist = await problemCollection.findOne({
            id: problemId,
        })

        if (!problemExist) {
            throw {
                status: 404,
                message: 'Problem not found',
            }
        }

        await problemInstance.put(
            `/problems/${id}?access_token=${config.sphere.tokens.problem}`,
            { ...data }
        )

        await problemCollection.updateOne(
            {
                id: problemId,
            },
            { $set: { ...data } }
        )

        res.status(201).json({
            success: true,
            message: 'Problem Deleted successful',
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
