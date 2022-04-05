import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { User, Post } from '../models/user';

const prisma = new PrismaClient();

/** To GET users route */
async function getAllUser(req: Request, res: Response) {
    try{
        const result = await prisma.user.findMany();
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To POST users route */
async function postUser(req: Request, res: Response) {
    try{    
        const data = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profile: {
                    create: {
                        bio: ""
                    }
                }
            }
        });

        const profile = await prisma.profile.create({
            data: {
                user: { connect: { id: data.id } }
            }
        });

        const result = await prisma.user.update({
            where: {
                id: data.id
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

/** To GET users by id route */
async function getOneUser(req: Request, res: Response) {
    try{    
        const result = await prisma.user.findUnique({
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


// // Cant update anything manually
// /** To PUT users route */
// async function putUser(req: Request, res: Response) {
//     try{
//         const result = await prisma.user.update({
//             where: {
//                 id: Number(req.params.id)
//             },
//             data: {
//                 username: req.body.username,
//                 email: req.body.email
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

/** To DELETE users route */
async function deleteUser(req: Request, res: Response) {
    try{
        const result = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                deleted_at: new Date()
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
    postUser
}