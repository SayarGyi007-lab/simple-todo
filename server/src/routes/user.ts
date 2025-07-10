import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateProfile, userProfile } from "../controller/user";
import { protect } from "../middleware/authMiddleware";


const router = Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.route('/profile').post(protect,userProfile).put(protect,updateProfile)

export default router