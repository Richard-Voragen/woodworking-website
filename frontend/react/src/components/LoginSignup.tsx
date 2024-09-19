"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NavLink } from "./nav"
import { LogInButton } from "@/context/AuthContext"
import { redirect, useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { startTransition } from "react"
import { changeEnv, testFunc } from "@/app/actions/changeEnv"

export function LoginSignup() {

  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <NavLink href="">Login</NavLink>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome Back</AlertDialogTitle>
          <AlertDialogDescription>Enter your email and password to sign in to your account.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <button onClick={() => (
              startTransition(async () => {
                await changeEnv()
              })
            )}>TEST BUTTON</button>
          <AlertDialogAction
            onClick={() => (
              startTransition(async () => {
                await changeEnv
              })
            )}
          >
            <Link href="/loginaf/asldkfah">sign in</Link>
            Sign In
          </AlertDialogAction>
          <SignUp />
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Sign in with Magic Link
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function SignUp() {
  return (
    <Dialog>
      <DialogTrigger>
        <DialogAction asChild>
          <p>Sign Up</p>
        </DialogAction>
      </DialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome</AlertDialogTitle>
          <AlertDialogDescription>Enter your email and password to sign up to your account.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <button onClick={() => (
              startTransition(async () => {
                await changeEnv()
              })
            )}>TEST BUTTON</button>
          <AlertDialogAction
            onClick={() => (
              startTransition(async () => {
                await changeEnv
              })
            )}
          >
            <Link href="/loginaf/asldkfah">sign in</Link>
            Sign In
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => (
              startTransition(async () => {
                await testFunc()
              })
            )}
          >
            <Link href="/loginaf/asldkfah">sign in</Link>
            Sign Up
          </AlertDialogAction>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Sign in with Magic Link
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}