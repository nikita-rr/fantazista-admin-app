import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const createContract = async (prisma: PrismaClient) => {
  const clientCount = await prisma.client.count();
  const randClient = await prisma.client.findFirst({
    skip: Math.floor(Math.random() * clientCount),
  });
  const creator = await prisma.user.findFirst();
  if (creator && randClient) {
    await prisma.contract.create({
      data: {
        creatorId: creator.id,
        created_at: new Date(),
        clientId: randClient.id,
        number: faker.string.numeric({ length: 15 }),
        date: faker.date.past(),
        client_brand: faker.lorem.words(2),
        summ: faker.number.float({ min: 10000, max: 1000000 }),
        legal_entity: faker.lorem.words(4),
      },
    });
  }
};
