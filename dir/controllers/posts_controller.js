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
exports.putPost = exports.postPost = exports.deletePost = exports.getOnePost = exports.getAllPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.findMany({
                include: {
                    profile: {
                        include: {
                            user: {
                                select: { username: true }
                            }
                        }
                    }
                }
            });
            return res.status(200).json({
                post: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.getAllPost = getAllPost;
function postPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    profile: {
                        connect: { user_id: req.body.user_id }
                    }
                }
            });
            return res.status(200).json({
                post: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.postPost = postPost;
function getOnePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });
            return res.status(200).json({
                post: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.getOnePost = getOnePost;
function putPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    title: req.body.title,
                    content: req.body.content
                }
            });
            return res.status(200).json({
                post: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.putPost = putPost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.delete({
                where: {
                    id: Number(req.params.id)
                }
            });
            return res.status(200).json({
                post: result
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.deletePost = deletePost;
