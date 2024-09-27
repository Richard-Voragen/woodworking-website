import { NextRequest, NextResponse } from "next/server";
import { verifyAdminEmailPassword } from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
    if (!req.url.includes("_next")) {
        //console.log(req.cookies.get("userId"))
        isAuthenticated(req)
    }

    if (req.url.includes("/admin")) {
        if ((await isAuthenticated(req)) === false) {
            return new NextResponse("Unauthorized", { 
                status: 401,
                headers: { "WWW-Authenticate": "Basic"}
            })
        }
    }
}

async function isAuthenticated(req: NextRequest) {
    //console.log(req.cookies)

    if (req.url.includes("/admin")) {
        const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")
        if (authHeader == null) return false
        return verifyAdminEmailPassword(authHeader)
    }

    const authHeader = req.headers.get("authorization")

    if (authHeader == null) return false
    return false

    // the authheader looks like basic askldjhfklasjdhf so we need the second value

    //const [email, password] = getEmailPassword(authHeader)
    //console.log("username: ", email)
    //console.log("password: ", password)

    //return verifyUserEmailPassword(authHeader)
    
}

export const config = {
    matcher: "/:path*" // run if accessing any page in admin
}
