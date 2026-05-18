import Router from "express";
import {
  createUser,
  deleteUserById,
  getAllUser,
  getUserById,
  updateUSerById,
} from "../controllers/userController";
import { auth } from "../middleware/authMiddelware";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { userValidation } from "../middleware/userValidate";

const router = Router();

router.get("/", auth as any, getAllUser);
router.post("/create", userValidation, createUser);
router.get("/:id", auth as any, getUserById);
router.delete("/:id", auth as any, deleteUserById);
router.put("/:id", auth as any, updateUSerById);

export default router;
