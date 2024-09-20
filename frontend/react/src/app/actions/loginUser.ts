"use server"

import db from "@/db/db"
import { isValidPassword } from "@/lib/isValidPassword"
import { redirect } from "next/navigation"

export async function loginUser({ email, password }: { email: string, password: string}) {
    const user = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            password: true
        }
    })

    if (user == null || !(password === user.password)) return null

    console.log(user.id)
    return user.id
}

export async function getUsernameFromId({ id }: { id: string }) {

}

export async function confirmUserId({ id }: { id: string }) {
    const user = await db.user.findUnique({
        where: { id }
    })

    return (user != null)
}