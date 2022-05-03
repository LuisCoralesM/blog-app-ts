import { Request, Response } from "express";
import { PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAllProfiles(): Promise<Profile[]> {
  try {
    return await prisma.profile.findMany({
      include: {
        user: {
          select: {
            created_at: true,
            username: true,
          },
        },
        posts: true,
      },
    });
  } catch (e) {
    return [];
  }
}

export async function findUniqueProfile(id: number) {
  try {
    return await prisma.profile.findUnique({
      where: {
        user_id: id,
      },
      include: {
        user: {
          select: {
            created_at: true,
            username: true,
          },
        },
        posts: true,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function updateProfile(id: number, bio: string) {
  try {
    return await prisma.profile.update({
      where: {
        user_id: id,
      },
      data: {
        bio: bio,
      },
    });
  } catch (error) {
    return undefined;
  }
}

/** To GET profiles route */
export async function getAllProfile(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllProfiles(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET own profile */
export async function getOwnProfile(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniqueProfile(Number(req.body.user.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET profiles by id route */
export async function getOneProfile(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniqueProfile(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT profiles route */
export async function putProfile(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await updateProfile(Number(req.body.user.id), req.body.bio),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
