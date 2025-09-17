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
import { signup } from "@/app/lib/actions";

export function SignUpForm() {
  const [state, formAction] = useFormState(signup, null);

  return (
    <div className="flex items-center justify-center h-screen">
      <form action={formAction}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            {!state?.errors && (
              <CardDescription>
                Enter your information to create an account.
              </CardDescription>
            )}
            {state?.errors && (
              <CardDescription className="text-red-800">{state?.errors?._form}!</CardDescription>
            )}
          </CardHeader>
          { state?.success && (
            <CardContent className="text-green-600">
              <div className="w-50 my-3">
                Account successfully created! Please check your email for the activation link.
              </div>
            </CardContent>
          )}
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="John Doe"
                required
              />
              {state?.errors?.username && (
                <p className="text-sm text-red-500">{state.errors?.username}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors?.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
              {state?.errors?.password && (
                <p className="text-sm text-red-500">{state.errors?.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign up</Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}