"use server";

import { success, z } from "zod";
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
const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username cannot be empty")
      .max(50, "Username exceeds 50 characters!"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password exceeds 50 characters!"),
  })
  .superRefine(({ password, email, username }, ctx) => {
    // Rule 1: Password must not contain email
    if (email && password.toLowerCase().includes(email.toLowerCase())) {
      ctx.addIssue({
        code: "custom",
        message: "Password must not contain your email.",
        path: ["password"],
      });
    }

    // Rule 2: Password must not contain username
    if (username && password.toLowerCase().includes(username.toLowerCase())) {
      ctx.addIssue({
        code: "custom",
        message: "Password must not contain your username.",
        path: ["password"],
      });
    }

    // Rule 3: Password must have at least 2 special characters
    const specialCharCount = (password.match(/[^A-Za-z0-9]/g) || []).length;
    if (specialCharCount < 2) {
      ctx.addIssue({
        code: "custom",
        message: "Password must contain at least 2 special characters.",
        path: ["password"],
      });
    }
  });

export async function signup(prevState: any, formData: FormData) {
  "use server";

  const validatedFields = SignUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: {...validatedFields.error.flatten().fieldErrors, _form: []},
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: username
        }
      }
    });

    if (error) {
      return {
        errors: {
          email: [],
          password: [],
          username: [],
          _form: [error.message]
        },
        details: error
      };
    }

    if (!data) {
      return {
        errors: {
          email: [],
          password: [],
          username: [],
          _form: ['Failed to retrieve user details']
        },
        details: error
      };
    }

    await prisma.user.create({
      data: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        password: hashedPassword,
        emailVerified: data.user?.email_confirmed_at
      }}
    )
    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    return {
      errors: { 
        email: [],
        password: [],
        username: [],
        _form: ["Failed to sign up"] },
      details: error
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
    return { errors: { ...parsed.error.flatten().fieldErrors, _form: [] } };
  }

  const { email, password } = parsed.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      errors: {
        email: [],
        password: [],
        _form: [error.message],
      },
      details: error,
    };
  }

  if (!data?.user) {
    return {
      errors: {
        email: [],
        password: [],
        _form: ["Failed to retrieve user details"],
      },
    };
  }

  // Sync with Prisma user table
  await prisma.user.upsert({
    where: { id: data.user.id },
    update: {
      email: data.user.email,
      name: data.user.user_metadata?.name,
      emailVerified: data.user.email_confirmed_at,
    },
    create: {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      password: "", // not stored here
      emailVerified: data.user.email_confirmed_at,
    },
  });

  redirect('polls');

  return { success: true, user: data.user, session: data.session };
}



/* ------------------ Logout ------------------ */
export async function logout() {
  await supabase.auth.signOut({ scope: 'local' })
  //await signOut({ redirectTo: "/login" });
}