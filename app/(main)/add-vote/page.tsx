"use client";

import { AddVoteForm } from "@/app/components/polls/add-vote-form";

const samplePolls = [
  {
    id: 1,
    question: "What is your favorite programming language?",
    options: ["TypeScript", "Python", "Go", "Rust"],
  },
  {
    id: 2,
    question: "Which frontend framework do you prefer?",
    options: ["Next.js", "SvelteKit", "Nuxt.js", "Astro"],
  },
  {
    id: 3,
    question: "What is your go-to state management library?",
    options: ["Zustand", "Redux Toolkit", "Jotai", "Recoil"],
  },
];

async function getPoll(pollId: string) {
  // In a real app, you would fetch this from a database
  return samplePolls.find((p) => p.id === parseInt(pollId));
}

export default async function AddVotePage({
  searchParams,
}: {
  searchParams: { pollId?: string };
}) {
  const poll = searchParams.pollId
    ? await getPoll(searchParams.pollId)
    : undefined;

  if (!poll) {
    return <div>Poll not found.</div>;
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <AddVoteForm poll={poll} />
    </div>
  );
}