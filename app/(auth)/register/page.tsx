"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signupUser } from "@/lib/authActions";
import { useFormState } from "react-dom";
import AuthLayout from "../layout";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/Card";

export default function SignupPage() {
  const [state, formAction] = useFormState(signupUser, { errors: undefined, success: '' });
  return (
    <AuthLayout>
      <Card className="p-8">
        <CardHeader>
          <h1 className="text-2xl text-center font-bold mb-2">Sign Up</h1>
        </CardHeader>
        <CardDescription>
          {state.success && (
            <p className="text-green-500 text-sm mt-2" role="alert">{state.success}</p>
          )}
          {state.errors?.length && (
            <p className="text-red-500 text-sm mt-2" role="alert">{state.errors.join(', ')}</p>
          )}
        </CardDescription>
        <CardContent>
          <form action={formAction} className="w-full max-w-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <Input id="fullName" name="fullName" type="text" autoComplete="fullName" required className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" type="email" placeholder="Email" required className="w-full" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <Input name="password" type="password" placeholder="Password" required className="w-full" />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
        <br />
        <CardFooter>
          <div className="mt-4 text-center">
            <span className="text-sm">Already have an account?</span>
            <Link href="/login" className="ml-2">
              <Button variant="outline" className="text-sm">Login</Button>
            </Link>
          </div>
        </CardFooter>
    </Card>

    </AuthLayout>
  );
}