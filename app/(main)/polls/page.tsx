import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const samplePolls = [
  { id: 1, question: "What is your favorite programming language?" },
  { id: 2, question: "Which frontend framework do you prefer?" },
  { id: 3, question: "What is your go-to state management library?" },
];

export default function PollsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {samplePolls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {poll.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>A list of polls will be displayed here.</p>
            </CardContent>
            <CardFooter>
              <Link href="/add-vote">
                <Button>Add Vote</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}