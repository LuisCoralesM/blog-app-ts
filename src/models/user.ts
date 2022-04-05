export interface User {
    id:          number,
    username:    string,
    email:       string,
    password:    string,
    profile:     Profile,
    profile_id:  number,
    created_at:  Date,
    deleted_at:  Date
}

export interface Profile {
    id:          number,
    user:        User,
    user_id:     number,
    bio:         string,
    updated_at:  Date,
    deleted_at:  Date,
    posts:       Post[]
}

export interface Post {
    id:          number,
    profile:     User,
    profile_id:  number,
    title:       string,
    content:     string,
    score:       number,
    created_at:  Date
}