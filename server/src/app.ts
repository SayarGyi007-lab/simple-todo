import express, { json } from "express"
import dotenv from "dotenv"
import { connectDB } from "./db"
import TodoRoutes from "./routes/todo"
import cors from "cors"

dotenv.config({
    path: ".env"
})

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(json())

app.use(TodoRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`);
    
})

