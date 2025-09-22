"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginUser } from "@/lib/authActions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Login() {
  const [formState, formAction] = useFormState(loginUser, { errors: undefined });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {formState.errors && formState.errors.map((error) => <p className="text-red-500">{error}</p>)}
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
      <div className="mt-4 text-center">
        <span className="text-sm">Don't have an account?</span>
        <Link href="/auth/register" className="ml-2">
          <Button variant="outline" className="text-sm">Register</Button>
        </Link>
      </div>
    </div>
  );
}