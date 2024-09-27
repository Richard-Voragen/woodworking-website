"use client";

import React from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { checkUnique } from "@/lib/checkEmail";

export const signUpSchema = z.object({
    username: z
        .string()
        .min(3, { message: "You must have at least 3 characters" })
        .refine(async (e) => {
            return checkUnique(e)
        }, "This username is taken."),
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email.")
        .refine(async (e) => {
            return checkUnique(e)
        }, "This email already has an account."),
    password: z
        .string()
        .min(8, { message: "You must have at least 8 characters" }),
    confirmpassword: z
        .string()
        .min(1, { message: "This field has to be filled." }),
})
.refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"], // path of error
});

interface SignupFormFieldProps {
name: FieldPath<z.infer<typeof signUpSchema>>;
label: string;
placeholder: string;
description?: string;
inputType?: string;
formControl: Control<z.infer<typeof signUpSchema>, any>;
}

export const SignupFormField: React.FC<SignupFormFieldProps> = ({
name,
label,
placeholder,
description,
inputType,
formControl,
}) => {
return (
    <FormField
    control={formControl}
    name={name}
    render={({ field }) => (
        <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
            <Input
            placeholder={placeholder}
            type={inputType || "text"}
            {...field}
            />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
        </FormItem>
    )}
    />
);
};