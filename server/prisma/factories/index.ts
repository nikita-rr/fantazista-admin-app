import { PrismaClient } from '@prisma/client';
import { createClient } from './_clients';
import { createContract } from './_contracts';
import { createTable } from './_tables';

const prisma = new PrismaClient();

async function main() {
  try {
    for (let i = 0; i < 10; i++) {
      await createClient(prisma);
    }
    for (let i = 0; i < 10; i++) {
      await createContract(prisma);
    }
    for (let i = 0; i < 10; i++) {
      await createTable(prisma);
    }
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
