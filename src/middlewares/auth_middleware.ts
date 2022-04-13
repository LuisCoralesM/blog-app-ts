import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/** Verify if the user already exists */
async function verifyIfUserExists(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await prisma.user.findFirst({
            where: {
                username: req.body.username
            },
            include: {
                profile: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if(users === null) {
            req.body.userExist = false; 
        }
        else {
            req.body.userExist = true;
            req.body.users = users;
        }

        next();
    } catch(e) {
        return res.sendStatus(401);
    }
};

function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token === undefined) throw new Error;

        jwt.verify(token, 'secret', (err, user) => {
            if (err) throw err;
            req.body.user = user;
        })
        
        next();
    } catch(e) {
        return res.sendStatus(401);
    }
}

export {
    verifyIfUserExists,
    verifyToken
}