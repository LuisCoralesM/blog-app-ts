import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

async function hashPasswords(): Promise<string[]> {
  return [
    await argon2.hash("11111111", {
      type: argon2.argon2id,
    }),
    await argon2.hash("22222222", {
      type: argon2.argon2id,
    }),
    await argon2.hash("33333333", {
      type: argon2.argon2id,
    }),
  ];
}

const profiles = [
  {
    user_id: 1,
    bio: "Luis' Bio",
  },
  {
    user_id: 2,
    bio: "Diego's Bio",
  },
  {
    user_id: 3,
    bio: "Manuel's Bio",
  },
];

const posts = [
  {
    profile_id: 1,
    title: "Luis Post",
    content: "My Content",
  },
  {
    profile_id: 2,
    title: "Diego's Post",
    content: "",
  },
  {
    profile_id: 3,
    title: "Manuel's Post",
    content: "",
  },
];

const prisma = new PrismaClient();

async function main() {
  const pass = await hashPasswords();

  await prisma.user.createMany({
    data: [
      {
        first_name: "A",
        last_name: "Corales",
        username: "1",
        email: "luis@email.com",
        password: pass[0],
      },
      {
        first_name: "B",
        last_name: "Ramirez",
        username: "2",
        email: "diego@email.com",
        password: pass[1],
      },
      {
        first_name: "E",
        last_name: "gonzalez",
        username: "3",
        email: "manuel@email.com",
        password: pass[2],
      },
    ],
  });

  for (let profile of profiles) {
    await prisma.profile.create({
      data: profile,
    });
  }

  for (let post of posts) {
    await prisma.post.create({
      data: post,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => prisma.$disconnect);
