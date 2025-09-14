"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/app/lib/auth";
import bcrypt from "bcryptjs";

const PollSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "Must have at least two options"),
});

export async function createPoll(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "Not authenticated",
    };
  }

  const validatedFields = PollSchema.safeParse({
    question: formData.get("question"),
    options: [
      formData.get("option1"),
      formData.get("option2"),
      formData.get("option3"),
      formData.get("option4"),
    ].filter(Boolean),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.poll.create({
      data: {
        question: validatedFields.data.question,
        userId: session.user.id,
        options: {
          create: validatedFields.data.options.map((option: string) => ({
            text: option,
          })),
        },
      },
    });
    revalidatePath("/polls");
    redirect("/polls");
  } catch (error) {
    return {
      message: "Failed to create poll",
    };
  }
}

const SignUpSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signup(prevState: any, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", { email, password, redirectTo: "/polls" });
  } catch (error) {
    return {
      message: "Failed to sign up",
    };
  }
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/polls" });
  } catch (error) {
    return {
      message: "Invalid credentials",
    };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}