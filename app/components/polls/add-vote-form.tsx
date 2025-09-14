"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Poll {
  id: number;
  question: string;
  options: string[];
}

export function AddVoteForm({ poll }: { poll: Poll }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
        <CardDescription>
          Select one of the options below to cast your vote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={poll.options[0]}>
          {poll.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button>Submit Vote</Button>
      </CardFooter>
    </Card>
  );
}