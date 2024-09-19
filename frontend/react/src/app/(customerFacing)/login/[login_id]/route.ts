import db from "@/db/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest, 
    { 
        params: { login_id }, 
    }: { params: { login_id: string } }
) {
    console.log(req)
    const email = "richard24680123@gmail.com"
    const password = "password"
    const user = await db.user.findUnique({
        where: { email },
        select: { password: true }
    })

    if (user == null) return NextResponse.redirect(new URL("http://localhost:3000"))

    process.env.USER_EMAIL = email
    process.env.HASHED_USER_PASSWORD = user.password

    req.headers

    console.log("ADDED")
/*     console.log(new NextResponse(NextResponse.next().body, {
        headers: req.headers,
        url: "http://localhost:3000"
    })) */

    const newRec = NextResponse.redirect(new URL("http://localhost:3000"))
    const auth = req.headers.get("authorization")
    //newRec.headers.set("authorization", "Basic YWRtaW46cGFzc3dvcmQ=")
    console.log(newRec)

    return newRec
}