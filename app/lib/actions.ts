"use server";

import { z } from "zod";
import * as auth from "./auth";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createPollSchema = z.object({
  question: z.string().min(1, "Question is required."),
  options: z
    .array(z.string().min(1, "Option cannot be empty."))
    .min(2, "At least two options are required."),
});

export async function createPoll(
  prevState: { errors: any },
  formData: FormData
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      errors: { _form: ["You must be logged in to create a poll."] },
    };
  }

  const validatedFields = createPollSchema.safeParse({
    question: formData.get("question"),
    options: (formData.getAll("options") as string[]).filter((o) => o.trim() !== ""),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { question, options } = validatedFields.data;

  try {
    await db.poll.create({
      data: {
        question,
        authorId: session.user.id,
        options: {
          create: options.map((optionText) => ({ text: optionText })),
        },
      },
    });
  } catch (error) {
    return {
      errors: { _form: ["Something went wrong. Could not create poll."] },
    };
  }

  revalidatePath("/polls");
  redirect("/polls");
}