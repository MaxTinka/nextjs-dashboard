import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await sql`SELECT * FROM users WHERE email=${email}`;

        if (user.rows.length === 0) return null;

        const passwordsMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!passwordsMatch) return null;

        return { id: user.rows[0].id, email: user.rows[0].email };
      },
    }),
  ],
});