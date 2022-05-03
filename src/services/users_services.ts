import { User } from "@prisma/client";

interface counts {
  a: Number;
  b: Number;
  c: Number;
}

export function countABCNames(users: User[]): counts {
  const counts = { a: 0, b: 0, c: 0 };
  users.forEach((user) => {
    user.first_name.charAt(0).toLowerCase() === "a"
      ? (counts.a += 1)
      : user.first_name.charAt(0).toLowerCase() === "b"
      ? (counts.b += 1)
      : user.first_name.charAt(0).toLowerCase() === "c"
      ? (counts.c += 1)
      : null;
  });
  return counts;
}

export function sortByAlphaName(users: User[]) {
  return users
    .map((user) => ({
      first_name: user.first_name,
      last_name: user.last_name.toUpperCase(),
    }))
    .sort((a, b) => {
      if (a.first_name < b.first_name) return -1;
      if (a.first_name > b.first_name) return 1;
      return 0;
    });
}

export function filterABCNames(users: User[]) {
  return users.filter(
    (user) =>
      user.first_name.charAt(0).toLowerCase() === "a" ||
      user.first_name.charAt(0).toLowerCase() === "b" ||
      user.first_name.charAt(0).toLowerCase() === "c"
  );
}
