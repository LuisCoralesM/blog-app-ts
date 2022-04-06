import { PrismaClient } from "@prisma/client";
import { posts, users, profiles } from "./data";

const prisma = new PrismaClient();

async function main() {
    for (let user of users) {
        await prisma.user.create({
            data: user
        })
    }

    for (let profile of profiles) {
        await prisma.profile.create({
            data: profile
        })
    }

    for (let post of posts) {
        await prisma.post.create({
            data: post
        })
    }
}

main().catch(e => {
    console.log(e);
}).finally(() => 
    prisma.$disconnect
);