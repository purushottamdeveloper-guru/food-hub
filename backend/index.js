import express from "express"
import dotenv from "dotenv"
dotenv.config()

import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import itemRouter from "./routes/item.routes.js"
import shopRouter from "./routes/shop.routes.js"
import orderRouter from "./routes/order.routes.js"

import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socket.js"

const app = express()
const server = http.createServer(app)

// Live Frontend URL
const frontendUrl = "https://food-hub-frontend-ftnc.onrender.com"

// Socket.IO CORS
const io = new Server(server, {
    cors: {
        origin: frontendUrl,
        credentials: true,
        methods: ["GET", "POST"]
    }
})

app.set("io", io)

// Port
const port = process.env.PORT || 5000

// Express CORS
app.use(cors({
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}))

// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

// Socket Handler
socketHandler(io)

// Start Server
server.listen(port, () => {
    connectDb()
    console.log(`Server started at ${port}`)
})