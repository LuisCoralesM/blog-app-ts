import { Request, Response, NextFunction } from 'express';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface counts { a: Number, b: Number, c: Number };

/** To GET own user route */
async function getOwnUser(req: Request, res: Response) {
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.body.user.id)
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

/** To DELETE one user route */
async function deleteOneUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
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

/** To DELETE users route */
async function deleteOwnUser(req: Request, res: Response) {
    try {        
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
                id: Number(req.body.user.profile.id)
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

// Listing
async function getByAlphaName(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                first_name: "asc"
            }
        });

        const usersRes = users.map(user => ({
            first_name: user.first_name,
            last_name: user.last_name.toUpperCase()
        }));

        return res.status(200).json({
            data: usersRes
        });
    } catch (e) {
        return res.sendStatus(500);
    }
}

async function findABCNames(): Promise<User[]> {
    try {
        return await prisma.user.findMany({
            where: {
                OR: [
                    {
                        first_name: {
                            startsWith: "a",
                            mode: "insensitive"
                        }
                    },
                    {
                        first_name: {
                            startsWith: "b",
                            mode: "insensitive"
                        }
                    },
                    {
                        first_name: {
                            startsWith: "c",
                            mode: "insensitive"
                        }
                    }
                ] 
            }
        });
    } catch (e) {
        return [];
    }
}

function countABCNames(users: User[]): counts {
    const counts = { a: 0, b: 0, c: 0 };    
    users.forEach(user => { 
        user.first_name.charAt(0).toLowerCase() === "a" ? counts.a += 1 : 
            user.first_name.charAt(0).toLowerCase() === "b" ? counts.b += 1 : 
                user.first_name.charAt(0).toLowerCase() === "c" ? counts.c += 1 : null;
    });
    return counts;
}

async function getABCUsers(req: Request, res: Response) {
    try {
        const users = await findABCNames();
        return res.status(200).json({
                data: users
        });
    } catch(e) {
        return res.sendStatus(500);
    }
}

async function getABCCountUser(req: Request, res: Response) {
    try {
        return res.status(200).json(countABCNames(await findABCNames()));
    } catch(e) {
        return res.sendStatus(500);
    }
}

export {
    getAllUser,
    getOneUser,
    deleteOwnUser,
    getABCCountUser,
    getByAlphaName,
    getABCUsers,
    deleteOneUser,
    getOwnUser
}