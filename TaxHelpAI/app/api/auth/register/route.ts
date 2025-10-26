import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '../../../../lib/db';
import { registerSchema } from '../../../../lib/zod';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      plan: 'free'
    }
  });

  return NextResponse.json({ success: true });
}
