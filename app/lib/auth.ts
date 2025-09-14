import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Remove the incorrect import for NextAuthConfig
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The 'credentials' property is required by NextAuth to define the expected fields for login
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" }
      },
      async authorize(credentials) {
        // Validate credentials with Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({ where: { email } });
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
    session({ session, token }: { session: any; token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} as any; // 'NextAuthConfig' type does not exist in next-auth, so we use 'as any' as a workaround

// Export handlers and auth functions
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);