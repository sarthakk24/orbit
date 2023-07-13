import { sign, JwtPayload } from 'jsonwebtoken'
import config from '../config'

export const generateJWT = (payload: any): string => {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 1)
    return sign(
        <JwtPayload>{
            ...payload,
            exp: expirationDate.getTime() / 1000,
        },
        config.jwtSecret
    )
}
