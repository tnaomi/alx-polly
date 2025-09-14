import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VotesPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Votes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of your votes will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}