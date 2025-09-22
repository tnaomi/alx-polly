import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getAllPolls } from "@/lib/pollActions";
import { deletePoll } from "@/lib/pollActions";

export default async function PollsIndex() {
  const { polls, error } = await getAllPolls(); // ✅ works now, runs server-side

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Polls</h1>
      <div className="mb-6">
        <Link href="/polls/create">
          <Button variant="default">Create Poll</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {polls?.length > 0 ? (
          polls.map((poll: any) => (
            <Card key={poll.id} className="flex flex-col justify-between p-6">
              <CardTitle>{poll.question}</CardTitle>
              <CardContent>
                <div>{poll.description || "No description provided."}</div>
              </CardContent>
              <CardAction>
                <Link
                  href={`/polls/${poll.id}`}
                  className="mt-auto text-blue-600 hover:underline"
                >
                  View Poll
                </Link>
                <form
                  action={async () => {
                    if (confirm("Are you sure you want to delete this poll?")) {
                      await deletePoll(poll.id);
                    }
                  }}
                  className="inline"
                >
                  <Button variant="destructive" type="submit" className="ml-2">Delete</Button>
                </form>
              </CardAction>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No polls found.
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          Failed to load polls: {error.message}
        </div>
      )}
    </div>
  );
}