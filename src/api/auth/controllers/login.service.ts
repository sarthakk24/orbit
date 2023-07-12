import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'

import Logger from '../../../loaders/logger'
import { DBInstance } from '../../../loaders/database'
import { generateJWT } from '../../../services/jwt.service'

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body

        const DB = await DBInstance.getInstance()
        const userCollection = await DB.getCollection('user')

        const user = await userCollection.findOne({ email })
        if (!user) {
            throw {
                status: 404,
                message: 'User not found',
            }
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw {
                status: 401,
                message: 'Invalid credentials',
            }
        }

        const payload = {
            name: user.name,
            email: user.email,
            role: user.role,
            _id: user._id,
        }

        const token = generateJWT(payload)

        res.status(201).json({
            success: true,
            message: 'Login successful',
            email,
            token,
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
