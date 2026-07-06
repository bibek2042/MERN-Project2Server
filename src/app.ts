import express from 'express'
import './database/connection'
import userRoute from './routes/userRoutes'
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import OrderRoute from './routes/orderRoute'
import CartRoute from './routes/cartRoute'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// localhost:3000/
app.use("/api/auth",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use("/api/order",OrderRoute)
app.use("/api/cart",CartRoute)


export default app
