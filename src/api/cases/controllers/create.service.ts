import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import { AxiosResponse } from 'axios'
import { problemInstance } from '../../../services/axios'
import config from '../../../config'
import { DBInstance } from '../../../loaders/database'

export const handleCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body
        const { id } = req.params
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

        const { data }: AxiosResponse = await problemInstance.post(
            `/problems/${id}/testcases?access_token=${config.sphere.tokens.problem}`,
            {
                ...body,
            }
        )

        const testCase = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await problemCollection.updateOne(
            {
                id: problemId,
            },
            { $push: { testCases: testCase } }
        )

        res.status(201).json({
            success: true,
            message: 'Test Case added successful',
            ...data,
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
