import { Request, Response } from "express";
import { Todo } from "../model/todo";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/authMiddleware";

export const createTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
    try {
        const { title } = req.body
        const userId = req.user?._id
        const response = await Todo.create(
            {
                title,
                userId
            }
        )
        res.status(201).json({ message: "New Todo sucessfully created", response })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
})

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo has been deleted." });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Something went wrong." });
  }
})

export const getAllTodo = asyncHandler(async (req: Request, res: Response) => {
    try {
        const tasks = await Todo.find({})
        res.status(200).json({ tasks })

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
})

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const task = await Todo.findById(id)
        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json({ data: task })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })

    }
})

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
   
    const { title } = req.body
    const {id} = req.params

    try {
        
        const updateTask = await Todo.findByIdAndUpdate(id,{title})
        res.status(200).json({ message:"Task updated successfully",  updateTask })


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })

    }
})