import { NextRequest, NextResponse } from "next/server";
import { getEmailPassword, verifyAdminEmailPassword, verifyUserEmailPassword } from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
    if (!req.url.includes("_next")) {
        //console.log(req.cookies.get("userId"))
        isAuthenticated(req)
    }

    if (req.url.includes("/loginaf")) {
        console.log(req)
        logInUser(req)
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

function logInUser(req: NextRequest) {
    const nextRes = NextResponse.next()

    nextRes.headers.set('Authorization', "Basic Billy:Bob")
    return new NextResponse("Unauthorized", { 
        status: 401,
        headers: { "WWW-Authenticate": "Basic"}
    })
}

async function isAuthenticated(req: NextRequest) {

    if (req.url.includes("/admin")) {
        const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")
        if (authHeader == null) return false
        return verifyAdminEmailPassword(authHeader)
    }

    let authHeader = req.headers.get("authorization")

    if (authHeader == null) return false
    //console.log(authHeader)

    // the authheader looks like basic askldjhfklasjdhf so we need the second value
    const [email, password] = getEmailPassword(authHeader)

    //console.log("username: ", email)
    //console.log("password: ", password)
    return verifyUserEmailPassword(authHeader)
    
}

export const config = {
    matcher: "/:path*" // run if accessing any page in admin
}
