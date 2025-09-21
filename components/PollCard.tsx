import { Card } from "./ui/Card";

interface PollCardProps {
  title: string;
  description?: string;
}

export function PollCard({ title, description }: PollCardProps) {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
      {/* TODO: Add actions or links for voting, sharing, etc. */}
    </Card>
  );
}