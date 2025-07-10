import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../model/user";
import { Types } from "mongoose";

export interface AuthRequest extends Request{
    user?:{
        name: string,
        email : string,
        _id: string | Types.ObjectId
    }
}

interface User{
    name: string,
    email : string,
     _id: string | Types.ObjectId
}

const protect = asyncHandler(async(req: AuthRequest, res: Response, next:NextFunction)=>{
    let token;
    
    token = req.cookies.token

    if(!token){
        res.status(401)
        throw new Error("Unauthorized")
    }
   try {
     const decoded = jwt.verify(token, process.env.JWT_TOKEN!) as JwtPayload
     if(!decoded){
        res.status(401)
        throw new Error("Unauthorized, Invalid token")
     }
     req.user = await User.findById(decoded.userId).select("-password") as User
     next()
   } catch (error) {
        res.status(401)
        throw new Error("Unauthorized, Invalid token")
   }
})

export {protect}