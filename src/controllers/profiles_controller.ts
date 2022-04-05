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
            profile: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// // Create profile as soon as an user is created
// /** To POST profiles route */
// async function postUser(req: Request, res: Response) {
//     try{    
//         const result = await prisma.profile.create({
//             data: {
//                 birth_date: new Date(req.body.birth_date)
//         }});
//         return res.status(200).json({
//             result
//         });
//     } catch(e) {
//         console.log(e);
//         return res.sendStatus(500);
//     }
// }

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
            profile: result
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
                id: Number(req.params.id)
            },
            data: {
                bio: req.body.bio
            }
        });
        return res.status(200).json({
            profile: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// // Only delete if user is deleted
// /** To DELETE profiles route */
// async function deleteProfile(req: Request, res: Response) {
//     try{
//         const result = await prisma.profile.update({
//             where: {
//                 id: Number(req.params.id)
//             },
//             data: {
//                 deleted_at: new Date()
//             }
//         });
//         return res.status(200).json({
//             result
//         });
//     } catch(e) {
//         console.log(e);
//         return res.sendStatus(500);
//     }
// }

export {
    getAllProfile,
    getOneProfile,
    putProfile
}