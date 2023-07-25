import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const createTable = async (prisma: PrismaClient) => {
  const clientCount = await prisma.client.count();
  const randContract = await prisma.contract.findFirst({
    skip: Math.floor(Math.random() * clientCount),
  });
  const creator = await prisma.user.findFirst();
  if (creator && randContract) {
    await prisma.table.create({
      data: {
        creatorId: creator.id,
        created_at: new Date(),
        contractId: randContract.id,
        lat: faker.location.latitude(),
        lon: faker.location.longitude(),
        type: faker.lorem.words(4),
      },
    });
  }
};
