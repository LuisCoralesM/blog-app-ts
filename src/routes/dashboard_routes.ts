import { Router } from "express";
import { users_controller, posts_controller, profiles_controller } from "../controllers";

const router = Router();

// Users routes TESTING ONLY
router.get("/users/alpha", users_controller.getByAlphaName);
router.get("/users/abc", users_controller.getABCUsers);
router.get("/users/abccount", users_controller.getABCCountUser);
router.get("/users/:id", users_controller.getOneUser);
router.get("/users", users_controller.getAllUser);
router.delete("/users/", users_controller.deleteUser);

// Profiles routes
router.get("/profiles/all", profiles_controller.getAllProfile);
router.get("/profiles/:id", profiles_controller.getOneProfile);
router.get("/profiles", profiles_controller.getOwnProfile)
router.put("/profiles/:id", profiles_controller.putProfile);

// Posts routes
router.get("/posts/:id", posts_controller.getOnePost);
router.get("/posts", posts_controller.getAllPost);
router.post("/posts", posts_controller.postPost);
router.put("/posts/:id", posts_controller.putPost);
router.delete("/posts/:id", posts_controller.deletePost);

export default router;
