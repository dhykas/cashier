import { NextRequest } from "next/server";
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    console.log("ini middleware");

    const cookieStore = cookies();

    const token = cookieStore.get('token')?.value;

    // console.log(jwt.decode(token as string))

}

export const config = {
    matcher: ["/"]
}