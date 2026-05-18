import { UserRole } from "../models/User";
const jwt = require('jsonwebtoken');


export const generateJWTToken = async (User: { _id: string, email: string, role: UserRole }) => {
    return await jwt.sign({ id: User._id, email: User.email, role: User.role }, process.env.JWT_SECREATE_KEY, { algorithm: 'HS256', expiresIn:  process.env.JWT_EXPIRES_IN})
}

export const verifyJWT = async (token: string) => {
    return await jwt.verify(token, process.env.JWT_SECREATE_KEY)
}