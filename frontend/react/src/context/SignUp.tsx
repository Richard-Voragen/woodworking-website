import db from "@/db/db";
import { useState, useEffect } from "react";
import { z } from "zod";
import { setId } from "../lib/ID";

const signUpSchema = z.object({
    username: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .refine(async (e) => {
        checkUnique(e)
      }, "This username is taken."),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")
      .refine(async (e) => {
        checkUnique(e)
      }, "This email already has an account."),
})

async function checkUnique(value: string) {
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

export function signUp(prevState: unknown, formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }
}