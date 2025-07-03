import { Request, Response } from "express";
import { Todo } from "../model/todo";

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title } = req.body
        const response = await Todo.create(
            {
                title
            }
        )
        res.status(201).json({ message: "New Todo sucessfully created", response })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { title } = req.params
        if (!title) {
            res.status(404).json({ message: "title is required" })
        }
        await Todo.findOneAndDelete({ title: title.toLowerCase() })
        res.status(200).json({ message: `${title} is deleted` })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const getAllTodo = async (req: Request, res: Response) => {
    try {
        const tasks = await Todo.find({})
        res.status(200).json({ tasks })

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const getTaskById = async (req: Request, res: Response) => {
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
}

export const updateTask = async (req: Request, res: Response) => {
   
    const { title } = req.body
    const {id} = req.params

    try {
        
        const updateTask = await Todo.findByIdAndUpdate(id,{title})
        res.status(200).json({ message:"Task updated successfully",  updateTask })


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })

    }
}