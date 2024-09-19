"use server"

import db from "@/db/db"
import { redirect } from "next/navigation"

export async function changeEnv() {
    const email = "user"
    const password = "password"
    const user = await db.user.findUnique({
        where: { email },
        select: { password: true }
    })

    if (user == null) return 

    process.env.USER_EMAIL = email
    process.env.HASHED_USER_PASSWORD = user.password

    console.log("ADDED")

    redirect("/admin/products")
}

export async function testFunc() {
    console.log("TESTFUNC")
}