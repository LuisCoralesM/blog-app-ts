import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { User, Post } from '../models/user';

const prisma = new PrismaClient();

/** To GET users route */
async function getAllUser(req: Request, res: Response) {
    try{
        const result = await prisma.user.findMany({
            include: {
                posts: true,
            }}
        );
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
        const result = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                birth_date: new Date(req.body.birth_date)
        }});
        return res.status(200).json({
            result
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

/** To PUT users route */
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
    putUser,
    postUser
}