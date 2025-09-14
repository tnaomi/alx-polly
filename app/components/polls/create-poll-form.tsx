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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreatePollForm() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new poll</CardTitle>
          <CardDescription>
            Fill out the form below to create a new poll.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Input id="question" placeholder="What is your favorite color?" required />
          </div>
          <div className="grid gap-2">
            <Label>Options</Label>
            <Input placeholder="Option 1" required />
            <Input placeholder="Option 2" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Poll</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
