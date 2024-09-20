"use client";

import React from "react";
import {
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z
        .string()
        .min(8, { message: "You must have at least 8 characters" }),
})

interface LoginFormFieldProps {
    name: FieldPath<z.infer<typeof loginSchema>>;
    label: string;
    placeholder: string;
    inputType?: string;
    formControl: Control<z.infer<typeof loginSchema>, any>;
}

export const LoginFormField: React.FC<LoginFormFieldProps> = ({
    name,
    label,
    placeholder,
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
            <FormMessage />
            </FormItem>
        )}
        />
    );
};