import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** To GET profiles route */
async function getAllProfile(req: Request, res: Response) {
    try{
        const result = await prisma.profile.findMany({
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
            data: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To GET own profile */
async function getOwnProfile(req: Request, res: Response) {
    try{    
        const result = await prisma.profile.findFirst({
            where: {
                id: Number(req.body.user.profile_id)
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
            data: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To GET profiles by id route */
async function getOneProfile(req: Request, res: Response) {
    try{    
        const result = await prisma.profile.findUnique({
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
            data: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To PUT profiles route */
async function putProfile(req: Request, res: Response) {
    try{
        const result = await prisma.profile.update({
            where: {
                id: Number(req.body.user.profile_id)
            },
            data: {
                bio: req.body.bio
            }
        });
        return res.status(200).json({
            data: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export {
    getAllProfile,
    getOneProfile,
    getOwnProfile,
    putProfile
}