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
exports.deleteUser = exports.getOneUser = exports.getAllUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findMany({
                include: {
                    profile: {
                        select: {
                            id: true,
                            bio: true
                        }
                    }
                }
            });
            return res.status(200).json({
                user
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.getAllUser = getAllUser;
function getOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: Number(req.params.id)
                },
                include: {
                    profile: {
                        select: {
                            id: true,
                            bio: true
                        }
                    }
                }
            });
            return res.status(200).json({
                user
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.getOneUser = getOneUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    deleted_at: new Date()
                }
            });
            const profile = yield prisma.profile.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    deleted_at: new Date()
                }
            });
            return res.status(200).json({
                user, profile
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.deleteUser = deleteUser;
