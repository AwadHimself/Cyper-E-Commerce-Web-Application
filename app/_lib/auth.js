import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAppUserByEmail, createAppUser } from "../_lib/data-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingUser = await getAppUserByEmail(user.email);

        if (!existingUser) {
          await createAppUser({
            email: user.email,
            full_name: user.name,
            avatar_url: user.image,
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        return false;
      }
    },
    async session({ session, user }) {
      const currentUser = await getAppUserByEmail(session.user.email);
      session.user.currentUserId = currentUser.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
