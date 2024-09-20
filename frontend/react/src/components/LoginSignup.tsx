"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NavLink } from "./nav"
import { LogInButton } from "@/context/AuthContext"
import { redirect, useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { startTransition, useEffect, useState } from "react"
import { loginUser } from "@/app/actions/loginUser"
import { Form, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { loginSchema, LoginFormField } from "./loginForm"
import { hashPassword } from "@/lib/isValidPassword"
import { useCookies } from "react-cookie"

export function LoginSignup() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [cookies, setCookie] = useCookies(['userId'])
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
    email: "",
    password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    values.password = await hashPassword(values.password)
    setError(await loginUser(values) == null)
    if (await loginUser(values) != null) {
      setOpen(false)
      setCookie('userId', await loginUser(values), { path: '/' })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavLink href="">Login</NavLink>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>Enter your email and password to sign in to your account.</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && <Label className="text-destructive">*The email or password you entered is incorrect</Label>}
          <div className="grid gap-4 py-4">
            <LoginFormField
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              inputType="email"
              formControl={form.control}
            />
            <LoginFormField
              name="password"
              label="Password"
              placeholder="Password"
              inputType="password"
              formControl={form.control}
            />
            <Button
              onClick={() => (
                startTransition(() => {
                  //setOpen(false)
                  //loginUser()
                })
              )}
            >
              Sign In
            </Button>
            <Separator />
            <Link href="/signup" className="w-full">
              <Button className="w-full"
                onClick={() => (
                  startTransition(async () => {
                    setOpen(false)
                  })
                )}>
                Sign Up
              </Button>
            </Link>
          </div>
        </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}