"use server"

import db from "@/db/db";
import { redirect } from "next/navigation";

export async function checkUnique(value: string) {
  let user = await db.user.findUnique({
    where: {
      username: value
    }
  })
  if (user != null) return false
  user = await db.user.findUnique({
    where: {
      email: value
    }
  })
  if (user != null) return false
  return true
}

type createUserType = {
  username: string
  email: string
  password: string
}

export async function createUser({ username, email, password }: createUserType) {
  await db.user.create({
    data: {
        username,
        email,
        password,
        orders: {},
        products: {}
    }
  })

  redirect("/")
}

export async function getIdFromEmail(userEmail: string) {
    const user = await db.user.findUnique({
        where: { email: userEmail },
        select: { id: true }
    })

    if (user == null) return ""
    return user.id
}

export async function getUsernameFromId(id: string) {
  const user = await db.user.findUnique({
    where: { id },
    select: { username: true }
  })

  if (user == null) return ""
  return user.username
}

export async function getEmailFromId(id: string) {
  const user = await db.user.findUnique({
    where: { id },
    select: { email: true }
  })

  if (user == null) return ""
  return user.email
}

export async function setIdViaEmail(userEmail: string) {
  const user = await db.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  })
  if (user == null) return 
  return user.id
}
