import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import axios, { AxiosResponse } from 'axios'
import { problemInstance } from '../../../services/axios.service'
import config from '../../../config'
import { DBInstance } from '../../../loaders/database'

export const handleCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let { name, description, type, masterjudgeId } = req.body

        if (!masterjudgeId) {
            masterjudgeId = 1000
        }

        const { data }: AxiosResponse = await problemInstance.post(
            `/problems?access_token=${config.sphere.tokens.problem}`,
            {
                name,
                description,
                typeId: type,
                masterjudgeId,
            }
        )

        const DB = await DBInstance.getInstance()
        const problemCollection = await DB.getCollection('problems')

        const problem = {
            ...data,
            name,
            description,
            type,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const { insertedId } = await problemCollection.insertOne(problem)

        res.status(201).json({
            success: true,
            message: 'Question added successful',
            ...data,
            _id: insertedId,
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
