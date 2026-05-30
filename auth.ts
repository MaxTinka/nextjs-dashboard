import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "user@nextmail.com" && credentials?.password === "123456") {
          return { id: "1", name: "User", email: "user@nextmail.com" };
        }
        return null;
      },
    }),
  ],
});