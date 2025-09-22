"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabaseServer";
import { Session, User } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

type State = {
  errors?: string[];
  success?: string | undefined;
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
  prevState: State,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (!error && data.user) {
    // Insert user into User table
    const { error: insertError } = await supabase
      .from('User')
      .insert([
        { email: data.user.email, password: await bcrypt.hash(password, 10) },
      ]);

    if (insertError) {
      return { errors: [insertError.message] };
    }
    return {success: 'Your account has been created. Please check your email to verify your account.'}
  }
  return { errors: [error?.message] };
}