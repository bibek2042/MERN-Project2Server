import express from 'express'
import './database/connection'
import userRoute from './routes/userRoutes'
const app = express()

app.use(express.json())


// localhost:3000/
app.use("/api/auth",userRoute)


export default app
