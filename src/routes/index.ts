import { Router } from "express";
import { users_controller, posts_controller, profiles_controller } from "../controllers";

const router = Router();

// Users routes
router.get("/users/:id", users_controller.getOneUser);
router.get("/users", users_controller.getAllUser);
router.post("/users", users_controller.postUser);
router.delete("/users/:id", users_controller.deleteUser);

// Profiles routes
router.get("/profiles/:id", profiles_controller.getOneProfile);
router.get("/profiles", profiles_controller.getAllProfile);
router.put("/profiles/:id", profiles_controller.putProfile);

// Posts routes
router.get("/posts/:id", posts_controller.getOnePost);
router.get("/posts", posts_controller.getAllPost);
router.post("/posts", posts_controller.postPost);
router.put("/posts/:id", posts_controller.putPost);
router.delete("/posts/:id", posts_controller.deletePost);

export default router;