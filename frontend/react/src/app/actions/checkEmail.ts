"use server"

import db from "@/db/db";
import { hashPassword } from "@/lib/isValidPassword";
import { useState, useEffect } from "react";
import { z } from "zod";

export async function checkUnique(value: string) {
  console.log("CALLED EMAIL", value)
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
  console.log(" USERNAME: ", username)
  console.log(" EMAIL: ", email)
  console.log(" PASSWORD: ", password)

  await db.user.create({
    data: {
        username,
        email,
        password,
        orders: {},
        products: {}
    }
  })
}

export async function getIdFromEmail(userEmail: string) {
    const user = await db.user.findUnique({
        where: { email: userEmail },
        select: { id: true }
    })

    if (user == null) return ""
    return user.id
}

export async function setIdViaEmail(userEmail: string) {
  //console.log(checkUnique(userEmail))
  
  const user = await db.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  })
  if (user == null) return 
  console.log(user.id)
  return "Hello"
  //return setId(user.id)
}
