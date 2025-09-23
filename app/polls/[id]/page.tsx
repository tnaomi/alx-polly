
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getPollById } from "@/lib/pollActions";
import { deletePoll } from "@/lib/pollActions";

export default async function PollView({ params }: { params: { id: string } }) {
  const { id } = params;
  const { poll, error } = await getPollById(id);

  if (error || !poll) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Poll Not Found</h2>
        <p className="text-gray-600">{error && (
          <p className="text-red-500 text-sm mt-2">{typeof error === "string" ? error : error?.message}</p>
        )}</p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">{poll.question}</h1>
      <p className="text-gray-600 mb-6 text-center">{poll.question ??  "No description provided."}</p>
      {/* TODO: Render poll options from database once Option table is joined */}
      <form
        action={async () => {
          if (confirm("Are you sure you want to delete this poll?")) {
            await deletePoll(poll.id);
          }
        }}
        className="flex justify-center mt-4"
      >
        <Button variant="destructive" type="submit">Delete Poll</Button>
      </form>
    </Card>
  );
}