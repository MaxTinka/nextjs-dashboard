import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', 'User', 'user@nextmail.com', ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
    return NextResponse.json({ message: 'User seeded successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}