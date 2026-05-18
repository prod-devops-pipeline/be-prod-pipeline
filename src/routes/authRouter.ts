import Router from "express";
import { getLoginLogs, login, logout } from "../controllers/authController";
import { auth } from "../middleware/authMiddelware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

router.post("/login", login);
router.post("/logout", auth as any, logout);
router.get("/getLoginLogs", auth as any, getLoginLogs);

export default router;
