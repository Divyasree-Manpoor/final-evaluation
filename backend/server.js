import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import accountRoutes from "./routes/accountRoutes.js"

dotenv.config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())


// routes
app.use("/api/auth", authRoutes)
app.use("/api/account", accountRoutes)

// server
const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})