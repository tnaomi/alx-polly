import { describe, it, expect, vi } from "vitest"
import * as pollActions from "./pollActions"

describe("pollActions", () => {
  it("should get all polls without throwing", async () => {
    const result = await pollActions.getAllPolls()
    expect(result).toBeDefined()
    expect(Array.isArray(result.polls)).toBe(true)
  })

  it("should create a poll and return success or error", async () => {
    // You may want to mock supabase client here for isolated tests
    const pollData = {
      question: "Test poll?",
      description: "Test description",
      options: ["A", "B"]
    }
    const result = await pollActions.createPoll(pollData)
    expect(result).toHaveProperty("success")
    expect(result).toHaveProperty("error")
  })

  it("should get a poll by id and return poll or error", async () => {
    // Replace with a valid poll id for integration test
    const pollId = 1
    const result = await pollActions.getPollById(pollId)
    expect(result).toHaveProperty("poll")
    expect(result).toHaveProperty("error")
  })

  it("should delete a poll and return success or error", async () => {
    // Replace with a valid poll id for integration test
    const pollId = 1
    const result = await pollActions.deletePoll(pollId)
    expect(result).toHaveProperty("success")
    expect(result).toHaveProperty("error")
  })
})