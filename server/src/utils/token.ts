import { Response } from "express"
import jwt from "jsonwebtoken"
import { Types } from "mongoose"

const generateToken = (res: Response, userId: Types.ObjectId)=>{
    const token = jwt.sign({userId}, process.env.JWT_TOKEN!,{
        expiresIn: "7d" 
    })
    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        partitioned: true
    })
}
export default generateToken