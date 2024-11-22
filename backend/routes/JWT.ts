import {sign, verify} from "jsonwebtoken"
import {UserType} from "../models/userSchema"
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const secretKey = process.env.JWTSECRETKEY

if (!secretKey) {
    throw new Error("secretKey does not exist")
}
// create token
const createToken = (user: UserType) => {   
    const accessToken = sign({email: user.email, username: user.username}, secretKey )
    return accessToken
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-token"]
    if (!accessToken) {
        return res.status(400).json({error: "User not authenticated"})
    }
    
    try {
        const validToken = verify(accessToken, secretKey)
        if (validToken) {
            req.authenticated = true;
            return next()
        }
    } catch (err) {

    }
}
export default createToken;