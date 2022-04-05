export interface User {
    id:          number,
    username:    string,
    email:       string,
    birth_date:  Date
    updated_at:  Date,
    deleted_at:     Boolean
    posts:       Post[]
}

export interface Post {
    id:          number,
    user:        User,
    userId:      number
    title:       string,
    content:     string,
    score:       number,
    created_at:  Date
}