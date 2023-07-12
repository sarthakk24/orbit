import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import { hashed_password } from '../../../services/universal.service'
import { DBInstance } from '../../../loaders/database'
import { generateJWT } from '../../../services/jwt.service'
import { ObjectId } from 'mongodb'

export const handleRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password, role } = req.body
        const hash = await hashed_password(password)

        const user = {
            name,
            email,
            password: hash,
            role,
            created_at: new Date(),
            updated_at: new Date(),
        }

        const DB = await DBInstance.getInstance()
        let insertedId: ObjectId
        role === 'admin'
            ? ({ insertedId } = await (
                  await DB.getCollection('admin')
              ).insertOne(user))
            : ({ insertedId } = await (
                  await DB.getCollection('user')
              ).insertOne(user))

        const payload = {
            name,
            email,
            role,
            _id: insertedId,
        }
        const token = generateJWT(payload)

        res.status(201).json({
            success: true,
            message: 'Registration successful',
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
