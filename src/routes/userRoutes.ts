import express,{Router} from 'express'
import AuthController from '../controllers/userController'
import errorHandler from '../services/errrorHandler'
const router:Router = express.Router()

router.route("/register").post(errorHandler(AuthController.register))
router.route("/login").post(errorHandler(AuthController.login))
router.route("/forgot-password").post( AuthController.handleForgotPassword)
router.route("/verify-otp").post(AuthController.verifyOtp)
router.route("/reset-password").post(AuthController.resetPassword)
export default router