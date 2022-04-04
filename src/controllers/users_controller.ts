import { Request, Response, NextFunction } from 'express';

/** To GET doctors route */
export async function getAll(req: Request, res: Response) {
    try{
        const result = await User.findAll({
            
        });

        return res.status(200).json({
            result
        });
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To POST doctors route */
export async function post(req: Request, res: Response) {
    try{    
        const result = await User.create({
            username: req.body.username,
            email: req.body.email,
            birth_date: req.body.birth_date
        });

        return res.status(200).json({
            result
        });
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To GET doctor by id route */
export async function getOne(req: Request, res: Response) {
    try{
        const result = await User.findByPk(req.params.id, {
            
        });

        return res.status(200).json({
            result
        });
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To PUT doctors route */
module.exports.put = async (req: Request, res: Response) => {
    try{
        const result = await Doctor.update({
            username: req.body.username,
            email: req.body.email
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To DELETE doctors route */
module.exports.delete = async (req: Request, res: Response) => {
    try{
        const result = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({
            result
        });
    } catch(e) {
        return res.sendStatus(500);
    }
}