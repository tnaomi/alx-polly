import { createClient } from './supabaseServer';

export async function loginUser(email: string, password: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return { user: data.user, session: data.session };
  } catch (err) {
    return { error: 'Unexpected error during login.' };
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
    return { error: 'Unexpected error during logout.' };
  }
}