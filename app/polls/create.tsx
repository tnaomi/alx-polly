import { Button } from "../../components/ui/Button";

export default function CreatePoll() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Poll</h1>
      <form className="space-y-4 max-w-lg">
        {/* TODO: Add poll creation fields */}
        <Button type="submit">Create Poll</Button>
      </form>
    </div>
  );
}