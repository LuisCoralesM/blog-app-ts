"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const router = (0, express_1.Router)();
router.post("/signup", auth_middleware_1.verifyIfUserExists, controllers_1.auth_controller.signup);
router.post("/login", auth_middleware_1.verifyIfUserExists, controllers_1.auth_controller.login);
exports.default = router;
