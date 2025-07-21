import { NextFunction, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "./authMiddleware";
import { Todo } from "../model/todo";
 
const authorizeOwner = asyncHandler(
    async (req: AuthRequest, res: Response, next: NextFunction)=>{
        const {id} = req.params

        const todo = await Todo.findById(id)

        if(!todo){
            res.status(404)
            throw new Error("Task not found")
        }

        if(todo.userId?.toString()!== req.user?._id.toString()){
            res.status(403);
            throw new Error("Invalid Credentials")
        }
        next()
    }
)

export {authorizeOwner}