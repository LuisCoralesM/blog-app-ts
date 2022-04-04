import { Router } from "express";
import { users_controller } from "../controllers/index";

const router = Router();

router.get("/users/:id", users_controller.getOneUser);
router.get("/users", users_controller.getAllUser);
router.post("/users", users_controller.postUser);
router.put("/users/:id", users_controller.putUser);
router.delete("/users/:id", users_controller.deleteUser);

export default router;