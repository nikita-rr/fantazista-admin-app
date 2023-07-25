import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { login: 'admin_fantazista' },
    update: {},
    create: {
      login: 'admin_fantazista',
      password: await hash('password'),
    },
  });
  await prisma.user.upsert({
    where: { login: 'operator_fantazista' },
    update: {},
    create: {
      login: 'operator_fantazista',
      password: await hash('password'),
      role: "OPERATOR"
    },
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
