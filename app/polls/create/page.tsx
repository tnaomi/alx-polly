"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createPoll } from "@/lib/pollActions";
import { useRouter } from "next/navigation";

export default function CreatePoll() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions(opts => opts.map((opt, i) => (i === idx ? value : opt)));
  };

  const addOption = () => setOptions(opts => [...opts, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const poll = {
      id: crypto.randomUUID(),
      question,
      authorId: "", // authorId will be set in server action
    };
    const pollOptions = options
      .filter(opt => opt.trim())
      .map(opt => ({ id: crypto.randomUUID(), pollId: poll.id, text: opt, votes: 0 }));
    const { pollId, error } = await createPoll(poll, pollOptions);
    setLoading(false);
    if (pollId) {
      setSuccess(true);
      setTimeout(() => {
        router.replace("/polls");
      }, 1500);
    } else {
      setError(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Poll</h1>
      <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Question</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <label className="block mb-2 font-semibold">Options</label>
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            value={opt}
            onChange={e => handleOptionChange(idx, e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required={idx < 2}
            placeholder={`Option ${idx + 1}`}
          />
        ))}
        <button type="button" onClick={addOption} className="mb-4 px-3 py-1 bg-gray-200 rounded">Add Option</button>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">Poll created successfully! Redirecting...</div>}
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Poll"}
        </Button>
      </form>
    </div>
  );
}