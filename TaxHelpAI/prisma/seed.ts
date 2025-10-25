import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Password123!', 10);

  await prisma.user.upsert({
    where: { email: 'demo@taxhelp.ai' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@taxhelp.ai',
      password,
      plan: 'standard',
      planExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  });

  await prisma.user.upsert({
    where: { email: 'premium@taxhelp.ai' },
    update: {},
    create: {
      name: 'Premium User',
      email: 'premium@taxhelp.ai',
      password,
      plan: 'premium',
      planExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
