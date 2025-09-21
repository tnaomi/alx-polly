"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabaseServer";
import { Session, User } from "@supabase/supabase-js";

type State = {
  errors?: string[];
  user?: User;
  session?: Session;
};
export async function loginUser(
  prevState: State,
  formData: FormData
): Promise<State> {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { errors: [error.message] };
    }

    return { user: data.user, session: data.session };
  } catch (err) {
    return { errors: ["Unexpected error during login."] };
  }
}

export async function logoutUser() {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { errors: ['Unexpected error during logout.'] };
  }
}

export async function signupUser(
  prevState: { error: string | undefined },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (!error) {
    redirect("/auth/protected-page");
  }
  return { error: error?.message };
}