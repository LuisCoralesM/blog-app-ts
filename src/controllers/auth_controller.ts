import { Request, Response, NextFunction } from 'express';
import argon2 from "argon2";
import jwt, {SignOptions} from "jsonwebtoken";
import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient();

function generateToken(payload: User, privateKey: string, signOptions?: SignOptions): string {
    return jwt.sign(payload, privateKey, signOptions);
}

/** To POST login route */
async function login(req: Request, res: Response) {
    try{    
        if(!req.body.userExist) throw new Error;

        const hash = await argon2.hash(req.body.password, {type: argon2.argon2id});
        
        if(await argon2.verify(req.body.user.password, req.body.password))
            req.headers.authorization = generateToken(req.body.user, "secret");
        else 
            throw new Error; 

        // res.cookie("token", req.headers.authorization, {
        //     httpOnly: true,
        //     secure: true
        // });        
        
        return res.status(201).json({
            username: req.body.user.username,
            token: req.headers.authorization
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(401);
    }
}


/** To POST signup route */
async function signup(req: Request, res: Response) {
    try{    
        if(req.headers.userExist)
            throw new Error;            
        
        const hash = await argon2.hash(req.body.password, {type: argon2.argon2id});
        
        const user = await prisma.user.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
            }
        });

        const profile = await prisma.profile.create({
            data: {
                bio: "",
                user: { connect: { id: user.id } }
            }
        });

        return res.status(201).json({
            user: user, profile: profile
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To POST auth route */
async function logout(req: Request, res: Response) {
    try{
        return res.clearCookie("token").status(201).json({msg: "Logged out"});
    } catch(e) {
        console.log(e);
        return res.sendStatus(401);
    }
}

export {
    login,
    signup,
    logout
}