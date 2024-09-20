"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { checkUnique, createUser } from "@/app/actions/checkEmail";
import { hashPassword } from "@/lib/isValidPassword";
import { signUpSchema, SignupFormField } from "@/app/(customerFacing)/signup/signupForm";

const SignupForm = () => {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        console.log(values);
        values.password = await hashPassword(values.password)
        await createUser(values);
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Sign up here
            </p> <br />

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <SignupFormField
                name="username"
                label="Username"
                placeholder="Username"
                description="At least 3 characters."
                formControl={form.control}
                />
                <SignupFormField
                name="email"
                label="Email"
                placeholder="Email"
                inputType="email"
                formControl={form.control}
                />
                <SignupFormField
                name="password"
                label="Password"
                placeholder="Password"
                description="At least 8 characters."
                inputType="password"
                formControl={form.control}
                />
                <SignupFormField
                name="confirmpassword"
                label="Confirm Password"
                placeholder="Password"
                inputType="password"
                formControl={form.control}
                />
                <Button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">Sign Up</Button>
            </form>
            </Form>
        </div>
    );
};

export default SignupForm;