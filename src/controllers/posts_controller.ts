import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** To GET posts route */
async function getAllPost(req: Request, res: Response) {
    try{
        const result = await prisma.post.findMany({
            orderBy: {
                created_at: "desc"
            },
            include: {
                profile: {
                    include: {
                        user: {
                            select: { username: true}
                        }
                    }
                }
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

/** To POST posts route */
async function postPost(req: Request, res: Response) {
    try {
        const result = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                profile: {
                    connect: {user_id: req.body.user.id}
                }
            },
        });
        return res.status(200).json({
            data: result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To GET posts by id route */
async function getOnePost(req: Request, res: Response) {
    try{    
        const result = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                profile: {
                    include: {
                        user: {
                            select: { username: true}
                        }
                    }
                }
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

/** To GET users posts by username route */
async function getUsersPost(req: Request, res: Response) {
    try{    
        const result = await prisma.post.findMany({
            where: {
                profile: { 
                    user: {
                        username: {
                            contains: req.params.id
                        }
                    }
                }
            },
            include: {
                profile: {
                    include: {
                        user: {
                            select: { username: true}
                        }
                    }
                }
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

/** To PUT posts route */
async function putPost(req: Request, res: Response) {
    try{
        const result = await prisma.post.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                title: req.body.title,
                content: req.body.content
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

/** To DELETE posts route */
async function deletePost(req: Request, res: Response) {
    try{
        const result = await prisma.post.delete({
            where: {
                id: Number(req.params.id),
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

/** To GET own posts route */
async function getOwnPost(req: Request, res: Response) {
    try{
        const result = await prisma.post.findMany({
            where: {
                profile: {
                    user_id: req.body.user.id
                }
            },
            orderBy: {
                created_at: "desc"
            },
            include: {
                profile: {
                    include: {
                        user: {
                            select: { username: true}
                        }
                    }
                }
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
    getAllPost,
    getOnePost,
    deletePost,
    postPost,
    putPost,
    getOwnPost,
    getUsersPost
}