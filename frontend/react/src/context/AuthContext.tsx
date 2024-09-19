import db from "@/db/db";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { z } from "zod";
import { getIdFromEmail, setIdViaEmail, signUp } from "@/app/actions/checkEmail";
import { useCookies } from 'react-cookie'

async function CreateTestUser() {
  const email = "testuser@gmail.com" as string

  await db.user.create({
    data: {
        username: "Test",
        email,
        password: "password",
        orders: {},
        products: {}
    }
  })

  return
}

export function SignUpButton({ }) {
  const [error, action] = useFormState(signUp, {})

  return (
    <button onClick={() => setIdViaEmail("userEmail")}>
      Email: {}
    </button>
  );
}

export function LogInButton({ userEmail }: { userEmail: string }) {
  const [cookies, setCookie] = useCookies(['userId'])


  function handleLogin() {
    setCookie('userId', getIdFromEmail(userEmail), { path: '/' })
  }

  //const email = getId()
  return (
    <button onClick={handleLogin}>
      Email: {}
    </button>
  );
}
