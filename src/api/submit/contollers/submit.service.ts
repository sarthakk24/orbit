import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import axios, { AxiosResponse } from 'axios'
import { problemInstance } from '../../../services/axios.service'
import config from '../../../config'
import { DBInstance } from '../../../loaders/database'
import { sleep } from '../../../services/universal.service'

export const handleSubmit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body

        const DB = await DBInstance.getInstance()
        const problemCollection = await DB.getCollection('problems')

        const problemExist = await problemCollection.findOne({
            id: data.problemId,
        })

        if (!problemExist) {
            throw {
                status: 404,
                message: 'Problem not found',
            }
        }

        const testCases = problemExist.testCases.map((testCase) => {
            return testCase.number
        })
        const tests = testCases.join(',')

        const submit: AxiosResponse = await problemInstance.post(
            `/submissions?access_token=${config.sphere.tokens.problem}`,
            {
                ...data,
                tests,
            }
        )

        await sleep(2000)
        let submitRes = (
            await problemInstance.get(
                `/submissions/${submit.data.id}?access_token=${config.sphere.tokens.problem}`
            )
        ).data

        while (submitRes.executing === true) {
            await sleep(2000)
            submitRes = (
                await problemInstance.get(
                    `/submissions/${submit.data.id}?access_token=${config.sphere.tokens.problem}`
                )
            ).data
        }
        Logger.silly(JSON.stringify(submitRes))
        const output = {
            problem: submitRes.problem.name,
            status: {
                executing: submitRes.executing,
                date: submitRes.date,
            },
            compiler: {
                name: submitRes.compiler.name,
                version: submitRes.compiler.version.name,
            },
            result: {
                score: submitRes.result.score,
                status: submitRes.result.status.name,
                time: submitRes.result.time,
                memory: submitRes.result.memory,
            },
            tests: submitRes.result.testcases
                ? submitRes.result.testcases.map((test: any) => {
                      return {
                          number: test.number,
                          status: test.status.name,
                          score: test.score,
                          time: test.time,
                          memory: test.memory,
                          output: test.output,
                      }
                  })
                : [],
        }

        res.status(201).json({
            success: true,
            message: 'Submitted successful',
            ...output,
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
