"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
const router = (0, express_1.Router)();
router.get("/users/:id", index_1.users_controller.getOneUser);
router.get("/users", index_1.users_controller.getAllUser);
router.post("/users", index_1.users_controller.postUser);
router.put("/users/:id", index_1.users_controller.putUser);
router.delete("/users/:id", index_1.users_controller.deleteUser);
router.get("/posts/:id", index_1.posts_controller.getOnePost);
router.get("/posts", index_1.posts_controller.getAllPost);
router.post("/posts", index_1.posts_controller.postPost);
router.put("/posts/:id", index_1.posts_controller.putPost);
router.delete("/posts/:id", index_1.posts_controller.deletePost);
exports.default = router;
