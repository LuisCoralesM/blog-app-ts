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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function generateToken(payload, privateKey, signOptions) {
    return (0, jsonwebtoken_1.sign)(payload, privateKey, signOptions);
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.userExist)
                throw new Error;
            const hash = yield argon2_1.default.hash(req.body.password, { type: argon2_1.default.argon2id });
            if (yield argon2_1.default.verify(hash, req.body.password)) {
                const user = req.body.users;
                req.headers.authorization = generateToken(user, 'secret', { algorithm: 'RS256' });
                console.log(req.headers.authorization);
            }
            else
                throw new Error;
            return res.status(200).json({
                token: req.headers.authorization
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(401);
        }
    });
}
exports.login = login;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.headers.userExist)
                throw new Error;
            const hash = yield argon2_1.default.hash(req.body.password, { type: argon2_1.default.argon2id });
            const user = yield prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                }
            });
            const profile = yield prisma.profile.create({
                data: {
                    bio: "",
                    user: { connect: { id: user.id } }
                }
            });
            const result = yield prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    profile_id: profile.id
                }
            });
            return res.status(200).json({
                user: result, profile: profile
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
}
exports.signup = signup;
