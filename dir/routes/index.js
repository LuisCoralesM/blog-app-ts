"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_middleware_1 = require("../middlewares/auth_middleware");
const auth_routes_1 = __importDefault(require("./auth_routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard_routes"));
router.use("/auth", auth_routes_1.default);
router.use("/dashboard", auth_middleware_1.verifyToken, dashboard_routes_1.default);
exports.default = router;
