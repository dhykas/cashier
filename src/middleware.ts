import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("ini middleware")
}

export const config = {
    matcher: ["/"]
}