import { Request, Response, NextFunction } from 'express';
import argon2 from "argon2";
import jwt, {SignOptions} from "jsonwebtoken";
import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient();

function generateToken(payload: User, privateKey: string, signOptions?: SignOptions): string {
    return jwt.sign(payload, privateKey, signOptions);
}

/** To POST auth route */
async function login(req: Request, res: Response) {
    try{    
        if(!req.body.userExist) throw new Error;

        const hash = await argon2.hash(req.body.password, {type: argon2.argon2id});

        if(await argon2.verify(hash, req.body.password))
        {
            const user: User = req.body.users;            
            req.headers.authorization = generateToken(user, 'secret');
        }
        else throw new Error; 

        return res.status(200).json({
            token: req.headers.authorization
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(401);
    }
}


/** To POST users route */
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

        const result = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                profile_id: profile.id
            }
        })

        return res.status(200).json({
            user: result, profile: profile
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export {
    login,
    signup
}