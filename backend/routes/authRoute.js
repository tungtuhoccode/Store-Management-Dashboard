import express from "express";
import { userSignUp, userLogIn, userLogOut, refreshToken, getProfile } from "../controllers/authController.js"
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogIn);
router.post("/logout", userLogOut);
router.post("/refresh-token", refreshToken)
router.get("/profile", protectRoute, getProfile)

export default router;

