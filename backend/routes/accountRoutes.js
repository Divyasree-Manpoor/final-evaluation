import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { getBalance, transferMoney } from "../controllers/accountController.js"

const router = express.Router()

router.get("/balance", protect, getBalance)
router.post("/transfer", protect, transferMoney)

export default router