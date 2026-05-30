import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'No database needed - use email: user@nextmail.com, password: 123456' });
}