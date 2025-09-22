"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginUser } from "@/lib/authActions";
import Link from "next/link";
import { useFormState } from "react-dom";
import AuthLayout from "../layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/Card";

export default function Login() {
  const [formState, formAction] = useFormState(loginUser, { errors: undefined });

  return (
    <AuthLayout>
      <Card className="p-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex flex-col items-center justify-center bg-background">Login</h2>
        </CardHeader>
        <CardDescription>
          <div className="m-2">
            {formState.errors && formState.errors.map((error) => <p className="text-red-500 text-center font-bold">{error}</p>)}
          </div>
        </CardDescription>
        <CardContent>
          <form action={formAction} className="w-full max-w-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input id="email" name="email" type="email" autoComplete="email" required className="w-full" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required className="w-full" />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center">
            <span className="text-sm">Don't have an account?</span>
            <Link href="/register" className="ml-2">
              <Button variant="outline" className="text-sm">Register</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}