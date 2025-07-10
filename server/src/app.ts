import express, { json } from "express"
import dotenv from "dotenv"
import { connectDB } from "./db"
import TodoRoutes from "./routes/todo"
import cors from "cors"
import UserRoutes from "./routes/user"
import { errorHandler } from "./middleware/errorHandler"
import cookieParser from "cookie-parser"

dotenv.config({
    path: ".env"
})

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(json())
app.use(cookieParser())
app.use(UserRoutes)
app.use(TodoRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`);
    
})

