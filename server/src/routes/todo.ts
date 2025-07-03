import { Router } from "express";
import { createTodo, deleteTodo, getAllTodo, getTaskById, updateTask } from "../controller/todo";

const router = Router()

router.post("/create",createTodo)
router.delete("/delete/:title",deleteTodo)
router.get("/get",getAllTodo)
router.get("/get/:id",getTaskById)
router.put("/update/:id",updateTask)

export default router