
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Mock poll data for demonstration
const mockPolls = [
  { id: "1", title: "Favorite Programming Language?", description: "Vote for your favorite language.", options: ["JavaScript", "Python", "Go", "Rust"] },
  { id: "2", title: "Best Frontend Framework?", description: "Choose the best frontend framework.", options: ["React", "Vue", "Angular", "Svelte"] },
  { id: "3", title: "Preferred Database?", description: "Select your preferred database.", options: ["Postgres", "MongoDB", "MySQL", "SQLite"] }
];

export default async function PollView({ params }: { params: { id: string } }) {
  const { id } = await params;
  const poll = mockPolls.find(p => p.id === id);

  if (!poll) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Poll Not Found</h2>
          <p className="text-gray-600">The poll you are looking for does not exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{poll.title}</h1>
        <p className="text-gray-600 mb-6 text-center">{poll.description}</p>
        <form className="flex flex-col gap-4 items-center">
          {poll.options.map(option => (
            <Button key={option} type="button" variant="outline" className="w-full max-w-xs py-2">
              {option}
            </Button>
          ))}
        </form>
      </Card>
    </div>
  );
}