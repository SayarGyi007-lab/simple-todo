import { Router } from "express";
import { createTodo, deleteTodo, getAllTodo, getTaskById, updateTask } from "../controller/todo";
import { protect } from "../middleware/authMiddleware";
import { authorizeOwner } from "../middleware/authurizationMiddleware";

const router = Router()

router.post("/create",protect,createTodo)
router.delete("/delete/:id",protect,authorizeOwner,deleteTodo)
router.get("/get",getAllTodo)
router.get("/get/:id",getTaskById)
router.put("/update/:id",protect,authorizeOwner,updateTask)

export default router