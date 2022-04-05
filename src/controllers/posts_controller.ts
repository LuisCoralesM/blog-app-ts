import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Post } from '../models/user';

const prisma = new PrismaClient();

/** To GET posts route */
async function getAllPost(req: Request, res: Response) {
    try{
        const result = await prisma.post.findMany();
        return res.status(200).json({
            result
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

/** To POST posts route */
async function postPost(req: Request, res: Response) {
    try{    
        const result = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                user: {connect: {email: req.body.email}}
        }});
        return res.status(200).json({
            result
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

/** To PUT posts route */
async function putPost(req: Request, res: Response) {
    try{
        const result = await prisma.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: req.body.title,
                content: req.body.content
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

/** To DELETE posts route */
async function deletePost(req: Request, res: Response) {
    try{
        const result = await prisma.post.delete({
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

export {
    getAllPost,
    getOnePost,
    deletePost,
    postPost,
    putPost
}