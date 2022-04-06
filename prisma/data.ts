const users = [
    {
        username: "luis",
        email: "luis@email.com",
        password: "123",
        profile_id: 1
    },
    {
        username: "diego",
        email: "diego@email.com",
        password: "456",
        profile_id: 2
    },
    {
        username: "manuel",
        email: "manuel@email.com",
        password: "789",
        profile_id: 3
    }
]

const profiles = [
    {
        user_id: 1,
        bio: "Luis' Bio"
    },
    {
        user_id: 2,
        bio: "Diego's Bio"
    },
    {
        user_id: 3,
        bio: "Manuel's Bio"
    }
]

const posts = [
    {
        profile_id: 1,
        title: "Luis Post",
        content: "My Content"
    },
    {
        profile_id: 2,
        title: "Diego's Post",
        content: ""
    },
    {
        profile_id: 3,
        title: "Manuel's Post",
        content: ""
    }
]

export {
    users,
    profiles,
    posts
}