export interface User {
    name: string
}

export interface Message {
    message: string
    createdAt: number
    user: User
}
