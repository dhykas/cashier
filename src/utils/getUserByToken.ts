import jwt from "jsonwebtoken";
import { JwtDecoded } from "@/utils/types";
import { User } from "@prisma/client";

export default function getUser(token: string): User {
    const decodedtoken: JwtDecoded = jwt.decode(token!) as JwtDecoded
    return decodedtoken.user
}