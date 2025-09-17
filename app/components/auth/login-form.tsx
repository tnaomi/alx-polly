"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "@/app/lib/actions";
import React from "react";


export function LoginForm() {
  const [state, formAction] = React.useActionState(login, null);

  return (
    <div className="flex items-center justify-center h-screen">
      <form action={formAction}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login to Polly</CardTitle>
            {!state?.errors && (
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>)}
            {state?.errors && (
              <CardDescription className="text-red-800">{state?.errors?._form}!</CardDescription>
            )}
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            {state?.errors && (
              <p className="text-sm text-red-500">{state?.errors?.password}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign in</Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
            <div className="my-4 text-center w-50 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} <Link href={'https://github.com/tnaomi'}>Tadala N. K.</Link> 
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}