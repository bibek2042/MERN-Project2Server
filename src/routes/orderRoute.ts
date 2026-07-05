import express, { Router } from 'express'
import ordercontroller from '../controllers/orderController'
import userMiddleware from '../middleware/userMiddleware'
import errorHandler from '../services/errrorHandler'
const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn, errorHandler(ordercontroller.createOrder))


export default router