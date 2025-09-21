import { Button } from "@/components/ui/Button";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="w-full max-w-sm space-y-4">
        {/* TODO: Add registration fields */}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}