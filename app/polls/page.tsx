"use client";

import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const mockPolls = [
  { id: 1, title: "Favorite Programming Language?", description: "Vote for your favorite language." },
  { id: 2, title: "Best Frontend Framework?", description: "Choose the frontend framework you prefer." },
  { id: 3, title: "Remote or Onsite Work?", description: "Which work style do you prefer?" }
];

export default function PollsIndex() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Polls</h1>
      <div className="mb-6">
        <Link href="/polls/create">
          <Button variant="default">Create Poll</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockPolls.map((poll) => (
          <Card key={poll.id} className="flex flex-col justify-between p-6">
            <CardTitle>{poll.title}</CardTitle>
            <CardContent>
              <div>
                {poll.description}
              </div>
            </CardContent>
            <CardAction>
            <Link href={`/polls/${poll.id}`} className="mt-auto text-blue-600 hover:underline">View Poll</Link>
            </CardAction>
          </Card>
        ))}
      </div>
    </div>
  );
}