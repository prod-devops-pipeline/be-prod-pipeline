import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getProductsByID,
  updateProduct,
} from "../controllers/productController";
import { auth } from "../middleware/authMiddelware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const route = Router();

route.get("/", getAllProducts);
route.post("/create", auth as any, createProducts);
route.delete("/:id", auth as any, deleteProduct);
route.put("/:id", auth as any, updateProduct);
route.get("/:id", auth as any, getProductsByID);

export default route;
