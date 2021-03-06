import { Router } from "express";
import {
  users_controller,
  posts_controller,
  profiles_controller,
} from "../controllers";

const router = Router();

// Users routes TESTING ONLY
router.get("/users/alpha", users_controller.getByAlphaName);
router.get("/users/abc", users_controller.getABCUsers);
router.get("/users/abccount", users_controller.getABCCountUser);
router.get("/users/all", users_controller.getAllUser); // Admin
router.get("/users/:id", users_controller.getOneUser); // Admin
router.get("/users/", users_controller.getOwnUser); // Anyone
router.delete("/users/:id", users_controller.deleteOneUser); // Admin only
router.delete("/users/", users_controller.deleteOwnUser); // Delete by current user id

// Profiles routes
router.get("/profiles/all", profiles_controller.getAllProfile);
router.get("/profiles/:id", profiles_controller.getOneProfile);
router.get("/profiles", profiles_controller.getOwnProfile);
router.put("/profiles/", profiles_controller.putProfile); // Own profile

// Posts routes
router.get("/posts/all", posts_controller.getAllPost);
router.get("/posts/user/:username", posts_controller.getUsersPost); // by username
router.get("/posts/:id", posts_controller.getOnePost); // by id
router.get("/posts", posts_controller.getOwnPosts); // Own posts
router.post("/posts", posts_controller.postPost);
router.put("/posts/:id", posts_controller.putPost);
router.delete("/posts/:id", posts_controller.deletePost);

export default router;
