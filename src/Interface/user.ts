export interface IUser {
    id: string
    username: string
    age: number
    hobbies: string[]
}

export interface IUserTest {
    username: string
    hobbies: string[]
    age: number
    id?: string
}
