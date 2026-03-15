import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js"
dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/account",accountRoutes)


const PORT=process.env.PORT||2426
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})