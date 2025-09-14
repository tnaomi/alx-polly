import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PollsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Available Polls</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of polls will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
