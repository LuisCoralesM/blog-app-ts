"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.verifyIfUserExists = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function verifyIfUserExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findFirst({
                where: {
                    username: req.body.username
                }
            });
            if (users === null) {
                req.body.userExist = false;
            }
            else {
                req.body.userExist = true;
                req.body.users = users;
            }
            next();
        }
        catch (e) {
            return res.sendStatus(401);
        }
    });
}
exports.verifyIfUserExists = verifyIfUserExists;
;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearerHeader = req.headers.authorization;
            if (bearerHeader === undefined)
                throw new Error;
            const bearer = bearerHeader.split(' ');
            req.headers.token = bearer[1];
            next();
        }
        catch (e) {
            return res.sendStatus(401);
        }
    });
}
exports.verifyToken = verifyToken;
