import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { User } from '../models/user';

const prisma = new PrismaClient();

/** To GET doctors route */
async function getAllUser(req: Request, res: Response) {
    try{
        const result: User[] = await prisma.user.findMany();
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To POST doctors route */
async function postUser(req: Request, res: Response) {
    try{    
        const result: User = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                birth_date: new Date(req.body.birth_date),
                deleted: false
        }});
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To GET doctor by id route */
async function getOneUser(req: Request, res: Response) {
    try{    
        const result: User | null = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To PUT doctors route */
async function putUser(req: Request, res: Response) {
    try{
        const result = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                username: req.body.username,
                email: req.body.email
            }
        });
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To DELETE doctors route */
async function deleteUser(req: Request, res: Response) {
    try{
        const result = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                deleted: true
            }
        });
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export {
    getAllUser,
    getOneUser,
    deleteUser,
    putUser,
    postUser
}