import * as bcrypt from 'bcrypt'
import Logger from '../loaders/logger'
import { promisify } from 'util'

export const hashed_password = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    } catch (error) {
        Logger.error(error)
        throw error
    }
}

export const sleep = promisify(setTimeout)
