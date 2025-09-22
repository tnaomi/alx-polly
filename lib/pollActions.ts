"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database, TablesInsert } from "./types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function createPoll(poll: TablesInsert<"Poll">, options: TablesInsert<"Option">[]): Promise<{ pollId: string | null; error: string | null }> {
  try {
    // Get user from session
    const cookieStore = await cookies();
    const supabase = createServerClient(
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
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { pollId: null, error: userError?.message || "User not authenticated" };
    }
    // Insert poll with authorId
    const pollWithAuthor = { ...poll, authorId: user.id };
    const { data: pollData, error: pollError } = await supabase
      .from("Poll")
      .insert([pollWithAuthor])
      .select();
    if (pollError || !pollData || !pollData[0]) {
      return { pollId: null, error: pollError?.message || "Poll creation failed" };
    }
    const pollId = pollData[0].id;
    // Insert options
    const optionsWithPollId = options.map(option => ({ ...option, pollId }));
    const { error: optionsError } = await supabase
      .from("Option")
      .insert(optionsWithPollId);
    if (optionsError) {
      return { pollId, error: optionsError.message };
    }
    return { pollId, error: null };
  } catch (err: any) {
    return { pollId: null, error: err.message };
  }
}