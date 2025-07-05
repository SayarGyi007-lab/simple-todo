import { Request, Response } from "express";
import { User } from "../model/user";
import generateToken from "../utils/token";
import { asyncHandler } from "../utils/asyncHandler";

export const registerUser = asyncHandler(async(req: Request, res: Response)=>{
    const {name, email, password} = req.body
    
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400)
            throw new Error("Email is already existed")
        }
        const user = await User.create({
            name,
            email,
            password
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        }

    } catch (error) {
        res.status(500)
        throw new Error("Something wrong at registeration")
    }

})

export const loginUser = asyncHandler(async(req: Request, res: Response)=>{
    const {email, password} = req.body

    const existedUser = await User.findOne({email})
    
    if(existedUser && (await existedUser.matchPassword(password))){
        generateToken(res, existedUser._id)
        res.status(200).json({
            _id: existedUser._id,
            name: existedUser.name,
            email: existedUser.email
        })
    }else{
        res.status(401)
        throw new Error("Invalid Credentials")
    }
})

export const logoutUser = asyncHandler(async(req:Request,res:Response)=>{
    res.cookie("token","",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "User logout successfully"})
})