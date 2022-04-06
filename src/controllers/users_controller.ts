import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** To GET users route */
async function getAllUser(req: Request, res: Response) {
    try{
        const user = await prisma.user.findMany({
            include: {
                profile: true
            }
        });
        return res.status(200).json({
            data: user
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To GET users by id route */
async function getOneUser(req: Request, res: Response) {
    try{    
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                profile: true
            }
        });
        return res.status(200).json({
            data: user
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To DELETE users route */
async function deleteUser(req: Request, res: Response) {
    try{
        const user = await prisma.user.update({
            where: {
                id: Number(req.body.user.id)
            },
            data: {
                deleted_at: new Date()
            }
        });

        const profile = await prisma.profile.update({
            where: {
                id: Number(req.body.user.profile_id)
            },
            data: {
                deleted_at: new Date()
            }
        });
        return res.status(200).json({
            data: {user, profile}
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}   

export {
    getAllUser,
    getOneUser,
    deleteUser
}