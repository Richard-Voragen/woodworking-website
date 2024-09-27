"use client"

import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export class LoginState {
    private static instance: LoginState;
    public static userId: string;

    private constructor() {
        LoginState.userId = ""
    }

    public static getUserId(): string {
        return LoginState.userId
    }

    public static getInstance(): LoginState {
        if (!LoginState.instance) {
            LoginState.instance = new LoginState()
        }
        return LoginState.instance
    }

    public isLoggedIn(): boolean {
        LoginState.userId = this.getUserId()

        return (LoginState.userId != "")
    }

    public getUserId(): string {
        const [userId, setUserId] = useState("")

        useEffect(() => {
            const loggedInUser = localStorage.getItem("user")
            if (loggedInUser) {
                const foundUser = JSON.parse(loggedInUser)
                setUserId(foundUser)
                LoginState.userId = userId
            }
        }, [])

        return userId
    }

    public logout(userId: string): void {
        const [, setCookie] = useCookies(['user_id'])

        useEffect(() => {
            if (userId == "logout") {
                localStorage.clear()
                setCookie("user_id", "")
            }
          }, [userId])
    }

    public login(userId: string): void {
        const [, setCookie] = useCookies(['user_id'])

        useEffect(() => {
            if (userId != "") {
                setCookie("user_id", userId)
                localStorage.setItem("user", JSON.stringify(userId));
              window.location.reload()
            }
          }, [userId])
    }
}