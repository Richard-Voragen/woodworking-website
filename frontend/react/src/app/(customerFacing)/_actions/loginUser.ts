"use server"

import db from "@/db/db"

export async function loginUser({ email, password }: { email: string, password: string}) {
    const user = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            password: true
        }
    })

    if (user == null || !(password === user.password)) return null

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