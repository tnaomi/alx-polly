"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/app/lib/auth";
import bcrypt from "bcryptjs";
import { PollFormState } from "../types/form";
import { supabase } from "./supabase";

/* ------------------ Poll Schema ------------------ */
const PollSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "Must have at least two options"),
});

export async function createPoll(
  prevState: PollFormState,
  formData: FormData
): Promise<PollFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { errors: { _form: ["Not authenticated"] } };
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
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.poll.create({
      data: {
        question: validatedFields.data.question,
        authorId: session.user.id,
        options: {
          create: validatedFields.data.options.map((option: string) => ({
            text: option,
          })),
        },
      },
    });

    revalidatePath("/polls");
    redirect("/polls");
  } catch {
    return { errors: { _form: ["Failed to create poll"] } };
  }
}


/* ------------------ Signup ------------------ */
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
      errors: validatedFields.error.flatten().fieldErrors,
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
      errors: { _form: ["Failed to sign up"] },
    };
  }
}

/* ------------------ Login ------------------ */
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
});

export async function login(prevState: any, formData: FormData) {
  "use server";

  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: {...parsed.error.flatten().fieldErrors, _form: []} };
  }

  const { email, password } = parsed.data;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        errors: {
          email: [],
          password: [],
          _form: [error.message],  // Supabase error string
        },
        details: error,            // full error object for debugging/logging
      };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (err: any) {
    return {
      errors: { _form: ["Unexpected login failure"] },
      details: err,
    };
  }
}


/* ------------------ Logout ------------------ */
export async function logout() {
  await supabase.auth.signOut({ scope: 'local' })
  //await signOut({ redirectTo: "/login" });
}