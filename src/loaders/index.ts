import express from './express'
import Logger from './logger'
import Express from 'express'

import { DBInstance } from './database'

export default async ({
    expressApp,
}: {
    expressApp: Express.Application
}): Promise<globalThis.Express.Application> => {
    await DBInstance.getInstance()
    Logger.info('✅ DB loaded and connected!')
    const app = await express({ app: expressApp })
    Logger.info('🚀 Express loaded')
    Logger.info('✅ All modules loaded!')
    return app
}
