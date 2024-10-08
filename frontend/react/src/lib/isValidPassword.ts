"use client"

export async function isValidPassword(password: string, hashedPassword: string) {
    //console.log(await hashPassword(password))

    return await hashPassword(password) === hashedPassword
}

export async function hashPassword(password: string) {
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))

    return Buffer.from(arrayBuffer).toString("base64") as string
}

export function getEmailPassword(emailPass: string) {
    const splitString = emailPass.split(" ")
    const [email, password] = Buffer.from(splitString[splitString.length - 1], "base64")
        .toString()
        .split(":")
    return [email, password]
}

export async function verifyAdminEmailPassword(emailPass: string) {
    const [userEmail, userPassword] = getEmailPassword(emailPass)


    return (userEmail === process.env.NEXT_PUBLIC_ADMIN_USERNAME 
            && await isValidPassword(userPassword, process.env.NEXT_PUBLIC_HASHED_ADMIN_PASSWORD as string))
}
