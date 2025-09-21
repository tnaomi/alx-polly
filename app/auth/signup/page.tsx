import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signupUser } from "@/lib/authActions";
import { useFormState } from "react-dom";

export default function SignupPage() {
  const [state, formAction] = useFormState(signupUser, { errors: undefined, success: '' });
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {state.success && (
        <p className="text-green-500 text-sm mt-2" role="alert">{state.success}</p>
      )}
      {state.errors?.length && (
        <p className="text-red-500 text-sm mt-2" role="alert">{state.errors.join(', ')}</p>
      )}
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <Input name="email" type="email" placeholder="Email" required className="w-full" />
        <Input name="password" type="password" placeholder="Password" required className="w-full" />
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </main>
  );
}