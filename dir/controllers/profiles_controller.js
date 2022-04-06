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
exports.putProfile = exports.getOneProfile = exports.getAllProfile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.profile.findMany({
                include: {
                    user: {
                        select: {
                            created_at: true
                        }
                    },
                    posts: true,
                }
            });
            return res.status(200).json({
                profile: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.getAllProfile = getAllProfile;
function getOneProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.profile.findUnique({
                where: {
                    id: Number(req.params.id)
                },
                include: {
                    user: {
                        select: {
                            created_at: true
                        }
                    },
                    posts: true,
                }
            });
            return res.status(200).json({
                profile: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.getOneProfile = getOneProfile;
function putProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.profile.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    bio: req.body.bio
                }
            });
            return res.status(200).json({
                profile: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.putProfile = putProfile;
