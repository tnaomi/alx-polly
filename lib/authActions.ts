"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabaseServer";
import { Session, User } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./types/supabase";

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

export async function logoutUser(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {}
          },
        },
      }
    );

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }

    redirect('/');
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function signupUser(
  prevState: State,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get('fullName') as string;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (!error && data.user) {
    // Insert user into User table
    const { error: insertError } = await supabase
      .from('User')
      .insert([
        { email: data.user.email,name: fullName, password: await bcrypt.hash(password, 10) },
      ]);

    if (insertError) {
      console.log('AN error while inserting new user', insertError);
      return { errors: [insertError.message] };
    }
    return {success: 'Your account has been created. Please check your email to verify your account.'}
  }
  return { errors: [error?.message] };
}