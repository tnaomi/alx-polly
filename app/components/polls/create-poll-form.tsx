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
import { createPoll } from "@/app/lib/actions";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  errors: {},
};

export function CreatePollForm() {
  const [state, dispatch] = useFormState(createPoll, initialState);
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a new poll</CardTitle>
        <CardDescription>
          Fill out the details below to create your poll.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Poll Question</Label>
            <Input
              id="question"
              name="question"
              placeholder="What's your favorite color?"
              required
            />
            {state.errors?.question && (
              <p className="text-sm text-red-500">{typeof state.message === "object" && state.message.question ? state.message.question.join(", ") : null}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Options</Label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  name="options"
                  placeholder={`Option ${index + 1}`}
                  defaultValue={option}
                  required
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 2}
                >
                  Remove
                </Button>
              </div>
            ))}
            {state.errors?.options && (
              <p className="text-sm text-red-500">
                {state.errors.options.join(", ")}
              </p>
            )}
            <Button type="button" variant="outline" onClick={addOption}>
              Add Option
            </Button>
          </div>
          {state.errors?._form && (
            <p className="text-sm text-red-500">{state.errors._form}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit">Create Poll</Button>
        </CardFooter>
      </form>
    </Card>
  );
}