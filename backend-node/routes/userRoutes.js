import { Router } from "express";
import { updateScore, getLeaderboard, getUserProgress } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();




router.post("/update-score",verifyToken ,updateScore);
router.get("/get-score",verifyToken ,getUserProgress);
router.get("/leaderboard", verifyToken,getLeaderboard);

export default router;