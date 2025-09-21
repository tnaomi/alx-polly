import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="w-full" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required className="w-full" />
        </div>
        <Button type="submit" className="w-full">Register</Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm">Already have an account?</span>
        <Link href="/auth/login" className="ml-2">
          <Button variant="outline" className="text-sm">Login</Button>
        </Link>
      </div>
    </div>
  );
}