import { User } from "@prisma/client";

export interface JwtDecoded{
    user: User,
    iat: number,
    exp: number
}

export interface ResData{
    error: boolean,
    message: string,
    token: string
}