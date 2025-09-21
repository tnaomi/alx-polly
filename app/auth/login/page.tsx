import { Button } from "@/components/ui/Button";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="w-full max-w-sm space-y-4">
        {/* TODO: Add login fields */}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}