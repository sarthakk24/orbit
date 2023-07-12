import axios, { type AxiosResponse } from 'axios'
import config from '../config'
import Logger from '../loaders/logger'

export const compileInstance = axios.create({
    baseURL: config.sphere.urls.compile,
})

export const problemInstance = axios.create({
    baseURL: config.sphere.urls.problem,
})

export const testSphere = async () => {
    try {
        const compilerTest: AxiosResponse = await compileInstance.get('/test', {
            params: {
                access_token: config.sphere.tokens.compile,
            },
        })
        const problemTest: AxiosResponse = await problemInstance.get('/test', {
            params: {
                access_token: config.sphere.tokens.problem,
            },
        })

        const compilerMessage = compilerTest.data.message
        const problemMessage = problemTest.data.message

        return {
            compiler: {
                status: compilerTest.status,
                message: compilerMessage,
            },
            problem: {
                status: problemTest.status,
                message: problemMessage,
            },
        }
    } catch (error) {
        Logger.error('🔥 error: %o', error)
        return {
            compiler: {
                status: error.response.status,
                message: error.response.data.message,
            },
            problem: {
                status: error.response.status,
                message: error.response.data.message,
            },
        }
    }
}
