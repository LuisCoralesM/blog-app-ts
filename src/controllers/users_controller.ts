import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import {
  countABCNames,
  filterABCNames,
  sortByAlphaName,
} from "../services/users_services";

const prisma = new PrismaClient();

export async function findAllUsers(): Promise<User[]> {
  try {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  } catch (e) {
    return [];
  }
}

export async function findUniqueUser(id: number) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function deleteUser(id: number) {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
      data: {
        deleted_at: new Date(),
        profile: {
          update: {
            deleted_at: new Date(),
          },
        },
      },
    });
  } catch (error) {
    return undefined;
  }
}

/** To GET own user route */
export async function getOwnUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniqueUser(Number(req.body.user.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users route */
export async function getAllUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllUsers(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users by id route */
export async function getOneUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniqueUser(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE one user route */
export async function deleteOneUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: {
        user: await deleteUser(Number(req.params.id)),
      },
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE users route */
export async function deleteOwnUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: {
        user: await deleteUser(Number(req.body.user.id)),
      },
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

// Listing
export async function getByAlphaName(req: Request, res: Response) {
  try {
    return res.status(200).json(sortByAlphaName(await findAllUsers()));
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getABCUsers(req: Request, res: Response) {
  try {
    return res.status(200).json(filterABCNames(await findAllUsers()));
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getABCCountUser(req: Request, res: Response) {
  try {
    return res.status(200).json(countABCNames(await findAllUsers()));
  } catch (e) {
    return res.sendStatus(500);
  }
}
