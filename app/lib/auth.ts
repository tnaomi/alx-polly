import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials with Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;

          // Compare passwords
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  session: {
    // Use JWT for session strategy
    strategy: "jwt",
  },
  callbacks: {
    // Add user ID to the session
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

// Export handlers and auth functions
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);