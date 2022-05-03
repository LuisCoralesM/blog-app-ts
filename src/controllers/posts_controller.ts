import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAllPosts() {
  try {
    return await prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        profile: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
  } catch (error) {
    return [];
  }
}

export async function findUserPosts(username: string) {
  try {
    return await prisma.post.findMany({
      where: {
        profile: {
          user: {
            username: { contains: username },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        profile: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
  } catch (error) {
    return [];
  }
}

export async function findUniquePost(id: number) {
  try {
    return await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function createPost(
  title: string,
  content: string,
  user_id: number
) {
  try {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        profile: {
          connect: { user_id: user_id },
        },
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function deletePostId(id: number) {
  try {
    return await prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function updatePost(id: number, title: string, content: string) {
  try {
    return await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });
  } catch (error) {
    return undefined;
  }
}

/** To GET posts route */
export async function getAllPost(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllPosts(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST posts route */
export async function postPost(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await createPost(
        req.body.title,
        req.body.content,
        Number(req.body.user.id)
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET posts by id route */
export async function getOnePost(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniquePost(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users posts by username route */
export async function getUsersPost(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUserPosts(req.params.username),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT posts route */
export async function putPost(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await updatePost(
        Number(req.params.id),
        req.body.title,
        req.body.content
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE posts route */
export async function deletePost(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await deletePostId(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET own posts route */
export async function getOwnPosts(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUserPosts(req.body.user.username),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
