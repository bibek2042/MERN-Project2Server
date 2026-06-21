import express,{Router} from 'express'
import AuthController from '../controllers/userController'
import userMiddleware, { Role } from '../middleware/userMiddleware'
const router:Router = express.Router()


router.route("/register").post(AuthController.register)
router.route("/login").post(AuthController.login)
router.route("/forgot-password").post( AuthController.handleForgotPassword)
router.route("/verify-otp").post(AuthController.verifyOtp)
router.route("/reset-password").post(AuthController.resetPassword)
export default router