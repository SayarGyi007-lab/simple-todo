import express, { json } from "express"
import dotenv from "dotenv"
import { connectDB } from "./db"
import TodoRoutes from "./routes/todo"
import cors from "cors"
import UserRoutes from "./routes/user"
import { errorHandler } from "./middleware/errorHandler"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config({
    path: ".env"
})
const whitelist = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.CLIENT_URL
  ].filter(Boolean); // removes undefined
  

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin) return callback(null, 'http://localhost:5174'); // default dev origin
        if (whitelist.includes(origin)) {
            callback(null, origin); // MUST return the actual origin string
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())
app.use(UserRoutes)
app.use(TodoRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`);
    
})

