"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 5500;
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.use((req, res) => {
    return res.sendStatus(404);
});
app.listen(port, () => {
    console.log("The API is running on http://localhost:" + port);
});
