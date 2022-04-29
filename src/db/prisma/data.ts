const users = [
  {
    first_name: "A",
    last_name: "Corales",
    username: "luis",
    email: "luis@email.com",
    password: "11111111",
  },
  {
    first_name: "B",
    last_name: "Ramirez",
    username: "diego",
    email: "diego@email.com",
    password: "22222222",
  },
  {
    first_name: "E",
    last_name: "gonzalez",
    username: "manuel",
    email: "manuel@email.com",
    password: "33333333",
  },
];

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

export { users, profiles, posts };
